import {EXERCISE_ADDED, ExercisesActionTypes, ExercisesState} from './types'
import {newId} from '../utils'

const initialState: ExercisesState = {
    exercises: [{id: 1, name: 'pompki'}, {id: 2, name: 'przysiady'}, {id: 3, name: 'brzuszki'}]
}

export const exercisesReducer = (state = initialState, action: ExercisesActionTypes): ExercisesState => {
    switch (action.type) {
        case EXERCISE_ADDED: {
            action.exercise.id = newId(state.exercises)

            return {
                ...state,
                exercises: [...state.exercises, action.exercise],
            }
        }
        default:
            return state
    }
}
