import {ProgramsActionTypes, ProgramsState, SELECTED_PROGRAM_CHANGED} from './types'

const initialState: ProgramsState = {
    programs: [{
        id: 1,
        name: 'test',
        sets: [{
            id: 1,
            name: 'interwały',
            exercises: [{id: 1, exercise: {id: 1, name: 'pompki'}}, {id: 2, exercise: {id: 2, name: 'przysiady'}}, {id: 3, exercise: {id: 3, name: 'brzuszki'}}]
        }, {
            id: 2,
            name: 'interwały2',
            exercises: []
        }]
    }, {
        id: 2,
        name: 'test2',
        sets: [{
            id: 1,
            name: 'test',
            exercises: [{id: 1, exercise: {id: 1, name: 'pompki'}}]
        }]
    }],
}

export const programsReducer = (state = initialState, action: ProgramsActionTypes): ProgramsState => {
    switch (action.type) {
        case SELECTED_PROGRAM_CHANGED: {

            return {
                ...state,
                selectedProgram: action.program,
            }
        }
        default:
            return state
    }
}
