import {FETCH_PROGRAMS_STARTED} from './types'

export const fetchPrograms = () => {
    return {
        type: FETCH_PROGRAMS_STARTED,
    }
}
