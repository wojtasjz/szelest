import React from 'react'
import {IconButton, Menu, MenuItem} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {CONTEXT_MENU_ACTION_TYPES} from './contextMenuActionTypes'
import newId from '../utils/newId'

type Props = {
    allowCopy?: boolean,
    allowAdd?: boolean,
    allowMove?: boolean,
    closeOnAddClick?: boolean,
    addLabel?: string,
    onActionSelected: (type: string) => void,
}

const MoreIconButtonWithContextMenu : React.FunctionComponent<Props> = ({allowCopy, allowMove, addLabel, allowAdd, onActionSelected, closeOnAddClick}) => {
    const [id] = React.useState(newId('moreiconmenu-'))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleContextMenuItemClick = (type: string) => {
        onActionSelected(type)
        if (type !== CONTEXT_MENU_ACTION_TYPES.ADD || closeOnAddClick) {
            handleClose()
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
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
            onClose={() => handleClose()}
        >
            {allowAdd ? <MenuItem key={`${id}-add`} onClick={() => handleContextMenuItemClick(CONTEXT_MENU_ACTION_TYPES.ADD)}>
                {addLabel || 'Dodaj'}
            </MenuItem> : null}
            {allowMove ? <MenuItem key={`${id}-move`} onClick={() => handleContextMenuItemClick(CONTEXT_MENU_ACTION_TYPES.MOVE)}>
                Zmień kolejność
            </MenuItem> : null}
            {allowCopy ? <MenuItem key={`${id}-copy`} onClick={() => handleContextMenuItemClick(CONTEXT_MENU_ACTION_TYPES.COPY)}>
                Kopiuj
            </MenuItem> : null}
            <MenuItem key={`${id}-clone`} onClick={() => handleContextMenuItemClick(CONTEXT_MENU_ACTION_TYPES.CLONE)}>
                Klonuj
            </MenuItem>
            <MenuItem key={`${id}-delete`} onClick={() => handleContextMenuItemClick(CONTEXT_MENU_ACTION_TYPES.DELETE)}>
                Usuń
            </MenuItem>
        </Menu>
    </>
}

export default MoreIconButtonWithContextMenu
