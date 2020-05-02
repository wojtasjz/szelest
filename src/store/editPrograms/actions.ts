import {
    PROGRAM_ADDED,
    PROGRAM_UPDATED,
    PROGRAM_DELETED,
    EDIT_MODE_INITIALIZED,
    EDIT_MODE_FINISHED,
    LAST_CHANGE_REVERTED,
} from './types'
import {ExerciseProgram} from '../../types/exerciseProgram'

export const addProgram = (program?: ExerciseProgram) => {
    return {
        type: PROGRAM_ADDED,
        program,
    }
}

export const deleteProgram = (programId: number) => {
    return {
        type: PROGRAM_DELETED,
        programId,
    }
}

export const updateProgram = (programId: number, name: string) => {
    return {
        type: PROGRAM_UPDATED,
        programId,
        name,
    }
}

export const initializeEditMode = (programs: ExerciseProgram[]) => {
    return {
        type: EDIT_MODE_INITIALIZED,
        programs,
    }
}

export const finishEditMode = () => {
    return {
        type: EDIT_MODE_FINISHED,
    }
}

export const revertLastChange = () => {
    return {
        type: LAST_CHANGE_REVERTED,
    }
}
