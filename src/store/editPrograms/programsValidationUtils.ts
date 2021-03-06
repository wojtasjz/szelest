import {ExerciseProgram, ProgramSet, ProgramSetExercise} from '../../types/exerciseProgram'
import {EditProgramsState} from './types'

const isExerciseInvalid = (exercise: ProgramSetExercise): boolean => {
    return !exercise.exercise
}

const isSetInvalid = (set: ProgramSet): boolean => {
    return !set.name || set.exercises.length === 0 || set.exercises.some(exercise => isExerciseInvalid(exercise))
}

const isProgramInvalid = (program: ExerciseProgram): boolean => {
    return !program.name || program.sets.length === 0 || program.sets.some(set => isSetInvalid(set))
}

const validatePrograms = (programs: ExerciseProgram[]): number[] => programs.reduce<number[]>((result, program) => {
    return isProgramInvalid(program) ? [...result, program.id] : result
}, [])

export const stateWithValidation = (state: EditProgramsState) => {
    const invalidPrograms = validatePrograms(state.programs)

    return {
        ...state,
        invalidPrograms,
        isValid: invalidPrograms.length === 0
    }
}
