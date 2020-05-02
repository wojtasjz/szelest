import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {List, ListItem, ListItemText, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {AppState} from '../store'
import {changeEditModeStateThunk} from '../store/commonActions'

const useStyles = makeStyles({
    firstElement: {
        marginLeft: 20,
    },
})

const NavBar = () : React.ReactElement => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const editMode: boolean = useSelector(
        (state: AppState) => state.system.editMode
    )

    return (
        <>
            <List component="nav" className={classes.firstElement}>
                <ListItem button component="div" onClick={() => dispatch(changeEditModeStateThunk(false))} selected={!editMode}>
                    <ListItemText>
                        <Typography color="inherit" variant="subtitle1" component="span">
                            Wybór programu
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
            <List component="nav">
                <ListItem button component="div" onClick={() => dispatch(changeEditModeStateThunk(true))} selected={editMode}>
                    <ListItemText>
                        <Typography color="inherit" variant="subtitle1" component="span">
                            Edycja programów
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
            <List component="nav">
                <ListItem component="div" >
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