export type ProgramExercise = {
    id: number,
    name: string,
    time: number
}

export type ExerciseSet = {
    id: number,
    name: string,
    break: number,
    repeat: number,
    exercises: ProgramExercise[],
}

export type ExerciseProgram = {
    id: number,
    name: string,
    sets: ExerciseSet[]
}
