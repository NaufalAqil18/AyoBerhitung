'use strict'

const Question = use('App/Models/Question')
const UserAnswer = use('App/Models/UserAnswer')
const ExerciseProgress = use('App/Models/ExerciseProgress')
const ExerciseHistory = use('App/Models/ExerciseHistory')
const Achievement = use('App/Models/Achievement')
const UserAchievement = use('App/Models/UserAchievement')

class PenjumlahanController {
    async showLevel({ params, view, request, auth }) {
        const current = Number(request.get().soal) || 1
        const level = Number(params.level) || 1
        const user = auth.user
        // RESET progress di tampilan jika mulai ulang level (soal=1)
        if (current === 1 && request.get().reset == '1') {
            // Tidak menghapus progress di database, hanya tampilan mulai dari awal
        }
        const soalDb = await Question
            .query()
            .where('mode', 'penjumlahan')
            .where('level', level)
            .where('number', current)
            .first()
        if (!soalDb) {
            return view.render('exercise/penjumlahan_soal', { soal: null })
        }
        // Ambil semua jawaban user untuk level ini
        const jawaban = await UserAnswer
            .query()
            .where('user_id', user.id)
            .where('mode', 'penjumlahan')
            .where('level', level)
            .fetch()
        const skor = jawaban.rows.filter(j => j.is_correct).length
        const skorPersen = Math.round((skor / 10) * 100)
        // Ambil progress (waktu mulai/selesai)
        let waktuMulai = null, waktuSelesai = null, waktuMulaiStr = '-', waktuSelesaiStr = '-'
        let progress = await ExerciseProgress.query()
            .where('user_id', user.id)
            .where('mode', 'penjumlahan')
            .where('level', level)
            .first()
        if (progress) {
            waktuMulai = progress.started_at
            waktuSelesai = progress.finished_at
        }
        function formatTime(date) {
          if (!date) return '-'
          const d = new Date(date)
          return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }
        waktuMulaiStr = formatTime(waktuMulai)
        waktuSelesaiStr = formatTime(waktuSelesai)
        let bintang1 = '#bbb', bintang2 = '#bbb', bintang3 = '#bbb'
        if (!isNaN(skorPersen)) {
            bintang1 = skorPersen >= 33 ? 'gold' : '#bbb'
            bintang2 = skorPersen >= 66 ? 'gold' : '#bbb'
            bintang3 = skorPersen == 100 ? 'gold' : '#bbb'
        }
        const soal = {
            id: soalDb.id,
            question: soalDb.question_text,
            options: [
                { key: 'a', value: soalDb.option_a },
                { key: 'b', value: soalDb.option_b },
                { key: 'c', value: soalDb.option_c },
                { key: 'd', value: soalDb.option_d }
            ],
            correct: soalDb.correct_option,
            current,
            total: 10,
            level
        }
        return view.render('exercise/penjumlahan_soal', { soal, skor, skorPersen, waktuMulai: waktuMulaiStr, waktuSelesai: waktuSelesaiStr, bintang1, bintang2, bintang3 })
    }

    async submitJawaban({ request, params, response, auth }) {
        const user = auth.user
        const question_id = request.input('question_id')
        const selected_option = request.input('answer')
        const correct_option = request.input('correctAnswer')
        const level = Number(params.level)
        // Ambil nomor soal dari referer atau query
        const referer = request.header('referer') || ''
        let current = 1
        const match = referer.match(/soal=(\d+)/)
        if (match) current = Number(match[1])
        // Simpan ke user_answers
        const existing = await UserAnswer
          .query()
          .where('user_id', user.id)
          .where('question_id', question_id)
          .first()
        if (existing) {
          existing.selected_option = selected_option
          existing.is_correct = selected_option === correct_option
          await existing.save()
        } else {
          await UserAnswer.create({
            user_id: user.id,
            question_id,
            mode: 'penjumlahan',
            level,
            number: current,
            selected_option,
            is_correct: selected_option === correct_option
          })
        }
        // Hitung jumlah benar setelah submit
        const jawaban = await UserAnswer
          .query()
          .where('user_id', user.id)
          .where('mode', 'penjumlahan')
          .where('level', level)
          .fetch();
        const skor = jawaban.rows.filter(j => j.is_correct).length;
        const next = current + 1;
        // Jika selesai (next > 10), simpan ke exercise_histories dan update best progress
        if (next > 10) {
          // 1. Tambahkan ke exercise_histories (selalu tambah baru)
          await ExerciseHistory.create({
            user_id: user.id,
            type: 'penjumlahan',
            score: skor,
            total_questions: 10
          });
          // 2. Update best progress jika skor lebih baik
          let progress = await ExerciseProgress.query()
            .where('user_id', user.id)
            .where('mode', 'penjumlahan')
            .where('level', level)
            .first();
          if (!progress || skor > progress.score) {
            if (!progress) {
              progress = new ExerciseProgress();
              progress.user_id = user.id;
              progress.mode = 'penjumlahan';
              progress.level = level;
              progress.started_at = new Date();
            }
            progress.score = skor;
            progress.is_finished = true;
            progress.finished_at = new Date();
            await progress.save();
          }
          // 3. Cek dan update lencana
          const totalSelesai = await ExerciseProgress.query()
            .where('user_id', user.id)
            .where('mode', 'penjumlahan')
            .where('score', '>=', 7)
            .getCount();
          const achs = [1, 5, 10];
          for (const n of achs) {
            if (totalSelesai >= n) {
              const criteria = `penjumlahan_${n}`;
              const achievement = await Achievement.findBy('criteria', criteria);
              if (achievement) {
                await UserAchievement.findOrCreate({
                  user_id: user.id,
                  achievement_id: achievement.id
                }, {
                  user_id: user.id,
                  achievement_id: achievement.id
                });
              }
            }
          }
          // 4. Reset progress di tampilan (soal=1, skor=0) saat user mulai ulang level
          return response.redirect('back')
        } else {
          // Progress diupdate setiap submit, tapi best progress hanya jika selesai dan lebih baik
          return response.redirect(`/latihan/penjumlahan/level/${level}?soal=${next}`)
        }
    }
}

module.exports = PenjumlahanController 