import React from 'react'
import {connect} from 'react-redux'
import {Container, Grid} from '@material-ui/core'
import ProgramList from './programList'
import ProgramSetList from './programSetList'
import BottomEditAppBar from '../../components/bottomEditAppBar'
import './manageProgramsContainer.css'
import {AppState} from '../../store'
import {changeToEditModeStateThunk} from '../../store/commonActions'

type Props = {
    selectedProgramId?: number
    changeToEditModeStateThunk: () => any
}

class ManageProgramsContainer extends React.Component<Props> {
    constructor(props: Props) {
        props.changeToEditModeStateThunk()
        super(props)
    }

    render() {
        let rightPanel = <div>Wybierz program, żeby zobaczyć jego ćwiczenia</div>
        if (this.props.selectedProgramId) {
            rightPanel = <ProgramSetList />
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
                <BottomEditAppBar />
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    selectedProgramId: state.editPrograms.selectedProgramId,
})

export default connect(mapStateToProps, {changeToEditModeStateThunk})(ManageProgramsContainer)
