'use strict'

const ExerciseHistory = use('App/Models/ExerciseHistory')

class ExerciseController {
    async show({ view }) {
        return view.render('exercise.practice')
    }

    async submit({ request, auth, response }) {
        const { type, score, total_questions } = request.only(['type', 'score', 'total_questions'])

        await ExerciseHistory.create({
            user_id:auth.user.id,
            type,
            score,
            total_questions
        })
        console.log(request.all()) // Tambahkan ini di ExerciseController.submit


        return response.redirect('/dashboard')
    }
}

module.exports = ExerciseController
