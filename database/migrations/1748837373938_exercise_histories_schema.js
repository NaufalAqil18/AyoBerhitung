'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExerciseHistoriesSchema extends Schema {
  up () {
    this.create('exercise_histories', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('type') // penjumlahan, pengurangan dsb
      table.integer('score')
      table.integer('total_questions')
      table.timestamp('played_at').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down () {
    this.drop('exercise_histories')
  }
}

module.exports = ExerciseHistoriesSchema
