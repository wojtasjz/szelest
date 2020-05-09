import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {List} from '@material-ui/core'
import ProgramSetListItem from './programSetListItem'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import SubheaderWithIconButton from '../../components/subheaderWithIconButton'
import {addSet, reorderSets} from '../../store/editPrograms/actions'
import {ExerciseProgram, ExerciseSet} from '../../types/exerciseProgram'
import {createSelector} from 'reselect'
import {AppState} from '../../store'
import ReorderModal from "../../components/reorderModal";

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
)

const getSelectedProgramSelector = createSelector(
    (state: AppState) => state.editPrograms.selectedProgramId,
    (state: AppState) => state.editPrograms.programs,
    (programId: number | undefined, programs: ExerciseProgram[]) => programs.find(p => p.id === programId)
)

const ProgramSetList : React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const program = useSelector(getSelectedProgramSelector)
    const [showReorderModal, setShowReorderModal] = useState<boolean>(false)
    if (!program) {
        return <div></div>
    }

    const finishReordering = (sets: ExerciseSet[]) => {
        setShowReorderModal(false)
        if (sets) {
            dispatch(reorderSets(program.id, sets))
        }
    }

    return <>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <SubheaderWithIconButton
                    showAddButton
                    showMoveButton={program.sets.length > 1}
                    subheaderText={`Zestawy ćwiczeń programu ${program.name}`}
                    onAddButtonClicked={() => dispatch(addSet(program.id))}
                    onMoveButtonClicked={(() => setShowReorderModal(true))}
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
                    programId={program.id}
                />})}
        </List>
        {showReorderModal ? <ReorderModal items={program.sets} onFinish={(items) => finishReordering(items as ExerciseSet[])} /> : null}
    </>
}

export default ProgramSetList
