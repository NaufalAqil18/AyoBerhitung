'use strict'

const Model = use('Model')

class ExerciseProgress extends Model {
    static get table () {
      return 'exercise_progress'
    }
  }

module.exports = ExerciseProgress 