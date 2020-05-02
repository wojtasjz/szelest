import {ExerciseProgram, ExerciseSet} from '../types/exerciseProgram'

interface OptionalExerciseProgram {
    id?: number,
    name?: string,
}

interface OptionalExerciseSet {
    id?: number,
    name?: string,
}

export const calculateProgramTotalTime = (program: ExerciseProgram) : number => {
    return program && program.sets ? program.sets.reduce((sum, set) => sum + calculateProgramSetTotalTime(set), 0) : 0
}

export const calculateProgramSetTotalTime = (set: ExerciseSet) : number => {
    return set && set.exercises ? set.exercises.reduce((sum, exercise) => sum + exercise.time || 0, 0) : 0
}

export const cloneProgram = (program: ExerciseProgram, override?: OptionalExerciseProgram) : ExerciseProgram => ({
    ...program,
    ...(override ? override : {}),
    sets: [...program.sets.map(set => cloneSet(set))]
})

export const cloneSet = (set: ExerciseSet, override?: OptionalExerciseSet) : ExerciseSet => ({
    ...set,
    ...(override ? override : {}),
    exercises: [...set.exercises],
})