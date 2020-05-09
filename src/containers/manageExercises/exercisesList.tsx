import React from 'react'
import {useDispatch} from 'react-redux'
import {List} from '@material-ui/core'
import SubheaderWithIconButton from '../../components/subheaderWithIconButton'
import {addExercise} from '../../store/exercises/actions'

const ExercisesList : React.FunctionComponent = () => {
    const dispatch = useDispatch()

    return <List
        component="nav"
        subheader={
            <SubheaderWithIconButton
                subheaderText="Edytuj ćwiczenia"
                onAddButtonClicked={() => dispatch(addExercise())}
            />
        }
    >
    </List>
}

export default ExercisesList
