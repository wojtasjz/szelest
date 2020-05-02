import React from 'react'
import {useDispatch} from 'react-redux'
import {ExerciseProgram} from '../../types/exerciseProgram'
import {ListItem, ListItemText, ListItemSecondaryAction, TextField} from '@material-ui/core'
import MoreIconButtonWithContextMenu from '../../components/moreIconButtonWithContextMenu'
import {deleteProgram, addProgram, updateProgram} from '../../store/editPrograms/actions'
import {CONTEXT_MENU_ACTION_TYPES} from '../../components/contextMenuActionTypes'

type Props = {
    program: ExerciseProgram,
    selected: boolean,
    onListItemClick: () => void,
}

const EditableProgramListItem : React.FunctionComponent<Props> = ({program, onListItemClick, selected}) => {
    const dispatch = useDispatch()
    const [state, setState] = React.useState({name: program.name, previousName: program.name})
    const [initialName] = React.useState(program.name)
    if (program.name !== state.previousName) {
        setState({name: program.name, previousName: program.name})
    }

    const onAction = (type: string): void => {
        switch (type) {
            case CONTEXT_MENU_ACTION_TYPES.DELETE:
                dispatch(deleteProgram(program.id))
                break
            case CONTEXT_MENU_ACTION_TYPES.CLONE:
                dispatch(addProgram(program))
                break
            default:
                break
        }
    }

    const onEditFinished = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== state.previousName) {
            dispatch(updateProgram(program.id, event.target.value))
            setState({name: state.name, previousName: event.target.value})
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({name: event.target.value, previousName: state.previousName})
    }

    return <ListItem component="div" onClick={onListItemClick} selected={selected}>
        <ListItemText primary={
            <TextField
                required label="Nazwa" value={state.name}
                helperText={initialName && initialName !== state.name && `Poprzednia nazwa: ${initialName}`}
                onClick={event => event.stopPropagation()}
                onChange={onChange}
                onBlur={onEditFinished}
            />
        } />
        <ListItemSecondaryAction>
            <MoreIconButtonWithContextMenu allowCopy={false} onActionSelected={(type: string) => onAction(type)} />
        </ListItemSecondaryAction>
    </ListItem>

}

export default EditableProgramListItem