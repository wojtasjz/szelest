import {ExerciseProgram} from '../../types/exerciseProgram'

export interface ProgramsState {
    programs: ExerciseProgram[]
    selectedProgram?: ExerciseProgram
}

export const FETCH_PROGRAMS_STARTED = 'FETCH_PROGRAMS_STARTED'
export const FETCH_PROGRAMS_FAILED = 'FETCH_PROGRAMS_FAILED'
export const FETCH_PROGRAMS_FINISHED = 'FETCH_PROGRAMS_FINISHED'
export const SELECTED_PROGRAM_CHANGED = 'SELECTED_PROGRAM_CHANGED'

interface FetchProgramStartedAction {
    type: typeof FETCH_PROGRAMS_STARTED
}

interface FetchProgramFailedAction {
    type: typeof FETCH_PROGRAMS_FAILED
}

interface FetchProgramFinishedAction {
    type: typeof FETCH_PROGRAMS_FINISHED
}

interface SelectedProgramChangedFinishedAction {
    type: typeof SELECTED_PROGRAM_CHANGED
    program: ExerciseProgram
}

export type ProgramsActionTypes = FetchProgramStartedAction | FetchProgramFailedAction | FetchProgramFinishedAction | SelectedProgramChangedFinishedAction
