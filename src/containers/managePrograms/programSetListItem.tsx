import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ProgramSet, ProgramSetExercise} from '../../types/exerciseProgram'
import {ListItem, ListItemText, ListItemSecondaryAction, TextField, Collapse} from '@material-ui/core'
import MoreIconButtonWithContextMenu from '../../components/moreIconButtonWithContextMenu'
import {
    deleteSet,
    addSet,
    updateSet,
    addSetExercise,
    reorderExercises
} from '../../store/editPrograms/actions'
import {CONTEXT_MENU_ACTION_TYPES} from '../../components/contextMenuActionTypes'
import ProgramSetExercisesList from './programSetExercisesList'
import ReorderModal from "../../components/reorderModal";
import CopyModal from "../../components/copyModal";

type Props = {
    set: ProgramSet,
    classes: any,
    setKey: string,
    programId: number
}

const ProgramSetListItem : React.FunctionComponent<Props> = ({set, classes, setKey, programId}) => {
    const dispatch = useDispatch()
    const [state, setState] = useState({name: set.name, previousName: set.name})
    const [open, setOpen] = useState(false)
    const [showReorderModal, setShowReorderModal] = useState<boolean>(false)
    const [showCopyModal, setShowCopyModal] = useState<boolean>(false)
    if (set.name !== state.previousName) {
        setState({name: set.name, previousName: set.name})
    }

    const handleClick = () => {
        setOpen(!open)
    }

    const finishReordering = (exercises: ProgramSetExercise[] | undefined) => {
        setShowReorderModal(false)
        if (exercises) {
            dispatch(reorderExercises(programId, set.id, exercises))
        }
    }

    const copySet = (id?: {programId: number}) => {
        setShowCopyModal(false)
        if (id) {
            dispatch(addSet(id.programId, set))
        }
    }

    const onAction = (type: string): void => {
        switch (type) {
            case CONTEXT_MENU_ACTION_TYPES.DELETE:
                dispatch(deleteSet(programId, set.id))
                break
            case CONTEXT_MENU_ACTION_TYPES.CLONE:
                dispatch(addSet(programId, set))
                break
            case CONTEXT_MENU_ACTION_TYPES.COPY:
                setShowCopyModal(true)
                break
            case CONTEXT_MENU_ACTION_TYPES.ADD:
                setOpen(true)
                dispatch(addSetExercise(programId, set.id))
                break
            case CONTEXT_MENU_ACTION_TYPES.MOVE:
                setShowReorderModal(true)
                break
            default:
                break
        }
    }

    const onEditFinished = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== state.previousName) {
            dispatch(updateSet(programId, set.id, 'name', event.target.value))
            setState({name: state.name, previousName: event.target.value})
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({name: event.target.value, previousName: state.previousName})
    }

    return <>
        <ListItem component="div" onClick={handleClick} style={{cursor: 'pointer'}}>
            <ListItemText primary={
                <TextField
                    required label="Nazwa" value={state.name} error={!state.name}
                    onClick={event => event.stopPropagation()}
                    onChange={onChange}
                    onBlur={onEditFinished}
                />
            } />
            <ListItemSecondaryAction>
                <MoreIconButtonWithContextMenu
                    allowCopy
                    allowMove={set.exercises.length > 1}
                    allowAdd
                    addLabel="Dodaj ćwiczenie"
                    closeOnAddClick={false}
                    onActionSelected={(type: string) => onAction(type)}
                />
            </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <ProgramSetExercisesList set={set} classes={classes} setKey={setKey} programId={programId} />
        </Collapse>
        {showReorderModal ?
            <ReorderModal<ProgramSetExercise>
                items={set.exercises.map(item => ({id: item.id, name: item.exercise ? item.exercise.name : '', object: item}))}
                onFinish={(items) => finishReordering(items)}
            /> :
            null
        }
        {showCopyModal ? <CopyModal
            copyLevel="set"
            excludeId={{programId}}
            onFinish={(id) => copySet(id)}
        /> : null}
    </>
}

export default ProgramSetListItem
