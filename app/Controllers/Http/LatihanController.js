'use strict'

class LatihanController {
    async index({view}) {
        const soal = {
            question: "5 + 3 = ?",
            answer: 8
        }
        return view.render('latihan',{ soal })
    }

    async checkAnswer({ request, response, session }) {
        const userAnswer = Number(request.input('answer'))
        const correctAnswer = Number(request.input('correctAnswer'))

        if (userAnswer === correctAnswer) {
            session.flash({ message: 'Jawaban benar! 👍'})
        } else {
            session.flash({ message: 'Jawaban salah, coba lagi ya.' })
        }

        return response.redirect('back') 
    }

}

module.exports = LatihanController
