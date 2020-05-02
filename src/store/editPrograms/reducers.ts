import {
    PROGRAM_ADDED,
    PROGRAM_DELETED,
    PROGRAM_UPDATED,
    EDIT_MODE_INITIALIZED,
    EDIT_MODE_FINISHED,
    EDIT_MODE_CANCELLED,
    LAST_CHANGE_REVERTED,
    EditProgramsActionTypes,
    EditProgramsState,
    AddProgramAction,
} from './types'
import {ExerciseProgram} from '../../types/exerciseProgram'
import {cloneProgram} from '../../utils/exerciseProgramUtils'
import {newId} from '../utils'
import {handleRevertLastChange} from './revertLastChangeUtils'
import {stateWithValidation} from './programsValidationUtils'

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
        case PROGRAM_ADDED: {
            const {program} = action as AddProgramAction
            const newProgramId = newId(state.programs)
            let programToAdd: ExerciseProgram = program || {id: 0, sets: [], name: ''}
            if (program) {
                programToAdd = cloneProgram(program, {name: `Klon ${program.name}`})
            } else {
                programToAdd = {id: 0, sets: [], name: ''}
            }
            programToAdd.id = newProgramId

            return stateWithValidation({
                ...state,
                programs: [...state.programs, programToAdd],
                lastChanges: [...state.lastChanges, {changeType: "ADD", programId: newProgramId}]
            })
        }
        case PROGRAM_UPDATED: {
            let oldFieldValue = null

            return stateWithValidation({
                ...state,
                programs: state.programs.map(program => {
                    if (program.id !== action.programId) {
                        return program
                    }
                    oldFieldValue = program.name

                    return {
                        ...program,
                        name: action.name,
                    }
                }),
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
            })
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
