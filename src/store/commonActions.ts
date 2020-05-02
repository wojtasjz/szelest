import {Action} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {changeEditModeState} from './system/actions'
import {initializeEditMode, finishEditMode} from './editPrograms/actions'
import {AppState} from './'

export const changeEditModeStateThunk = (editMode: boolean): ThunkAction<void, AppState, null, Action<string>> => (dispatch, getState) => {
    dispatch(changeEditModeState(editMode))
    const state = getState()
    if (editMode && !state.editPrograms.editModeStarted) {
        dispatch(initializeEditMode(state.programs.programs))
    }
}

export const finishEditModeThunk = (): ThunkAction<void, AppState, null, Action<string>> => (dispatch) => {
    dispatch(changeEditModeState(false))
    dispatch(finishEditMode())
}