import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHotkeys} from 'react-hotkeys-hook'
import {Button, AppBar, Toolbar} from '@material-ui/core'
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import ClearIcon from '@material-ui/icons/Clear'
import UndoIcon from '@material-ui/icons/Undo'
import {AppState} from '../store'
import * as editProgramActions from '../store/editPrograms/actions'
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            top: 'auto',
            bottom: 0,
        },
        toolBar: {
            justifyContent: 'space-evenly',
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
)

const BottomEditAppBar : React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleRevertHotKey = () => {
        dispatch(editProgramActions.revertLastChange())
    }
    useHotkeys('ctrl+z', handleRevertHotKey)
    const state = useSelector(
        (state: AppState) => ({isValid: state.editPrograms.isValid, changed: state.editPrograms.lastChanges.length > 0})
    )

    return <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
            <Button
                variant="contained"
                className={classes.button}
                disabled={!state.changed || !state.isValid}
                startIcon={<SaveIcon />}
            >
                Zapisz zmiany
            </Button>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<ClearIcon />}
                component={Link} to="/"
                onClick={() => dispatch(editProgramActions.finishEditMode())}
            >
                Zakończ edycję bez zapisu
            </Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                disabled={!state.changed}
                startIcon={<UndoIcon />}
                onClick={() => dispatch(editProgramActions.revertLastChange())}
            >
                Cofnij ostatnią zmianę
            </Button>
        </Toolbar>
    </AppBar>
}

export default BottomEditAppBar
