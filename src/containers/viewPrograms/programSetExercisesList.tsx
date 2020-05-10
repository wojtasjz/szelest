import React from 'react'
import {ProgramSet} from '../../types/exerciseProgram'
import {List} from '@material-ui/core'
import ProgramSetExerciseListItem from './programSetExerciseListItem'

type Props = {
    set: ProgramSet,
    classes: any,
    setKey: string,
}

const ProgramSetExerciseList : React.FunctionComponent<Props> = (props) => (
    <List
        component="nav"
        aria-labelledby="nested-list"
        dense disablePadding
        className={props.classes.nested}
    >
        {props.set.exercises.map(exercise => <ProgramSetExerciseListItem
            key={`${props.setKey}-exercise-${exercise.id}`}
            exercise={exercise}
        />)}
    </List>
)

export default ProgramSetExerciseList
