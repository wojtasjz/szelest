import React from 'react'
import {useSelector} from 'react-redux'
import {Button, Dialog, DialogActions, DialogTitle, List, ListItem} from '@material-ui/core'
import {AppState} from '../store'
import {ExerciseProgram} from '../types/exerciseProgram'

const setLevelTitle = 'Wybierz program, do którego skopiujesz zestaw ćwiczeń'
const exerciseLevelTitle = 'Wybierz zestaw, do którego skopiujesz ćwiczenie'

type ItemId = {
    programId: number
    setId?: number
}

type CopyListItem = {
    id: ItemId
    name: string
}

type Props = {
    onFinish: (id?: ItemId) => void,
    copyLevel: string,
    excludeId: ItemId,
}

const getListItems = (programs: ExerciseProgram[], level: string, excludeId: ItemId): CopyListItem[] => {
    const {programId, setId} = excludeId
    if (level === 'set') {
        return programs.filter(program => program.id !== programId)
            .map(program => ({name: program.name, id: {programId: program.id}}))
    }

    return programs.reduce<CopyListItem[]>((result, program) => ([
        ...result,
        ...program.sets.filter(set => program.id !== programId || set.id !== setId)
            .map(set => ({name: `${program.name} -> ${set.name}`, id: {programId: program.id, setId: set.id}}))
    ]), [])
}

const CopyModal : React.FunctionComponent<Props> = ({onFinish, copyLevel, excludeId}) => {
    const programs: ExerciseProgram[] = useSelector((state: AppState) => state.editPrograms.programs)
    const listItems = getListItems(programs, copyLevel, excludeId)

    return <Dialog
        open
        onClose={() => onFinish()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{copyLevel === 'set' ? setLevelTitle : exerciseLevelTitle}</DialogTitle>
            <List>
                {listItems.map((item, index) =>
                    <ListItem key={`copy-item-${index}`} button onClick={() => onFinish(item.id)} >
                        {item.name}
                    </ListItem>
                )}
            </List>
        <DialogActions>
            <Button onClick={() => onFinish()} color="secondary">
                Anuluj
            </Button>
        </DialogActions>
    </Dialog>
}

export default CopyModal
