import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {List} from '@material-ui/core'
import {ExerciseProgram} from '../../types/exerciseProgram'
import SubheaderWithIconButton from '../../components/subheaderWithIconButton'
import {AppState} from '../../store'
import {addProgram} from '../../store/editPrograms/actions'
import EditableProgramListItem from './editableProgramListItem'
import ProgramListItem from './programListItem'

type Props = {
    selectedProgramId: number,
    selectedProgramChanged: (program: ExerciseProgram) => void,
}

const ProgramList : React.FunctionComponent<Props> = ({selectedProgramId, selectedProgramChanged}) => {
    const dispatch = useDispatch()
    const editMode: boolean = useSelector((state: AppState) => state.system.editMode)
    const programs: ExerciseProgram[] = useSelector((state: AppState) => editMode ? state.editPrograms.programs : state.programs.programs)
    const ProgramListItemComponent = editMode ? EditableProgramListItem : ProgramListItem

    return <List
        component="nav"
        subheader={
            <SubheaderWithIconButton
                showButton={editMode}
                subheaderText="Wybierz program"
                onButtonClicked={() => dispatch(addProgram())}
            />
        }
    >
        {programs.map(program => <ProgramListItemComponent
            key={`program-${program.id}`}
            program={program}
            selected={program.id === selectedProgramId}
            onListItemClick={() => selectedProgramChanged(program)}
        />)}
    </List>
}

export default ProgramList
