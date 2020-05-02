import {ExerciseProgram, ExerciseSet, ProgramExercise} from '../../types/exerciseProgram'

export type ChangeTypes = 'ADD' | 'DELETE' | 'UPDATE'

export interface ProgramChange {
    programId?: number
    setId?: number
    exerciseId?: number
    changeType: ChangeTypes
    fieldName?: string
    fieldValue?: any
    index?: number
    item?: ExerciseProgram | ExerciseSet | ProgramExercise
}

export interface EditProgramsState {
    programs: ExerciseProgram[],
    lastChanges: ProgramChange[],
    isValid: boolean,
    editModeStarted: boolean,
    invalidPrograms: number[]
}

export const EDIT_MODE_INITIALIZED = 'EDIT_MODE_INITIALIZED'
export const PROGRAM_ADDED = 'PROGRAM_ADDED'
export const PROGRAM_DELETED = 'PROGRAM_DELETED'
export const PROGRAM_UPDATED = 'PROGRAM_UPDATED'
export const SET_ADDED = 'PROGRAM_ADDED'
export const SET_DELETED = 'PROGRAM_DELETED'
export const EXERCISE_ADDED = 'PROGRAM_ADDED'
export const EXERCISE_DELETED = 'PROGRAM_DELETED'
export const LAST_CHANGE_REVERTED = 'LAST_CHANGE_REVERTED'
export const EDIT_MODE_FINISHED = 'EDIT_MODE_FINISHED'
export const EDIT_MODE_CANCELLED = 'EDIT_MODE_CANCELLED'

export interface InitializeEditModeAction {
    type: typeof EDIT_MODE_INITIALIZED
    programs: ExerciseProgram[]
}

export interface FinishEditModeAction {
    type: typeof EDIT_MODE_FINISHED
}

export interface CancelEditModeAction {
    type: typeof EDIT_MODE_CANCELLED
}

export interface RevertLastChangeAction {
    type: typeof LAST_CHANGE_REVERTED
}

export interface AddProgramAction {
    type: typeof PROGRAM_ADDED
    program?: ExerciseProgram
}

interface UpdateProgramAction {
    type: typeof PROGRAM_UPDATED
    programId: number
    name: string
}

interface DeleteProgramAction {
    type: typeof PROGRAM_DELETED
    programId: number
}

interface AddSetAction {
    type: typeof SET_ADDED
    programId: number
    set?: ExerciseSet
}

interface DeleteSetAction {
    type: typeof SET_DELETED
    programId: number
    setId: number
}

interface AddExerciseAction {
    type: typeof EXERCISE_ADDED
    programId: number
    programExercise?: ProgramExercise
}

interface DeleteExerciseAction {
    type: typeof EXERCISE_DELETED
    programId: number
    setId: number
    exerciseId: number
}

export type EditProgramsActionTypes = AddProgramAction | DeleteProgramAction | AddSetAction | DeleteSetAction | AddExerciseAction | DeleteExerciseAction | InitializeEditModeAction
    | FinishEditModeAction | CancelEditModeAction | RevertLastChangeAction | UpdateProgramAction
