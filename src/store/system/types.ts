export interface SystemState {
    editMode: boolean
}

export const EDIT_MODE_STATE_CHANGED = 'EDIT_MODE_STATE_CHANGED'

interface EditModeStateChangedAction {
    type: typeof EDIT_MODE_STATE_CHANGED
    editMode: boolean
}

export type SystemActionTypes = EditModeStateChangedAction
