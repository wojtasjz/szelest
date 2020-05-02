import {ProgramsActionTypes, ProgramsState} from './types'

const initialState: ProgramsState = {
    programs: [{
        id: 1,
        name: 'test',
        sets: [{
            id: 1,
            name: 'interwały',
            break: 0,
            repeat: 0,
            exercises: [{id: 1, name: 'pompki', time: 10}, {id: 2, name: 'przysiady', time: 20}, {id: 3, name: 'brzuszki', time: 30}]
        }, {
            id: 2,
            name: 'interwały2',
            break: 0,
            repeat: 0,
            exercises: [{id: 1, name: 'pressy', time: 1}, {id: 2, name: 'cleany', time: 2}, {id: 3, name: 'lunge', time: 3}]
        }]
    }, {
        id: 2,
        name: 'test2',
        sets: [{
            id: 1,
            name: 'test',
            break: 0,
            repeat: 0,
            exercises: [{id: 1, name: 'test', time: 100}]
        }]
    }],
}

export const programsReducer = (state = initialState, action: ProgramsActionTypes): ProgramsState => {
    return state
}
