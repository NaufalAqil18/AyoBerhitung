'use strict'

const Schema = use('Schema')

class AchievementsSchema extends Schema {
  up () {
    this.create('achievements', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('icon').nullable()
      table.string('criteria').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('achievements')
  }
}

module.exports = AchievementsSchema 