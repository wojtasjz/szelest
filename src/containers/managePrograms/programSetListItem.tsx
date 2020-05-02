import React from 'react'
import {ExerciseSet} from '../../types/exerciseProgram'
import {ListItem, ListItemText, Collapse} from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ProgramSetExercisesList from './programSetExercisesList'

type Props = {
    set: ExerciseSet,
    classes: any,
    setKey: string,
}

const ProgramListItem : React.FunctionComponent<Props> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return <>
        <ListItem component="div" button onClick={handleClick}>
            <ListItemText primary={props.set.name} secondary="jakiś opis" />
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <ProgramSetExercisesList set={props.set} classes={props.classes} setKey={props.setKey} />
        </Collapse>
    </>
}

export default ProgramListItem