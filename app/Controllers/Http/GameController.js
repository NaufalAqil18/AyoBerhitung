'use strict'

class GameController {
    async index({ view }) {
        return view.render('game')
    }

    async submitScore({ request, response, session }) {
        const score = request.input('score')
        session.flash({ message: `Skor Anda: ${score}` })
        return response.redirect('back')
    }
}

module.exports = GameController
