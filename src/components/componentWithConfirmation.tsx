import React from 'react'
import {Dialog, DialogTitle, DialogActions, Button} from '@material-ui/core'

type Props = {
    dialogTitle: string,
    confirmButton: string,
    cancelButton: string,
    onConfirmed: () => void,
}

const ComponentWithConfirmation : React.FunctionComponent<Props> = (props) => {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = (confirmed: boolean) => {
        setOpen(false)
        if (confirmed) {
            props.onConfirmed()
        }
    }

    return <>
        <div onClick={handleClickOpen}>
            {props.children}
        </div>
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogActions>
                <Button onClick={() => handleClose(false)} color="primary">
                    {props.cancelButton}
                </Button>
                <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                    {props.confirmButton}
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default ComponentWithConfirmation