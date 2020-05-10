import {
    PROGRAM_ADDED,
    PROGRAM_DELETED,
    PROGRAM_UPDATED,
    SET_ADDED,
    SET_DELETED,
    SET_UPDATED,
    SETS_REORDERED,
    PROGRAM_EXERCISE_ADDED,
    PROGRAM_EXERCISE_UPDATED,
    PROGRAM_EXERCISE_DELETED,
    EXERCISES_REORDERED,
    EDIT_MODE_INITIALIZED,
    EDIT_MODE_FINISHED,
    EDIT_MODE_CANCELLED,
    LAST_CHANGE_REVERTED,
    SELECTED_EDITABLE_PROGRAM_CHANGED,
    EditProgramsActionTypes,
    EditProgramsState,
    AddProgramAction,
} from './types'
import {ExerciseProgram, ProgramSet, ProgramSetExercise} from '../../types/exerciseProgram'
import {cloneProgram, cloneSet, getFieldValue, newId} from '../../utils/exerciseProgramUtils'
import {handleRevertLastChange} from './revertLastChangeUtils'
import {stateWithValidation} from './programsValidationUtils'
import {updateProgram, updateProgramSet, updateProgramSetExercise} from './editProgramUtils'

const initialState: EditProgramsState = {
    programs: [],
    lastChanges: [],
    isValid: true,
    editModeStarted: false,
    invalidPrograms: [],
}

