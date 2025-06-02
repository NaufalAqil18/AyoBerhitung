'use strict'

const Model = use('Model')

class Achievement extends Model {
  static get table () {
    return 'achievements'
  }
}

module.exports = Achievement 