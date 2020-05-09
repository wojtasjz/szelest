import React from 'react'
import {Container, Grid} from '@material-ui/core'
import ExercisesList from './exercisesList'

class ManageExercisesContainer extends React.Component {
    render() {
        return (
            <Grid container item direction="row" component="div">
                <Container maxWidth="sm" component="div">
                    <ExercisesList />
                </Container>
            </Grid>
        )
    }
}

export default ManageExercisesContainer
