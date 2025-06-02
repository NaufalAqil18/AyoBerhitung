'use strict'

const ExerciseHistory = use('App/Models/ExerciseHistory')
const ExerciseProgress = use('App/Models/ExerciseProgress')
const Achievement = use('App/Models/Achievement')
const UserAchievement = use('App/Models/UserAchievement')

class DashboardController {
  async index({ view, auth }) {
    await auth.check()
    const histories = await ExerciseHistory
      .query()
      .where('user_id', auth.user.id)
      .orderBy('played_at', 'desc')
      .fetch()
    // Statistik progres latihan dan bintang
    const progress = await ExerciseProgress.query().where('user_id', auth.user.id).fetch()
    const progressArr = progress.toJSON()
    // Hitung jumlah level selesai (score >= 7 dianggap selesai)
    const selesai = progressArr.filter(p => p.score >= 7).length
    const totalLevel = 10 * 4 // 10 level x 4 mode
    // Hitung jumlah bintang (akumulasi best progress semua level)
    let bintang = 0
    for (const p of progressArr) {
      if (p.score >= 10) bintang += 3
      else if (p.score >= 7) bintang += 2
      else if (p.score >= 4) bintang += 1
    }
    // Ambil achievements user
    const userAchievements = await UserAchievement.query().where('user_id', auth.user.id).fetch()
    const achievementIds = userAchievements.rows.map(a => a.achievement_id)
    const achievements = await Achievement.query().whereIn('id', achievementIds).fetch()
    const user = auth.user
    // Format tanggal join user
    let userJoinDate = '-'
    if (user.created_at) {
      const d = new Date(user.created_at)
      userJoinDate = d.toLocaleString('id-ID', { month:'long', year:'numeric' })
    }
    const totalBintang = totalLevel * 3
    const bintangPersen = totalBintang > 0 ? Math.round((bintang / totalBintang) * 100) : 0
    return view.render('dashboard', {
      user: auth.user,
      userJoinDate,
      riwayat: histories.toJSON(),
      progressPersen: Math.round((selesai / totalLevel) * 100),
      bintang,
      totalBintang: totalLevel * 3,
      bintangPersen,
      achievements: achievements.toJSON()
    })
  }
}

module.exports = DashboardController
