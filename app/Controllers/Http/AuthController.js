'use strict'

const User = use('App/Models/User')

class AuthController {
    async showRegister({ view }) {
        return view.render('auth.register')
    }

    async register({ request, response, auth }) {
        const { username, email, password } = request.all()
        const user = await User.create({ username, email, password })
        await auth.login(user)
        return response.redirect('/dashboard')
    }

    async showLogin({ view }) {
        return view.render('auth.login')
    }

    async login({ request, response, auth, session }) {
        const { email, password } = request.all()
        try {
            await auth.attempt(email, password)
            return response.redirect('/dashboard')
        } catch (e) {
            session.flash({ loginError: 'Login gagal. Cek email/password' })
            return response.redirect('back')
        }
    }

    async logout({ auth, response }) {
        await auth.logout()
        return response.redirect('/')
    }
}

module.exports = AuthController
