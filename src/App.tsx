import React from 'react';
import {Switch, Route} from 'react-router-dom'
import {AppBar, Container, Toolbar, Typography} from '@material-ui/core'
import './App.css';
import NavBar from "./components/navbar"
import ViewProgramsContainer from "./containers/viewPrograms/viewProgramsContainer"
import ManageProgramsContainer from "./containers/managePrograms/manageProgramsContainer"
import ManageExercisesContainer from "./containers/manageExercises/manageExercisesContainer"

function App() : React.ReactElement {
    return (
        <>
            <AppBar color="primary" position="static">
                <Toolbar component='div'>
                    <Typography variant='h4' component='h4'>Szelest</Typography>
                    <NavBar />
                </Toolbar>
            </AppBar>
            <Container component="div" className="app-container" maxWidth="xl" fixed>
                <Switch>
                    <Route path="/exercises">
                        <ManageExercisesContainer />
                    </Route>
                    <Route path="/programs">
                        <ManageProgramsContainer />
                    </Route>
                    <Route path="/">
                        <ViewProgramsContainer />
                    </Route>
                </Switch>
            </Container>
        </>
    );
}

export default App;
