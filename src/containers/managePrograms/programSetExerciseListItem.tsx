import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ProgramExercise} from '../../types/exerciseProgram'
import {Exercise} from '../../store/exercises/types'
import {ListItem, ListItemSecondaryAction, ListItemText} from '@material-ui/core'
import ExerciseAutocompleteTextField from './exerciseAutocompleteTextField'
import {addSetExercise, deleteSetExercise, updateSetExercise} from '../../store/editPrograms/actions'
import MoreIconButtonWithContextMenu from '../../components/moreIconButtonWithContextMenu'
import {CONTEXT_MENU_ACTION_TYPES} from '../../components/contextMenuActionTypes'
import CopyModal from '../../components/copyModal'

type Props = {
    programId: number,
    setId: number,
    exercise: ProgramExercise,
    allExercises: Exercise[],
}

const ProgramSetExerciseListItem : React.FunctionComponent<Props> = ({exercise, allExercises, programId, setId}) => {
    const dispatch = useDispatch()
    const [showCopyModal, setShowCopyModal] = useState<boolean>(false)

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

    return <>
        <ListItem component="div">
            <ListItemText primary={
                <ExerciseAutocompleteTextField
                    options={allExercises}
                    exercise={exercise}
                    onValueChange={(value => value !== exercise.name && dispatch(updateSetExercise(programId, setId, exercise.id, 'name', value)))}
                />
            }/>
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
