'use strict'

const ExerciseHistory = use('App/Models/ExerciseHistory')

class DashboardController {
  async index({ view, auth }) {

    await auth.check()
    const histories = await ExerciseHistory
      .query()
      .where('user_id', auth.user.id)
      .orderBy('played_at', 'desc')
      .fetch()

    return view.render('dashboard', {
      user: auth.user,
      riwayat: histories.toJSON()
    })
  }
}

module.exports = DashboardController
