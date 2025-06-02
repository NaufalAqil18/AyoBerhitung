'use strict'

const Model = use('Model')

class UserAchievement extends Model {
  static get table () {
    return 'user_achievements'
  }
}

module.exports = UserAchievement 