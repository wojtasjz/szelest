import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    TextField,
    Tooltip,
} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import WarningIcon from '@material-ui/icons/Warning'
import {ExerciseProgram} from '../../types/exerciseProgram'
import MoreIconButtonWithContextMenu from '../../components/moreIconButtonWithContextMenu'
import {deleteProgram, addProgram, updateProgram} from '../../store/editPrograms/actions'
import {CONTEXT_MENU_ACTION_TYPES} from '../../components/contextMenuActionTypes'
import {AppState} from '../../store'

const useStyles = makeStyles(() => createStyles({
    iconsBox: {
        display: 'flex',
        alignItems: 'center',
    },
}))

type Props = {
    program: ExerciseProgram,
    selected: boolean,
    onListItemClick: () => void,
}

const ProgramListItem : React.FunctionComponent<Props> = ({program, onListItemClick, selected}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [state, setState] = React.useState({name: program.name, previousName: program.name})
    const invalidPrograms = useSelector((state: AppState) => state.editPrograms.invalidPrograms)
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

    return <ListItem component="div" onClick={onListItemClick} selected={selected} style={{cursor: 'pointer'}}>
        <ListItemText primary={
            <TextField
                required label="Nazwa" value={state.name} error={!state.name}
                helperText={initialName && initialName !== state.name && `Poprzednia nazwa: ${initialName}`}
                onClick={event => event.stopPropagation()}
                onChange={onChange}
                onBlur={onEditFinished}
            />
        } />
        <ListItemSecondaryAction>
            <div className={classes.iconsBox}>
                {invalidPrograms.includes(program.id) ?
                    <Tooltip title="Program zawiera błędy" placement="bottom"><WarningIcon color="secondary" /></Tooltip> :
                    null}
                <MoreIconButtonWithContextMenu onActionSelected={(type: string) => onAction(type)} />
            </div>
        </ListItemSecondaryAction>
    </ListItem>

}

export default ProgramListItem
