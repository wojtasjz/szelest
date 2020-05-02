import {EDIT_MODE_STATE_CHANGED} from './types'

export const changeEditModeState = (editMode: boolean) => {
    return {
        type: EDIT_MODE_STATE_CHANGED,
        editMode,
    }
}
