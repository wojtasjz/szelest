import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogTitle, List, ListSubheader} from '@material-ui/core'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import ReorderListItem from './reorderListItem'

type OrderListItem = {
    id: number
    name: string
}

type Props = {
    items: OrderListItem[],
    onFinish: (items?: OrderListItem[]) => void
}

const ReorderModal : React.FunctionComponent<Props> = ({items, onFinish}) => {
    const [currentOrder, setOrder] = useState(items)

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = currentOrder[dragIndex]
        setOrder(
            update(currentOrder, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        )
    }

    return <Dialog
        open
        onClose={() => onFinish()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">Zmień kolejność</DialogTitle>
        <DndProvider backend={Backend}>
            <List subheader={
                <ListSubheader component="div">Uwaga! Po zapisaniu, nie będzie można cofnąć zmian.</ListSubheader>
            }>
                {currentOrder.map((item, index) =>
                    <ReorderListItem
                        key={`order-item-${item.id}`}
                        index={index}
                        id={item.id}
                        text={item.name}
                        moveCard={moveCard}
                    />
                )}
            </List>
        </DndProvider>
        <DialogActions>
            <Button onClick={() => onFinish()} color="secondary">
                Anuluj
            </Button>
            <Button onClick={() => onFinish(currentOrder)} color="primary" autoFocus>
                Zapisz zmiany
            </Button>
        </DialogActions>
    </Dialog>
}

export default ReorderModal
