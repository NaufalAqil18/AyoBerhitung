'use strict'

const Schema = use('Schema')

class UserAchievementsSchema extends Schema {
  up () {
    this.create('user_achievements', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('achievement_id').unsigned().references('id').inTable('achievements')
      table.timestamp('awarded_at').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down () {
    this.drop('user_achievements')
  }
}

module.exports = UserAchievementsSchema 