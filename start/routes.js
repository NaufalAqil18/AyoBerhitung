'use strict'

const AuthController = require('../app/Controllers/Http/AuthController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//   JALANIN COMMANDNYA INI
// ===================//
// adonis serve --dev //
// ===================//


// Halaman utama
Route.get('/', async ({ view }) => {
  return view.render('home')
})

// Latihan Soal Interaktif
Route.get('/latihan', 'LatihanController.index')
Route.post('/latihan/check', 'LatihanController.checkAnswer')

// Penjumlahan Mode
Route.get('/latihan/penjumlahan/level/:level', 'PenjumlahanController.showLevel')
Route.post('/latihan/penjumlahan/level/:level/submit', 'PenjumlahanController.submitJawaban')

// Pengurangan Mode
Route.get('/latihan/pengurangan/level/:level', 'PenguranganController.showLevel')
Route.post('/latihan/pengurangan/level/:level/submit', 'PenguranganController.submitJawaban')

// Perkalian Mode
Route.get('/latihan/perkalian/level/:level', 'PerkalianController.showLevel')
Route.post('/latihan/perkalian/level/:level/submit', 'PerkalianController.submitJawaban')

// Pembagian Mode
Route.get('/latihan/pembagian/level/:level', 'PembagianController.showLevel')
Route.post('/latihan/pembagian/level/:level/submit', 'PembagianController.submitJawaban')

// Permainan Edukatif
Route.get('/game', 'GameController.index')
Route.post('/game/submit', 'GameController.submitScore')

// Animasi Pembelajaran
Route.get('/animasi', 'AnimasiController.index')

// Dashboard Siswa
Route.get('/dashboard', 'DashboardController.index')

// Sistem Penghargaan
Route.get('/penghargaan', 'PenghargaanController.index')

// Auth
Route.get('/register', 'AuthController.showRegister')
Route.post('/register', 'AuthController.register')

Route.get('/login', 'AuthController.showLogin')
Route.post('/login', 'AuthController.login')

Route.get('/logout', 'AuthController.logout')

// exercise
Route.get('/exercise', 'ExerciseController.show').middleware(['auth'])
Route.post('/exercise', 'ExerciseController.submit').middleware(['auth'])