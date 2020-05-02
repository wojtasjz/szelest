import React from 'react'
import {connect} from 'react-redux'
import {Container, Grid} from '@material-ui/core'
import {ExerciseProgram} from '../../types/exerciseProgram'
import ProgramList from './programList'
import ProgramSetList from './programSetList'
import BottomEditAppBar from '../../components/bottomEditAppBar'
import './manageProgramsContainer.css'
import {AppState} from '../../store'

type Props = {
    editMode: boolean
}

type State = {
    selectedProgram?: ExerciseProgram,
}

class ManageProgramsContainer extends React.Component<Props, State> {
    state: State = {}

    selectedProgramChanged(program: ExerciseProgram) : void {
        this.setState({selectedProgram: program})
    }

    render() {
        let rightPanel = <div>Wybierz program, żeby zobaczyć jego ćwiczenia</div>
        let selectedProgramId = 0
        if (this.state.selectedProgram) {
            rightPanel = <ProgramSetList program={this.state.selectedProgram} />
            selectedProgramId = this.state.selectedProgram.id
        }

        return (
            <>
                <Grid container item direction="row" component="div" className="programs-grid">
                    <Container maxWidth="sm" component="div">
                        <ProgramList selectedProgramId={selectedProgramId} selectedProgramChanged={(program: ExerciseProgram) => this.selectedProgramChanged(program)} />
                    </Container>
                    <Container maxWidth="sm" component="div">
                        {rightPanel}
                    </Container>
                </Grid>
                {this.props.editMode ? <BottomEditAppBar /> : null}
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    editMode: state.system.editMode,
})

export default connect(mapStateToProps)(ManageProgramsContainer)