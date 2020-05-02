interface objectWithId {
    id: number
}

export const newId = (collection: objectWithId[]) => {
    const currentMax = Math.max(...collection.map(item => item.id))

    return currentMax > 0 ? currentMax + 1 : 1
}