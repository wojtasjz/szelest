import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {systemReducer} from './system/reducers'
import {programsReducer} from './programs/reducers'
import {editProgramsReducer} from './editPrograms/reducers'
import {exercisesReducer} from './exercises/reducers'

const rootReducer = combineReducers({
    system: systemReducer,
    programs: programsReducer,
    editPrograms: editProgramsReducer,
    exercises: exercisesReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
    const middlewares = [thunkMiddleware]
    const middleWareEnhancer = applyMiddleware(...middlewares)

    return createStore(
        rootReducer,
        composeWithDevTools(middleWareEnhancer)
    )
}
