export interface Exercise {
    id: number,
    name: string,
}

export interface ExercisesState {
    exercises: Exercise[],
}
export const EXERCISE_ADDED = 'EXERCISE_ADDED'

interface AddExerciseAction {
    type: typeof EXERCISE_ADDED
    exercise: Exercise
}

export type ExercisesActionTypes = AddExerciseAction
