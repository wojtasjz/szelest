import React from 'react'
import {IconButton, Menu, MenuItem} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {CONTEXT_MENU_ACTION_TYPES} from './contextMenuActionTypes'
import newId from '../utils/newId'

type Props = {
    allowCopy: boolean,
    onActionSelected: (type: string) => void,
}

const MoreIconButtonWithContextMenu : React.FunctionComponent<Props> = (props) => {
    const [id] = React.useState(newId('moreiconmenu-'))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (type: string | null) => {
        setAnchorEl(null);
        if (type) {
            props.onActionSelected(type)
        }
    }

    return <>
        <IconButton
            edge="end"
            aria-label="more"
            aria-controls={id}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id={id}
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={() => handleClose(null)}
        >
            {props.allowCopy ? <MenuItem key={`${id}-copy`} onClick={() => handleClose(CONTEXT_MENU_ACTION_TYPES.COPY)}>
                Kopiuj
            </MenuItem> : null}
            <MenuItem key={`${id}-clone`} onClick={() => handleClose(CONTEXT_MENU_ACTION_TYPES.CLONE)}>
                Klonuj
            </MenuItem>
            <MenuItem key={`${id}-delete`} onClick={() => handleClose(CONTEXT_MENU_ACTION_TYPES.DELETE)}>
                Usuń
            </MenuItem>
        </Menu>
    </>
}

export default MoreIconButtonWithContextMenu