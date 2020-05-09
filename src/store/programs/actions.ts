import {FETCH_PROGRAMS_STARTED, SELECTED_PROGRAM_CHANGED} from './types'
import {ExerciseProgram} from '../../types/exerciseProgram'

export const fetchPrograms = () => {
    return {
        type: FETCH_PROGRAMS_STARTED,
    }
}

export const changeSelectedProgram = (program: ExerciseProgram) => {
    return {
        type: SELECTED_PROGRAM_CHANGED,
        program,
    }
}
