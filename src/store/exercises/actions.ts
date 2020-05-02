import {EXERCISE_ADDED, Exercise} from './types'

export const addExercise = (exercise: Exercise) => {
    return {
        type: EXERCISE_ADDED,
        exercise,
    }
}
