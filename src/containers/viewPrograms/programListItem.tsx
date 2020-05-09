import React from 'react'
import {ExerciseProgram} from '../../types/exerciseProgram'
import {calculateProgramTotalTime} from '../../utils/exerciseProgramUtils'
import {ListItem, ListItemText, ListItemSecondaryAction, IconButton, Tooltip, Fab} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

type Props = {
    program: ExerciseProgram,
    selected: boolean,
    onListItemClick: () => void
}

const getCorrectLabel = (setsCount: number): string => {
    const label = setsCount === 1 ? 'zestaw' : ([2, 3, 4].includes(setsCount) ? 'zestawy' : 'zestawów')

    return `${setsCount} ${label} ćwiczeń`
}

const ProgramListItem : React.FunctionComponent<Props> = ({program, onListItemClick, selected}) => (
    <ListItem component="div" button onClick={onListItemClick} selected={selected}>
        <ListItemText primary={program.name} secondary={`${getCorrectLabel(program.sets.length)}, łączny czas ${calculateProgramTotalTime(program)} sekund`} />
        <ListItemSecondaryAction>
            <Tooltip title="Rozpocznij program" placement="right">
                <IconButton edge="end" aria-label="comments">
                    <Fab color="primary" size="small" component="div" variant="extended">
                        <PlayArrowIcon />
                    </Fab>
                </IconButton>
            </Tooltip>
        </ListItemSecondaryAction>
    </ListItem>

)

export default ProgramListItem