import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {List, ListSubheader} from '@material-ui/core'
import {createSelector} from 'reselect'
import {ExerciseProgram} from '../../types/exerciseProgram'
import {AppState} from '../../store'
import {changeSelectedProgram} from '../../store/programs/actions'
import {Exercise} from '../../store/exercises/types'
import ProgramListItem from './programListItem'

const replaceExerciseIdWithName = (programs: ExerciseProgram[], exercises: Exercise[]) => {
    const exercisesMap: {[key: number]: string} = exercises.reduce((result, exercise) => ({...result, [exercise.id]: exercise.name}), {})

    return programs.map(program => ({
        ...program,
        sets: program.sets.map(set => ({
            ...set,
            exercises: set.exercises.map(exercise => ({
                ...exercise,
                name: exercisesMap[exercise.id] || 'błąd',
            }))
        }))
    }))
}

const getProgramsSelector = createSelector(
    (state: AppState) => state.programs.programs,
    (state: AppState) => state.exercises.exercises,
    (programs: ExerciseProgram[], exercises: Exercise[]) => replaceExerciseIdWithName(programs, exercises)
)

const getSelectedProgramIdSelector = createSelector(
    (state: AppState) => state.programs.selectedProgram,
    (program: ExerciseProgram | undefined) => program ? program.id : undefined
)

const ProgramList : React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const selectedProgramId: number | undefined = useSelector(getSelectedProgramIdSelector)
    const programs: ExerciseProgram[] = useSelector((state: AppState) => state.programs.programs)

    return <List
        component="nav"
        subheader={<ListSubheader component="div">Wybierz program</ListSubheader>}
    >
        {programs.map(program => <ProgramListItem
            key={`program-${program.id}`}
            program={program}
            selected={program.id === selectedProgramId}
            onListItemClick={() => dispatch(changeSelectedProgram(program))}
        />)}
    </List>
}

export default ProgramList