export const editProgramsReducer = (state = initialState, action: EditProgramsActionTypes): EditProgramsState => {
    switch (action.type) {
        case EDIT_MODE_INITIALIZED:
            if (action.programs.length === 0 || state.editModeStarted) {
                return state
            }

            return {
                ...state,
                editModeStarted: true,
                programs: action.programs.map(program => cloneProgram(program))
            }
        case EDIT_MODE_FINISHED:
        case EDIT_MODE_CANCELLED:
            return initialState
        case SELECTED_EDITABLE_PROGRAM_CHANGED: {

            return {
                ...state,
                selectedProgramId: action.programId,
            }
        }
        case PROGRAM_ADDED: {
            const {program} = action as AddProgramAction
            const newProgramId = newId(state.programs)
            let programToAdd: ExerciseProgram = {
                ...(program ? cloneProgram(program, {name: `Klon ${program.name}`}) : {sets: [], name: ''}),
                id: newProgramId
            }

            return stateWithValidation({
                ...state,
                programs: [...state.programs, programToAdd],
                lastChanges: [...state.lastChanges, {changeType: "ADD", programId: newProgramId}]
            })
        }
        case PROGRAM_UPDATED: {
            let oldFieldValue = null
            const updateProgramAction = (program: ExerciseProgram) => {
                oldFieldValue = program.name

                return {
                    ...program,
                    name: action.name,
                }
            }

            return stateWithValidation({
                ...state,
                programs: updateProgram(action.programId, state.programs, updateProgramAction),
                lastChanges: [...state.lastChanges, {changeType: "UPDATE", programId: action.programId, fieldName: 'name', fieldValue: oldFieldValue}]
            })
        }
        case PROGRAM_DELETED: {
            let indexOfRemovedItem: number = -1
            let removedItem: ExerciseProgram | undefined = undefined
            const newPrograms = state.programs.filter((program, index) => {
                if (program.id === action.programId) {
                    indexOfRemovedItem = index
                    removedItem = program

                    return false
                }

                return true
            })

            return stateWithValidation({
                ...state,
                lastChanges: [...state.lastChanges, {changeType: "DELETE", item: removedItem, index: indexOfRemovedItem}],
                programs: newPrograms,
                ...(state.selectedProgramId && action.programId === state.selectedProgramId ? {selectedProgramId: undefined} : {})
            })
        }
        case SET_ADDED: {
            const {set, programId} = action
            const program = state.programs.find(program => program.id === programId)
            if (!program) {
                return state
            }
            const newSetId = newId(program.sets)
            let setToAdd: ProgramSet = {
                ...(set ? cloneSet(set, {name: `Klon ${set.name}`}) : {exercises: [], name: '', repeat: 0, break: 0}),
                id: newSetId
            }
            const updateProgramAction = (program: ExerciseProgram) => ({
                ...program,
                sets: [...program.sets, setToAdd]
            })

            return stateWithValidation({
                ...state,
                programs: updateProgram(programId, state.programs, updateProgramAction),
                lastChanges: [...state.lastChanges, {changeType: "ADD", programId: programId, setId: newSetId}]
            })
        }
        case SET_UPDATED: {
            const {setId, programId, fieldName, fieldValue} = action
            let oldFieldValue = null
            const updateSetAction = (set: ProgramSet) => {
                oldFieldValue = getFieldValue(set, fieldName)

                return {
                    ...set,
                    [fieldName]: fieldValue,
                }
            }

            return stateWithValidation({
                ...state,
                programs: updateProgramSet(programId, setId, state.programs, updateSetAction),
                lastChanges: [...state.lastChanges, {changeType: "UPDATE", programId, setId, fieldName: 'name', fieldValue: oldFieldValue}]
            })
        }
        case SET_DELETED: {
            const {setId, programId} = action
            let indexOfRemovedItem: number = -1
            let removedItem: ProgramSet | undefined = undefined
            const updateProgramAction = (program: ExerciseProgram) => ({
                ...program,
                sets: program.sets.filter((set, index) => {
                    if (set.id === setId) {
                        indexOfRemovedItem = index
                        removedItem = set

                        return false
                    }

                    return true
                })
            })

            return stateWithValidation({
                ...state,
                programs: updateProgram(programId, state.programs, updateProgramAction),
                lastChanges: [...state.lastChanges, {changeType: "DELETE", programId, item: removedItem, index: indexOfRemovedItem}],
            })
        }
        case SETS_REORDERED: {
            const {sets, programId} = action
            const updateProgramAction = (program: ExerciseProgram) => ({
                ...program,
                sets: sets
            })

            return {
                ...state,
                programs: updateProgram(programId, state.programs, updateProgramAction),
            }
        }
        case PROGRAM_EXERCISE_ADDED: {
            const {programId, setId, exercise} = action
            const program = state.programs.find(item => item.id === programId)
            if (!program) {
                return state
            }
            const set = program.sets.find(item => item.id === setId)
            if (!set) {
                return state
            }
            const newExerciseId = newId(set.exercises)
            let exerciseToAdd: ProgramSetExercise = {
                ...(exercise || {}),
                id: newExerciseId
            }
            const updateSetAction = (set: ProgramSet) => ({
                ...set,
                exercises: [...set.exercises, exerciseToAdd]
            })

            return stateWithValidation({
                ...state,
                programs: updateProgramSet(programId, setId, state.programs, updateSetAction),
                lastChanges: [...state.lastChanges, {changeType: "ADD", programId, setId, exerciseId: newExerciseId}]
            })
        }
        case PROGRAM_EXERCISE_UPDATED: {
            const {setId, programId, exerciseId, fieldName, fieldValue} = action
            let oldFieldValue = null
            const updateSetExerciseAction = (exercise: ProgramSetExercise) => {
                oldFieldValue = getFieldValue(exercise, fieldName)

                return {
                    ...exercise,
                    [fieldName]: fieldValue,
                }
            }

            return stateWithValidation({
                ...state,
                programs: updateProgramSetExercise(programId, setId, exerciseId, state.programs, updateSetExerciseAction),
                lastChanges: [...state.lastChanges, {changeType: "UPDATE", programId, setId, exerciseId, fieldName, fieldValue: oldFieldValue}]
            })
        }
        case PROGRAM_EXERCISE_DELETED: {
            const {setId, programId, exerciseId} = action
            let indexOfRemovedItem: number = -1
            let removedItem: ProgramSetExercise | undefined = undefined
            const updateProgramSetAction = (set: ProgramSet) => ({
                ...set,
                exercises: set.exercises.filter((exercise, index) => {
                    if (exercise.id === exerciseId) {
                        indexOfRemovedItem = index
                        removedItem = exercise

                        return false
                    }

                    return true
                })
            })

            return stateWithValidation({
                ...state,
                programs: updateProgramSet(programId, setId, state.programs, updateProgramSetAction),
                lastChanges: [...state.lastChanges, {changeType: "DELETE", programId, setId, item: removedItem, index: indexOfRemovedItem}],
            })
        }
        case EXERCISES_REORDERED: {
            const {exercises, programId, setId} = action
            const updateProgramSetAction = (set: ProgramSet) => ({
                ...set,
                exercises: exercises
            })

            return {
                ...state,
                programs: updateProgramSet(programId, setId, state.programs, updateProgramSetAction),
            }
        }
        case LAST_CHANGE_REVERTED: {
            if (state.lastChanges.length === 0) {
                return state
            }

            return stateWithValidation(handleRevertLastChange(state))
        }
        default:
            return state
    }
}
