'use strict'

const Question = use('App/Models/Question')
const UserAnswer = use('App/Models/UserAnswer')
const ExerciseProgress = use('App/Models/ExerciseProgress')
const ExerciseHistory = use('App/Models/ExerciseHistory')
const Achievement = use('App/Models/Achievement')
const UserAchievement = use('App/Models/UserAchievement')

class PembagianController {
    async showLevel({ params, view, request, auth, response }) {
        const current = Number(request.get().soal) || 1
        const level = Number(params.level) || 1
        const user = auth.user
        if (request.get().reset == '1') {
            await UserAnswer.query()
                .where('user_id', user.id)
                .where('mode', 'pembagian')
                .where('level', level)
                .delete()
            return response.redirect(`/latihan/pembagian/level/${level}?soal=1`)
        }
        const soalDb = await Question
            .query()
            .where('mode', 'pembagian')
            .where('level', level)
            .where('number', current)
            .first()
        if (!soalDb) {
            return view.render('exercise/pembagian_soal', { soal: null })
        }
        const jawaban = await UserAnswer
            .query()
            .where('user_id', user.id)
            .where('mode', 'pembagian')
            .where('level', level)
            .fetch()
        const skor = jawaban.rows.filter(j => j.is_correct).length
        const skorPersen = Math.round((skor / 10) * 100)
        let waktuMulai = null, waktuSelesai = null, waktuMulaiStr = '-', waktuSelesaiStr = '-'
        let progress = await ExerciseProgress.query()
            .where('user_id', user.id)
            .where('mode', 'pembagian')
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
        return view.render('exercise/pembagian_soal', { soal, skor, skorPersen, waktuMulai: waktuMulaiStr, waktuSelesai: waktuSelesaiStr, bintang1, bintang2, bintang3 })
    }

    async submitJawaban({ request, params, response, auth }) {
        const user = auth.user
        const question_id = request.input('question_id')
        const selected_option = request.input('answer')
        const correct_option = request.input('correctAnswer')
        const level = Number(params.level)
        const referer = request.header('referer') || ''
        let current = 1
        const match = referer.match(/soal=(\d+)/)
        if (match) current = Number(match[1])
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
            mode: 'pembagian',
            level,
            number: current,
            selected_option,
            is_correct: selected_option === correct_option
          })
        }
        const next = current + 1
        if (next <= 10) {
          return response.redirect(`/latihan/pembagian/level/${level}?soal=${next}`)
        } else {
          const jawaban = await UserAnswer
            .query()
            .where('user_id', user.id)
            .where('mode', 'pembagian')
            .where('level', level)
            .fetch()
          const skor = jawaban.rows.filter(j => j.is_correct).length
          await ExerciseHistory.create({
            user_id: user.id,
            type: 'pembagian',
            score: skor,
            total_questions: 10
          })
          let progress = await ExerciseProgress.query()
            .where('user_id', user.id)
            .where('mode', 'pembagian')
            .where('level', level)
            .first()
          if (!progress || skor > progress.score) {
            if (!progress) {
              progress = new ExerciseProgress()
              progress.user_id = user.id
              progress.mode = 'pembagian'
              progress.level = level
              progress.started_at = new Date()
            }
            progress.score = skor
            progress.is_finished = true
            progress.finished_at = new Date()
            await progress.save()
          }
          const totalSelesai = (await ExerciseProgress.query()
            .where('user_id', user.id)
            .where('mode', 'pembagian')
            .where('score', '>=', 7)
            .getCount())
          const achs = [1, 5, 10]
          for (const n of achs) {
            if (totalSelesai >= n) {
              const criteria = `pembagian_${n}`
              const achievement = await Achievement.findBy('criteria', criteria)
              if (achievement) {
                await UserAchievement.findOrCreate({
                  user_id: user.id,
                  achievement_id: achievement.id
                }, {
                  user_id: user.id,
                  achievement_id: achievement.id
                })
              }
            }
          }
          return response.redirect('back')
        }
    }
}

module.exports = PembagianController 