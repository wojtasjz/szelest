import {ExerciseProgram, ProgramSet, ProgramSetExercise} from '../../types/exerciseProgram'

export const updateProgram = (
    programId: number,
    allPrograms: ExerciseProgram[],
    action: (program: ExerciseProgram) => ExerciseProgram,
): ExerciseProgram[] => {
    return allPrograms.map(program => {
        if (program.id !== programId) {
            return program
        }

        return action(program)
    })
}

export const updateProgramSet = (
    programId: number,
    setId: number,
    allPrograms: ExerciseProgram[],
    action: (set: ProgramSet, program?: ExerciseProgram) => ProgramSet,
): ExerciseProgram[] => {
    const programUpdateAction = (program: ExerciseProgram) => ({
        ...program,
        sets: program.sets.map(set => {
            if (set.id !== setId) {
                return set
            }

            return action(set, program)
        })
    })

    return updateProgram(programId, allPrograms, programUpdateAction)
}

export const updateProgramSetExercise = (
    programId: number,
    setId: number,
    exerciseId: number,
    allPrograms: ExerciseProgram[],
    action: (program: ProgramSetExercise) => ProgramSetExercise,
): ExerciseProgram[] => {
    const setUpdateAction = (set: ProgramSet) => ({
        ...set,
        exercises: set.exercises.map(exercise => {
            if (exercise.id !== exerciseId) {
                return exercise
            }

            return action(exercise)
        })
    })

    return updateProgramSet(programId, setId, allPrograms, setUpdateAction)
}
