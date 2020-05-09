import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {List, ListItem, ListItemText, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    firstElement: {
        marginLeft: 20,
    },
})

const NavBar = () : React.ReactElement => {
    const classes = useStyles()
    const location = useLocation()
    const managingExercises = location.pathname === '/exercises'
    const managingPrograms = location.pathname === '/programs'

    return (
        <>
            <List component="nav" className={classes.firstElement}>
                <ListItem button component={Link} to="/" selected={!managingPrograms && !managingExercises}>
                    <ListItemText>
                        <Typography color="inherit" variant="subtitle1" component="span">
                            Wybór programu
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
            <List component="nav">
                <ListItem button component={Link} to="/programs" selected={managingPrograms}>
                    <ListItemText>
                        <Typography color="inherit" variant="subtitle1" component="span">
                            Edycja programów
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
            <List component="nav">
                <ListItem button component={Link} to="/exercises" selected={managingExercises}>
                    <ListItemText>
                        <Typography color="inherit" variant="subtitle1" component="span">
                            Edycja ćwiczeń
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </>
    )
}

export default NavBar;
