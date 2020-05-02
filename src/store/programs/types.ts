import {ExerciseProgram} from '../../types/exerciseProgram'

export interface ProgramsState {
    programs: ExerciseProgram[],
}

export const FETCH_PROGRAMS_STARTED = 'FETCH_PROGRAMS_STARTED'
export const FETCH_PROGRAMS_FAILED = 'FETCH_PROGRAMS_FAILED'
export const FETCH_PROGRAMS_FINISHED = 'FETCH_PROGRAMS_FINISHED'

interface FetchProgramStartedAction {
    type: typeof FETCH_PROGRAMS_STARTED
}

interface FetchProgramFailedAction {
    type: typeof FETCH_PROGRAMS_FAILED
}

interface FetchProgramFinishedAction {
    type: typeof FETCH_PROGRAMS_FINISHED
}

export type ProgramsActionTypes = FetchProgramStartedAction | FetchProgramFailedAction | FetchProgramFinishedAction
