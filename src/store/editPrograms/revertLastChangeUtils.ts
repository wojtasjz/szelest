import {EditProgramsState, ProgramChange} from './types'
import {ExerciseProgram, ExerciseSet, ProgramExercise} from '../../types/exerciseProgram'

const handleRevertAddProgram = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.filter(program => program.id !== changeDetails.programId),
    }
}

const handleRevertAddSet = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId} = changeDetails

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.map(program => {
            if (program.id !== programId) {
                return program
            }

            return {
                ...program,
                sets: program.sets.filter(set => set.id !== setId),
            }
        })
    }
}

const handleRevertAddExercise = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId, exerciseId} = changeDetails

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.map(program => {
            if (program.id !== programId) {
                return program
            }

            return {
                ...program,
                sets: program.sets.map(set => {
                    if (set.id !== setId) {
                        return set
                    }

                    return {
                        ...set,
                        exercises: set.exercises.filter(exercise => exercise.id !== exerciseId),
                    }
                })
            }
        })
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

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.map(program => {
            if (program.id !== programId) {
                return program
            }
            const newSets = program.sets.slice()
            newSets.splice(index as number, 0, item as ExerciseSet)

            return {
                ...program,
                sets: newSets,
            }
        })
    }
}

const handleRevertDeleteExercise = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {index, item, programId, setId} = changeDetails

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.map(program => {
            if (program.id !== programId) {
                return program
            }

            return {
                ...program,
                sets: program.sets.map(set => {
                    if (set.id !== setId) {
                        return set
                    }
                    const newExercises = set.exercises.slice()
                    newExercises.splice(index as number, 0, item as ProgramExercise)

                    return {
                        ...set,
                        exercises: newExercises,
                    }
                })
            }
        })
    }
}

const handleRevertUpdateProgram = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, fieldName, fieldValue} = changeDetails

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.map(program => {
            if (program.id !== programId) {
                return program
            }

            return {
                ...program,
                [fieldName as string]: fieldValue,
            }
        })
    }
}

const handleRevertUpdateSet = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId, fieldName, fieldValue} = changeDetails

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.map(program => {
            if (program.id !== programId) {
                return program
            }

            return {
                ...program,
                sets: program.sets.map(set => {
                    if (set.id !== setId) {
                        return set
                    }

                    return {
                        ...set,
                        [fieldName as string]: fieldValue,
                    }
                })
            }
        })
    }
}

const handleRevertUpdateExercise = (state: EditProgramsState, changeDetails: ProgramChange) : EditProgramsState => {
    const {programId, setId, exerciseId, fieldName, fieldValue} = changeDetails

    return {
        ...state,
        lastChanges: state.lastChanges.slice(0, -1),
        programs: state.programs.map(program => {
            if (program.id !== programId) {
                return program
            }

            return {
                ...program,
                sets: program.sets.map(set => {
                    if (set.id !== setId) {
                        return set
                    }

                    return {
                        ...set,
                        exercises: set.exercises.map(exercise => {
                            if (exercise.id !== exerciseId) {
                                return exercise
                            }

                            return {
                                ...exercise,
                                [fieldName as string]: fieldValue,
                            }
                        }),
                    }
                })
            }
        })
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
            if (!lastChange.index || !lastChange.item) {
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
            if (!lastChange.fieldName || lastChange.fieldValue == null) {
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