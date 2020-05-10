import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ProgramSetExercise, Exercise} from '../../types/exerciseProgram'
import {ListItem, ListItemSecondaryAction, ListItemText} from '@material-ui/core'
import ExerciseAutocompleteTextField from './exerciseAutocompleteTextField'
import {addSetExercise, deleteSetExercise, updateSetExercise} from '../../store/editPrograms/actions'
import MoreIconButtonWithContextMenu from '../../components/moreIconButtonWithContextMenu'
import {CONTEXT_MENU_ACTION_TYPES} from '../../components/contextMenuActionTypes'
import CopyModal from '../../components/copyModal'

type Props = {
    programId: number,
    setId: number,
    exercise: ProgramSetExercise,
    allExercises: Exercise[],
}

const ProgramSetExerciseListItem : React.FunctionComponent<Props> = ({exercise, allExercises, programId, setId}) => {
    const dispatch = useDispatch()
    const [showCopyModal, setShowCopyModal] = useState<boolean>(false)
    const currentExercise = exercise.exercise

    const onAction = (type: string): void => {
        switch (type) {
            case CONTEXT_MENU_ACTION_TYPES.DELETE:
                dispatch(deleteSetExercise(programId, setId, exercise.id))
                break
            case CONTEXT_MENU_ACTION_TYPES.CLONE:
                dispatch(addSetExercise(programId, setId, exercise))
                break
            case CONTEXT_MENU_ACTION_TYPES.COPY:
                setShowCopyModal(true)
                break
            default:
                break
        }
    }

    const copyExercise = (id?: {programId: number, setId: number}) => {
        setShowCopyModal(false)
        if (id) {
            dispatch(addSetExercise(id.programId, id.setId, exercise))
        }
    }

    const onExerciseUpdate = (value: Exercise) => {
        if (currentExercise && value.name === currentExercise.name && value.id === currentExercise.id) {
            return
        }

        dispatch(updateSetExercise(programId, setId, exercise.id, 'exercise', value))
    }

    return <>
        <ListItem component="div">
            <ListItemText primary={
                <ExerciseAutocompleteTextField
                    options={allExercises}
                    exercise={exercise.exercise}
                    onValueChange={onExerciseUpdate}
                />
            } />
            <ListItemSecondaryAction>
                <MoreIconButtonWithContextMenu
                    allowCopy
                    onActionSelected={(type: string) => onAction(type)}
                />
            </ListItemSecondaryAction>
        </ListItem>
        {showCopyModal ? <CopyModal
            copyLevel="exercise"
            excludeId={{programId, setId}}
            onFinish={(id) => copyExercise(id as {programId: number, setId: number})}
        /> : null}
    </>
}

export default ProgramSetExerciseListItem
