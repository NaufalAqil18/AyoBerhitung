'use strict'

const Factory = use('Factory')
const Question = use('App/Models/Question')

class QuestionSeeder {
  async run () {
    // Hapus semua soal penjumlahan lama
    await Question.query().where('mode', 'penjumlahan').delete()
    // Isi 10 soal untuk setiap level 1-10
    for (let level = 1; level <= 10; level++) {
      for (let i = 1; i <= 10; i++) {
        const a = level + i - 1
        const b = level
        const correct = a + b
        // Buat opsi acak
        const options = [correct, correct+1, correct-1, correct+2]
        options.sort(() => Math.random() - 0.5)
        const correctKey = ['a','b','c','d'][options.indexOf(correct)]
        await Question.create({
          mode: 'penjumlahan',
          level,
          number: i,
          question_text: `${a} + ${b} = ?`,
          option_a: options[0].toString(),
          option_b: options[1].toString(),
          option_c: options[2].toString(),
          option_d: options[3].toString(),
          correct_option: correctKey
        })
      }
    }
    // Pengurangan
    for (let level = 1; level <= 10; level++) {
      for (let i = 1; i <= 10; i++) {
        const a = level + i + 8 // agar hasil tidak negatif
        const b = level
        const correct = a - b
        const options = [correct, correct+1, correct-1, correct+2]
        options.sort(() => Math.random() - 0.5)
        const correctKey = ['a','b','c','d'][options.indexOf(correct)]
        await Question.create({
          mode: 'pengurangan',
          level,
          number: i,
          question_text: `${a} - ${b} = ?`,
          option_a: options[0].toString(),
          option_b: options[1].toString(),
          option_c: options[2].toString(),
          option_d: options[3].toString(),
          correct_option: correctKey
        })
      }
    }
    // Perkalian
    for (let level = 1; level <= 10; level++) {
      for (let i = 1; i <= 10; i++) {
        const a = level
        const b = i + 1
        const correct = a * b
        const options = [correct, correct+level, correct-1, correct+2]
        options.sort(() => Math.random() - 0.5)
        const correctKey = ['a','b','c','d'][options.indexOf(correct)]
        await Question.create({
          mode: 'perkalian',
          level,
          number: i,
          question_text: `${a} × ${b} = ?`,
          option_a: options[0].toString(),
          option_b: options[1].toString(),
          option_c: options[2].toString(),
          option_d: options[3].toString(),
          correct_option: correctKey
        })
      }
    }
    // Pembagian
    for (let level = 1; level <= 10; level++) {
      for (let i = 1; i <= 10; i++) {
        const b = level
        const correct = i + 1
        const a = b * correct
        const options = [correct, correct+1, correct-1, correct+2]
        options.sort(() => Math.random() - 0.5)
        const correctKey = ['a','b','c','d'][options.indexOf(correct)]
        await Question.create({
          mode: 'pembagian',
          level,
          number: i,
          question_text: `${a} ÷ ${b} = ?`,
          option_a: options[0].toString(),
          option_b: options[1].toString(),
          option_c: options[2].toString(),
          option_d: options[3].toString(),
          correct_option: correctKey
        })
      }
    }
  }
}

module.exports = QuestionSeeder