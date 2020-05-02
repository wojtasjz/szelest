import React from 'react';
import {AppBar, Container, Toolbar, Typography} from '@material-ui/core'
import './App.css';
import NavBar from "./components/navbar"
import ManageProgramsContainer from "./containers/managePrograms/manageProgramsContainer"

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
                <ManageProgramsContainer />
            </Container>
        </>
    );
}

export default App;
