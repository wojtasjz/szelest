import React from 'react'
import {connect} from 'react-redux'
import {Container, Grid} from '@material-ui/core'
import ProgramList from './programList'
import ProgramSetList from './programSetList'
import {AppState} from '../../store'
import {ExerciseProgram} from '../../types/exerciseProgram'

type Props = {
    selectedProgram?: ExerciseProgram
}

class ViewProgramsContainer extends React.Component<Props> {
    render() {
        let rightPanel = <div>Wybierz program, żeby zobaczyć jego ćwiczenia</div>
        if (this.props.selectedProgram) {
            rightPanel = <ProgramSetList program={this.props.selectedProgram} />
        }

        return (
            <>
                <Grid container item direction="row" component="div" className="programs-grid">
                    <Container maxWidth="sm" component="div">
                        <ProgramList />
                    </Container>
                    <Container maxWidth="sm" component="div">
                        {rightPanel}
                    </Container>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    selectedProgram: state.programs.selectedProgram,
})

export default connect(mapStateToProps)(ViewProgramsContainer)
