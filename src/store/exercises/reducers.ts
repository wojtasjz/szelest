import {
    EXERCISE_ADDED,
    EXERCISE_UPDATED,
    EXERCISE_DELETED,
    ExercisesActionTypes,
    ExercisesState,
    Exercise,
} from './types'
import {newId} from '../utils'

const initialState: ExercisesState = {
    exercises: [
        {id: 1, name: 'pompki'},
        {id: 2, name: 'przysiady'},
        {id: 3, name: 'brzuszki'},
    ]
}

export const exercisesReducer = (state = initialState, action: ExercisesActionTypes): ExercisesState => {
    switch (action.type) {
        case EXERCISE_ADDED: {
            const newExercise: Exercise = {
                name: action.name || '',
                id: newId(state.exercises),
            }

            return {
                ...state,
                exercises: [...state.exercises, newExercise],
            }
        }
        case EXERCISE_DELETED: {
            return {
                ...state,
                exercises: state.exercises.filter(item => item.id !== action.id),
            }
        }
        case EXERCISE_UPDATED: {
            return {
                ...state,
                exercises: state.exercises.map(item => item.id !== action.id ? item : {...item, name: action.name}),
            }
        }
        default:
            return state
    }
}
