import React from 'react'
import {IconButton, ListSubheader, Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {makeStyles} from '@material-ui/core/styles'

type Props = {
    showButton: boolean,
    subheaderText: string,
    onButtonClicked: () => void,
}

const useStyles = makeStyles({
    subheader: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

const SubheaderWithIconButton : React.FunctionComponent<Props> = ({showButton, subheaderText, onButtonClicked}) => {
    const classes = useStyles()

    return <ListSubheader component="div" className={classes.subheader}>
        {subheaderText}
        {showButton ? <Tooltip title="Dodaj" placement="left">
            <IconButton color="primary" edge="end" onClick={onButtonClicked}>
                <AddIcon />
            </IconButton>
        </Tooltip> : null}
    </ListSubheader>
}

export default SubheaderWithIconButton