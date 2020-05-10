import React from 'react'
import {ProgramSetExercise} from '../../types/exerciseProgram'
import {ListItem, ListItemText} from '@material-ui/core'

type Props = {
    exercise: ProgramSetExercise,
}

const ProgramSetExerciseListItem : React.FunctionComponent<Props> = ({exercise}) => (
    <ListItem component="div">
        <ListItemText primary={exercise.exercise ? exercise.exercise.name : ''} secondary="jakiś opis" />
    </ListItem>
)

export default ProgramSetExerciseListItem
