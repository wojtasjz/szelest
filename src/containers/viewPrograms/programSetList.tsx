import React from 'react'
import {List, ListSubheader} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import ProgramSetListItem from './programSetListItem'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import {ExerciseProgram} from '../../types/exerciseProgram'

type Props = {
    program: ExerciseProgram,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: grey[50],
        },
        nested: {
            paddingLeft: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const ProgramSetList : React.FunctionComponent<Props> = ({program}) => {
    const classes = useStyles()

    return <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={<ListSubheader component="div">{`Zestawy ćwiczeń programu ${program.name}`}</ListSubheader>}
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
