import { EDIT_MODE_STATE_CHANGED, SystemState, SystemActionTypes } from './types'

const initialState: SystemState = {
    editMode: false,
}

export const systemReducer = (state = initialState, action: SystemActionTypes): SystemState => {
    switch (action.type) {
        case EDIT_MODE_STATE_CHANGED: {
            return {
                ...state,
                editMode: action.editMode,
            }
        }
        default:
            return state
    }
}
