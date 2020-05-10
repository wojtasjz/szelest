export interface Exercise {
    id: number,
    name: string,
}

export interface ExercisesState {
    exercises: Exercise[],
}
export const EXERCISE_ADDED = 'EXERCISE_ADDED'
export const EXERCISE_UPDATED = 'EXERCISE_UPDATED'
export const EXERCISE_DELETED = 'EXERCISE_DELETED'

interface AddExerciseAction {
    type: typeof EXERCISE_ADDED
    id: number
    name?: string
}

interface UpdateExerciseAction {
    type: typeof EXERCISE_UPDATED
    id: number
    name: string
}

interface DeleteExerciseAction {
    type: typeof EXERCISE_DELETED
    id: number
}

export type ExercisesActionTypes = AddExerciseAction | UpdateExerciseAction | DeleteExerciseAction
