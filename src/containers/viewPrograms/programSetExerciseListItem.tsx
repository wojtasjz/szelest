import React from 'react'
import {ProgramExercise} from '../../types/exerciseProgram'
import {ListItem, ListItemText} from '@material-ui/core'

type Props = {
    exercise: ProgramExercise,
}

const ProgramSetExerciseListItem : React.FunctionComponent<Props> = (props) => (
    <ListItem component="div">
        <ListItemText primary={props.exercise.name} secondary="jakiś opis" />
    </ListItem>
)

export default ProgramSetExerciseListItem