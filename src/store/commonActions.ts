import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {initializeEditMode} from './editPrograms/actions'
import {AppState} from './'

export const changeToEditModeStateThunk = (): ThunkAction<void, AppState, null, Action<string>> => (dispatch, getState) => {
    const state = getState()
    if (!state.editPrograms.editModeStarted) {
        dispatch(initializeEditMode(state.programs.programs))
    }
}
