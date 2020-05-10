import {EditProgramsState, ProgramChange} from './types'
import {ExerciseProgram, ProgramSet, ProgramSetExercise} from '../../types/exerciseProgram'
import {updateProgram, updateProgramSet, updateProgramSetExercise} from './editProgramUtils'

const handleRevertAddProgram = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.filter(program => program.id !== changeDetails.programId),
    }
}

const handleRevertAddSet = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId} = changeDetails
    const updateProgramAction = (program: ExerciseProgram) => ({
        ...program,
        sets: program.sets.filter(set => set.id !== setId),
    })

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: updateProgram(programId as number, state.programs, updateProgramAction)
    }
}

const handleRevertAddExercise = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId, exerciseId} = changeDetails
    const updateSetAction = (set: ProgramSet) => ({
        ...set,
        exercises: set.exercises.filter(exercise => exercise.id !== exerciseId),
    })

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: updateProgramSet(programId as number, setId as number, state.programs, updateSetAction)
    }
}

const handleRevertDeleteProgram = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {index, item} = changeDetails
    const newPrograms = state.programs.slice()
    newPrograms.splice(index as number, 0, item as ExerciseProgram)

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: newPrograms,
    }
}

const handleRevertDeleteSet = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {index, item, programId} = changeDetails
    const updateProgramAction = (program: ExerciseProgram) => {
        const newSets = program.sets.slice()
        newSets.splice(index as number, 0, item as ProgramSet)

        return {
            ...program,
            sets: newSets,
        }
    }

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: updateProgram(programId as number, state.programs, updateProgramAction)
    }
}

const handleRevertDeleteExercise = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {index, item, programId, setId} = changeDetails
    const updateSetAction = (set: ProgramSet) => {
        const newExercises = set.exercises.slice()
        newExercises.splice(index as number, 0, item as ProgramSetExercise)

        return {
            ...set,
            exercises: newExercises,
        }
    }

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: updateProgramSet(programId as number, setId as number, state.programs, updateSetAction)
    }
}

const handleRevertUpdateProgram = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, fieldName, fieldValue} = changeDetails
    const updateProgramAction = (program: ExerciseProgram) => ({
        ...program,
        [fieldName as string]: fieldValue,
    })

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: updateProgram(programId as number, state.programs, updateProgramAction)
    }
}

const handleRevertUpdateSet = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId, fieldName, fieldValue} = changeDetails
    const updateSetAction = (set: ProgramSet) => ({
        ...set,
        [fieldName as string]: fieldValue,
    })

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: updateProgramSet(programId as number, setId as number, state.programs, updateSetAction)
    }
}

const handleRevertUpdateExercise = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId, exerciseId, fieldName, fieldValue} = changeDetails
    const updateExerciseAction = (exercise: ProgramSetExercise) => ({
        ...exercise,
        [fieldName as string]: fieldValue,
    })

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: updateProgramSetExercise(programId as number, setId as number, exerciseId as number, state.programs, updateExerciseAction)
    }
}

export const handleRevertLastChange = (state: EditProgramsState) : EditProgramsState => {
    const lastChange = state.lastChanges[state.lastChanges.length - 1]
    switch (lastChange.changeType) {
        case "ADD": {
            if (lastChange.exerciseId) {
                return handleRevertAddExercise(state, lastChange)
            }
            if (lastChange.setId) {
                return handleRevertAddSet(state, lastChange)
            }

            return handleRevertAddProgram(state, lastChange)
        }
        case "DELETE": {
            if (lastChange.index == null || !lastChange.item) {
                return state
            }
            if (lastChange.setId) {
                return handleRevertDeleteExercise(state, lastChange)
            }
            if (lastChange.programId) {
                return handleRevertDeleteSet(state, lastChange)
            }

            return handleRevertDeleteProgram(state, lastChange)
        }
        case "UPDATE": {
            if (!lastChange.fieldName) {
                return state
            }
            if (lastChange.exerciseId) {
                return handleRevertUpdateExercise(state, lastChange)
            }
            if (lastChange.setId) {
                return handleRevertUpdateSet(state, lastChange)
            }

            return handleRevertUpdateProgram(state, lastChange)
        }
    }

    return state
}
