import {ExerciseProgram, ProgramSet} from '../types/exerciseProgram'

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

export const calculateProgramSetTotalTime = (set: ProgramSet) : number => {
    return set && set.exercises ? set.exercises.reduce((sum, exercise) => sum + (exercise.time || 0), 0) : 0
}

export const cloneProgram = (program: ExerciseProgram, override?: OptionalExerciseProgram) : ExerciseProgram => ({
    ...program,
    ...(override ? override : {}),
    sets: [...program.sets.map(set => cloneSet(set))]
})

export const cloneSet = (set: ProgramSet, override?: OptionalExerciseSet) : ProgramSet => ({
    ...set,
    ...(override ? override : {}),
    exercises: [...set.exercises],
})

const getSetExerciseIds = (set: ProgramSet): number[] =>
    set.exercises.reduce<number[]>((result, exercise) => [...result, ...(exercise.exercise ? [exercise.exercise.id] : [])], [])

export const getUsedExercises = (program: ExerciseProgram): number[] => {
    return program.sets.flatMap(set => getSetExerciseIds(set))
}

export function getFieldValue<T, K extends keyof T> (obj: T, key: K) {
    return obj[key]
}

interface objectWithId {
    id: number
}

export const newId = (collection: objectWithId[]) => {
    const currentMax = Math.max(...collection.map(item => item.id))

    return currentMax > 0 ? currentMax + 1 : 1
}
