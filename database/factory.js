'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

Factory.blueprint('App/Models/Question', (faker, i, data) => {
  // 10 soal penjumlahan level 1
  const questions = [
    {q: '1 + 1 = ?', a: '2', b: '1', c: '3', d: '4', correct: 'a'},
    {q: '2 + 1 = ?', a: '3', b: '2', c: '1', d: '4', correct: 'a'},
    {q: '2 + 2 = ?', a: '3', b: '4', c: '2', d: '1', correct: 'b'},
    {q: '3 + 1 = ?', a: '2', b: '3', c: '4', d: '5', correct: 'c'},
    {q: '3 + 2 = ?', a: '4', b: '5', c: '3', d: '2', correct: 'b'},
    {q: '4 + 1 = ?', a: '5', b: '4', c: '3', d: '2', correct: 'a'},
    {q: '4 + 2 = ?', a: '5', b: '6', c: '4', d: '2', correct: 'b'},
    {q: '5 + 1 = ?', a: '7', b: '6', c: '5', d: '4', correct: 'b'},
    {q: '5 + 2 = ?', a: '6', b: '7', c: '8', d: '9', correct: 'a'},
    {q: '6 + 1 = ?', a: '8', b: '7', c: '6', d: '5', correct: 'b'},
  ]
  const idx = i % 10
  return {
    mode: 'penjumlahan',
    level: 1,
    number: idx + 1,
    question_text: questions[idx].q,
    option_a: questions[idx].a,
    option_b: questions[idx].b,
    option_c: questions[idx].c,
    option_d: questions[idx].d,
    correct_option: questions[idx].correct
  }
})
