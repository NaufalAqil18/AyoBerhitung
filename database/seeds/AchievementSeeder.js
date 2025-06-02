'use strict'

const Factory = use('Factory')
const Achievement = use('App/Models/Achievement')

class AchievementSeeder {
  async run () {
    const data = [
      // Penjumlahan
      { name: 'Penjumlahan 1', description: 'Selesaikan 1 level mode penjumlahan', icon: 'trophy', criteria: 'penjumlahan_1' },
      { name: 'Penjumlahan 5', description: 'Selesaikan 5 level mode penjumlahan', icon: 'trophy', criteria: 'penjumlahan_5' },
      { name: 'Penjumlahan 10', description: 'Selesaikan 10 level mode penjumlahan', icon: 'trophy', criteria: 'penjumlahan_10' },
      // Pengurangan
      { name: 'Pengurangan 1', description: 'Selesaikan 1 level mode pengurangan', icon: 'trophy', criteria: 'pengurangan_1' },
      { name: 'Pengurangan 5', description: 'Selesaikan 5 level mode pengurangan', icon: 'trophy', criteria: 'pengurangan_5' },
      { name: 'Pengurangan 10', description: 'Selesaikan 10 level mode pengurangan', icon: 'trophy', criteria: 'pengurangan_10' },
      // Perkalian
      { name: 'Perkalian 1', description: 'Selesaikan 1 level mode perkalian', icon: 'trophy', criteria: 'perkalian_1' },
      { name: 'Perkalian 5', description: 'Selesaikan 5 level mode perkalian', icon: 'trophy', criteria: 'perkalian_5' },
      { name: 'Perkalian 10', description: 'Selesaikan 10 level mode perkalian', icon: 'trophy', criteria: 'perkalian_10' },
      // Pembagian
      { name: 'Pembagian 1', description: 'Selesaikan 1 level mode pembagian', icon: 'trophy', criteria: 'pembagian_1' },
      { name: 'Pembagian 5', description: 'Selesaikan 5 level mode pembagian', icon: 'trophy', criteria: 'pembagian_5' },
      { name: 'Pembagian 10', description: 'Selesaikan 10 level mode pembagian', icon: 'trophy', criteria: 'pembagian_10' },
    ]
    for (const item of data) {
      await Achievement.findOrCreate({ criteria: item.criteria }, item)
    }
  }
}

module.exports = AchievementSeeder 