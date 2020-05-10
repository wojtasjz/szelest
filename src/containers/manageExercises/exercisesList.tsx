import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHotkeys} from 'react-hotkeys-hook'
import {List} from '@material-ui/core'
import {createSelector} from 'reselect'
import SubheaderWithIconButton from '../../components/subheaderWithIconButton'
import {addExercise} from '../../store/exercises/actions'
import {AppState} from '../../store'
import {Exercise, ExerciseProgram} from '../../types/exerciseProgram'
import {getUsedExercises} from '../../utils/exerciseProgramUtils'
import ExerciseListItem from './exerciseListItem'
import {ExerciseItem} from './types'

const exercisesSelector = createSelector(
    (state: AppState) => state.exercises.exercises,
    (state: AppState) => state.editPrograms.programs,
    (state: AppState) => state.programs.programs,
    (exercises: Exercise[], editPrograms: ExerciseProgram[], programs: ExerciseProgram[]): ExerciseItem[] => {
        const userExercisesSet = new Set(([...editPrograms, ...programs].flatMap(program => getUsedExercises(program))))
        const usedExercises: number[] = Array.from(userExercisesSet.values())

        return exercises.map(exercise => ({...exercise, inUse: usedExercises.includes(exercise.id)}))
    }
)

const ExercisesList : React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const exercises: ExerciseItem[] = useSelector(exercisesSelector)
    const [maxId, setMaxId] = React.useState<number>(Math.max(...exercises.map(item => item.id)))
    const addExerciseHandler = () => {
        const newId = maxId + 1
        setMaxId(newId)
        dispatch(addExercise(newId))
    }
    useHotkeys('alt+a', addExerciseHandler)

    return <List
        component="nav"
        dense disablePadding
        subheader={
            <SubheaderWithIconButton
                showAddButton
                subheaderText="Edytuj ćwiczenia"
                onAddButtonClicked={addExerciseHandler}
            />
        }
    >
        {exercises.map(exercise => <ExerciseListItem key={`exercise-${exercise.id}`} exercise={exercise} />)}
    </List>
}

export default ExercisesList
