import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {List} from '@material-ui/core'
import {createSelector} from 'reselect'
import {ExerciseProgram} from '../../types/exerciseProgram'
import SubheaderWithIconButton from '../../components/subheaderWithIconButton'
import {AppState} from '../../store'
import {addProgram, changeSelectedProgram} from '../../store/editPrograms/actions'
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
    (state: AppState) => state.editPrograms.programs,
    (state: AppState) => state.exercises.exercises,
    (programs: ExerciseProgram[], exercises: Exercise[]) => replaceExerciseIdWithName(programs, exercises)
)

const ProgramList : React.FunctionComponent= () => {
    const dispatch = useDispatch()
    const selectedProgramId: number | undefined = useSelector((state: AppState) => state.editPrograms.selectedProgramId)
    const programs: ExerciseProgram[] = useSelector((state: AppState) => state.editPrograms.programs)

    return <List
        component="nav"
        subheader={
            <SubheaderWithIconButton
                showAddButton
                subheaderText="Wybierz program"
                onAddButtonClicked={() => dispatch(addProgram())}
            />
        }
    >
        {programs.map(program => <ProgramListItem
            key={`program-${program.id}`}
            program={program}
            selected={program.id === selectedProgramId}
            onListItemClick={() => dispatch(changeSelectedProgram(program.id))}
        />)}
    </List>
}

export default ProgramList
