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
    selectedProgramId?: number,
    lastChanges: ProgramChange[],
    isValid: boolean,
    editModeStarted: boolean,
    invalidPrograms: number[]
}

export const EDIT_MODE_INITIALIZED = 'EDIT_MODE_INITIALIZED'
export const SELECTED_EDITABLE_PROGRAM_CHANGED = 'SELECTED_EDITABLE_PROGRAM_CHANGED'
export const PROGRAM_ADDED = 'PROGRAM_ADDED'
export const PROGRAM_DELETED = 'PROGRAM_DELETED'
export const PROGRAM_UPDATED = 'PROGRAM_UPDATED'
export const SET_ADDED = 'SET_ADDED'
export const SET_UPDATED = 'SET_UPDATED'
export const SET_DELETED = 'SET_DELETED'
export const SETS_REORDERED = 'SETS_REORDERED'
export const PROGRAM_EXERCISE_ADDED = 'PROGRAM_EXERCISE_ADDED'
export const PROGRAM_EXERCISE_UPDATED = 'PROGRAM_EXERCISE_UPDATED'
export const PROGRAM_EXERCISE_DELETED = 'PROGRAM_EXERCISE_DELETED'
export const EXERCISES_REORDERED = 'EXERCISES_REORDERED'
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

interface UpdateSetAction {
    type: typeof SET_UPDATED
    programId: number
    setId: number
    fieldName: keyof ExerciseSet
    fieldValue: string | number
}

interface DeleteSetAction {
    type: typeof SET_DELETED
    programId: number
    setId: number
}

interface ReorderSetsAction {
    type: typeof SETS_REORDERED
    programId: number
    sets: ExerciseSet[]
}

interface AddExerciseAction {
    type: typeof PROGRAM_EXERCISE_ADDED
    programId: number
    setId: number
    exercise?: ProgramExercise
}

interface UpdateExerciseAction {
    type: typeof PROGRAM_EXERCISE_UPDATED
    programId: number
    setId: number
    exerciseId: number
    fieldName: keyof ProgramExercise
    fieldValue: string | number
}

interface DeleteExerciseAction {
    type: typeof PROGRAM_EXERCISE_DELETED
    programId: number
    setId: number
    exerciseId: number
}

interface ReorderExercisesAction {
    type: typeof EXERCISES_REORDERED
    programId: number
    setId: number
    exercises: ProgramExercise[]
}

interface ChangeSelectedProgramAction {
    type: typeof SELECTED_EDITABLE_PROGRAM_CHANGED
    programId: number
}

export type EditProgramsActionTypes = AddProgramAction | DeleteProgramAction | AddSetAction | DeleteSetAction | AddExerciseAction | DeleteExerciseAction | InitializeEditModeAction
    | FinishEditModeAction | CancelEditModeAction | RevertLastChangeAction | UpdateProgramAction | UpdateSetAction | ChangeSelectedProgramAction | UpdateExerciseAction
    | ReorderSetsAction | ReorderExercisesAction
