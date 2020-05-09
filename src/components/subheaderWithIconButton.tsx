import React from 'react'
import {IconButton, ListSubheader, Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import OpenWithIcon from '@material-ui/icons/OpenWith'
import {makeStyles} from '@material-ui/core/styles'

type Props = {
    showAddButton?: boolean,
    showMoveButton?: boolean,
    subheaderText: string,
    onAddButtonClicked?: () => void,
    onMoveButtonClicked?: () => void,
}

const useStyles = makeStyles({
    subheader: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

const SubheaderWithIconButton : React.FunctionComponent<Props> = ({showAddButton, showMoveButton, subheaderText, onAddButtonClicked, onMoveButtonClicked}) => {
    const classes = useStyles()

    return <ListSubheader component="div" className={classes.subheader}>
        {subheaderText}
        <div>
            {showMoveButton ? <Tooltip title="Zmień kolejność" placement="left">
                <IconButton color="primary" edge="end" onClick={onMoveButtonClicked}>
                    <OpenWithIcon />
                </IconButton>
            </Tooltip> : null}
            {showAddButton ? <Tooltip title="Dodaj" placement="left">
                <IconButton color="primary" edge="end" onClick={onAddButtonClicked}>
                    <AddIcon />
                </IconButton>
            </Tooltip> : null}
        </div>
    </ListSubheader>
}

export default SubheaderWithIconButton
