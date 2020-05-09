import React from 'react'
import {useSelector} from 'react-redux'
import {ExerciseSet} from '../../types/exerciseProgram'
import {List} from '@material-ui/core'
import ProgramSetExerciseListItem from './programSetExerciseListItem'
import {AppState} from '../../store'

type Props = {
    set: ExerciseSet,
    programId: number,
    classes: any,
    setKey: string,
}

const ProgramSetExerciseList : React.FunctionComponent<Props> = ({set, programId, classes, setKey}) => {
    const allExercises = useSelector((state: AppState) => state.exercises.exercises)

    return (
        <List
            component="nav"
            aria-labelledby="nested-list"
            dense disablePadding
            className={classes.nested}
        >
            {set.exercises.map(exercise => <ProgramSetExerciseListItem
                key={`${setKey}-exercise-${exercise.id}`}
                programId={programId}
                setId={set.id}
                exercise={exercise}
                allExercises={allExercises}
            />)}
        </List>
    )
}

export default ProgramSetExerciseList
