'use strict'

const Schema = use('Schema')

class ExerciseProgressSchema extends Schema {
  up () {
    this.create('exercise_progress', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('mode').notNullable()
      table.integer('level').notNullable()
      table.integer('current_question').defaultTo(1)
      table.integer('score').defaultTo(0)
      table.boolean('is_finished').defaultTo(false)
      table.timestamp('started_at').defaultTo(this.fn.now())
      table.timestamp('finished_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('exercise_progress')
  }
}

module.exports = ExerciseProgressSchema 