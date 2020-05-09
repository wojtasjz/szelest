import {EXERCISE_ADDED, EXERCISE_UPDATED, EXERCISE_DELETED} from './types'

export const addExercise = (name?: string) => {
    return {
        type: EXERCISE_ADDED,
        name,
    }
}

export const updateExercise = (id: number, name: string) => {
    return {
        type: EXERCISE_UPDATED,
        id,
        name,
    }
}

export const deleteExercise = (id: number) => {
    return {
        type: EXERCISE_DELETED,
        id,
    }
}
