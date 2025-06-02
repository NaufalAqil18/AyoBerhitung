'use strict'

class AnimasiController {
    async index({ view }) {
        return view.render('animasi')
    }
}

module.exports = AnimasiController
