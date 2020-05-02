import React from 'react'
import {useSelector} from 'react-redux'
import {List} from '@material-ui/core'
import {ExerciseProgram} from '../../types/exerciseProgram'
import ProgramSetListItem from './programSetListItem'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import SubheaderWithIconButton from '../../components/subheaderWithIconButton'
import {AppState} from '../../store'

type Props = {
    program: ExerciseProgram,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(1),
        },
    }),
);

const ProgramSetList : React.FunctionComponent<Props> = ({program}) => {
    const classes = useStyles()
    const editMode: boolean = useSelector((state: AppState) => state.system.editMode)

    return <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <SubheaderWithIconButton
                showButton={editMode}
                subheaderText={`Zestawy ćwiczeń programu ${program.name}`}
                onButtonClicked={() => {}}
            />
        }
        dense disablePadding
        className={classes.root}
    >
        {program.sets.map(set => {
            const key = `program-${program.id}-set-${set.id}`

            return <ProgramSetListItem
                key={key}
                set={set}
                classes={classes}
                setKey={key}
            />})}
    </List>
}

export default ProgramSetList