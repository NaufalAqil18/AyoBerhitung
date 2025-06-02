'use strict'

const Schema = use('Schema')

class UserAnswersSchema extends Schema {
  up () {
    this.create('user_answers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('question_id').unsigned().references('id').inTable('questions')
      table.string('mode').notNullable()
      table.integer('level').notNullable()
      table.integer('number').notNullable()
      table.string('selected_option').notNullable() // a/b/c/d
      table.boolean('is_correct').defaultTo(false)
      table.timestamp('answered_at').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down () {
    this.drop('user_answers')
  }
}

module.exports = UserAnswersSchema 