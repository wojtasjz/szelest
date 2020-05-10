import {
    PROGRAM_ADDED,
    PROGRAM_UPDATED,
    PROGRAM_DELETED,
    SET_ADDED,
    SET_UPDATED,
    SET_DELETED,
    SETS_REORDERED,
    PROGRAM_EXERCISE_ADDED,
    EXERCISES_REORDERED,
    EDIT_MODE_INITIALIZED,
    EDIT_MODE_FINISHED,
    LAST_CHANGE_REVERTED,
    SELECTED_EDITABLE_PROGRAM_CHANGED,
    PROGRAM_EXERCISE_UPDATED,
    PROGRAM_EXERCISE_DELETED,
} from './types'
import {ExerciseProgram, ProgramSet, ProgramSetExercise, Exercise} from '../../types/exerciseProgram'

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

export const addSet = (programId: number, set?: ProgramSet) => {
    return {
        type: SET_ADDED,
        programId,
        set,
    }
}

export const deleteSet = (programId: number, setId: number) => {
    return {
        type: SET_DELETED,
        programId,
        setId,
    }
}

export const updateSet = (programId: number, setId: number, fieldName: string, fieldValue: string | number) => {
    return {
        type: SET_UPDATED,
        programId,
        setId,
        fieldValue,
        fieldName
    }
}

export const reorderSets = (programId: number, sets: ProgramSet[]) => {
    return {
        type: SETS_REORDERED,
        programId,
        sets,
    }
}

export const reorderExercises = (programId: number, setId: number, exercises: ProgramSetExercise[]) => {
    return {
        type: EXERCISES_REORDERED,
        programId,
        setId,
        exercises,
    }
}

export const addSetExercise = (programId: number, setId: number, exercise?: ProgramSetExercise) => {
    return {
        type: PROGRAM_EXERCISE_ADDED,
        programId,
        setId,
        exercise
    }
}

export const updateSetExercise = (programId: number, setId: number, exerciseId: number, fieldName: string, fieldValue: string | number | Exercise) => {
    return {
        type: PROGRAM_EXERCISE_UPDATED,
        programId,
        setId,
        exerciseId,
        fieldValue,
        fieldName,
    }
}

export const deleteSetExercise = (programId: number, setId: number, exerciseId: number) => {
    return {
        type: PROGRAM_EXERCISE_DELETED,
        programId,
        setId,
        exerciseId,
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

export const changeSelectedProgram = (programId: number) => {
    return {
        type: SELECTED_EDITABLE_PROGRAM_CHANGED,
        programId,
    }
}
