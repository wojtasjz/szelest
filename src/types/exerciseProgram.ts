export type Exercise = {
    id: number,
    name: string,
}

export type ProgramSetExercise = {
    id: number,
    exercise?: Exercise,
    time?: number
    break?: number,
    repeat?: number,
}

export type ProgramSet = {
    id: number,
    name: string,
    time?: number
    break?: number,
    repeat?: number,
    exercises: ProgramSetExercise[],
}

export type ExerciseProgram = {
    id: number,
    name: string,
    sets: ProgramSet[]
}
