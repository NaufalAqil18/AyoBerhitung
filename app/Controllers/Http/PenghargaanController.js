'use strict'

class PenghargaanController {
  async index({ view }) {
    const badges = [
      { nama: 'Penyelesaian Soal 10', deskripsi: 'Menyelesaikan 10 soal latihan' },
      { nama: 'Pemain Game Hebat', deskripsi: 'Mencapai skor tinggi di game edukatif' }
    ]
    return view.render('penghargaan', { badges })
  }
}

module.exports = PenghargaanController
