'use strict'

const Schema = use('Schema')

class QuestionsSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.string('mode').notNullable() // penjumlahan, dst
      table.integer('level').notNullable()
      table.integer('number').notNullable() // nomor soal dalam level
      table.text('question_text').notNullable()
      table.string('option_a').notNullable()
      table.string('option_b').notNullable()
      table.string('option_c').notNullable()
      table.string('option_d').notNullable()
      table.string('correct_option').notNullable() // a/b/c/d
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionsSchema 