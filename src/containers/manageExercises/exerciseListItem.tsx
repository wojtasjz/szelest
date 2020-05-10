import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText, TextField} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {ExerciseItem} from './types'
import {deleteExercise, updateExercise} from '../../store/exercises/actions'

type Props = {
    exercise: ExerciseItem,
}

const ExerciseListItem : React.FunctionComponent<Props> = ({exercise}) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>(exercise.name)

    const onEditFinished = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            setValue(exercise.name)

            return
        }
        if (event.target.value !== exercise.name) {
            dispatch(updateExercise(exercise.id, event.target.value))
        }
    }

    return <ListItem component="div">
        <ListItemText primary={
            <TextField
                required label="Nazwa" value={value} fullWidth error={!value} autoFocus={!value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
                onBlur={onEditFinished}
            />
        }/>
        {exercise.inUse ? null : <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => dispatch(deleteExercise(exercise.id))}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>}
    </ListItem>

}

export default ExerciseListItem
