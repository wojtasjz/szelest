import React from 'react'
import {useDispatch} from 'react-redux'
import {TextField} from '@material-ui/core'
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete'
import {addExercise} from '../../store/exercises/actions'

interface ExerciseOptionType {
    inputValue?: string
    name: string
    id: number
}

type Props = {
    options: ExerciseOptionType[]
    exercise?: ExerciseOptionType
    onValueChange: (value: ExerciseOptionType) => void
}

const filter = createFilterOptions<ExerciseOptionType>({trim: true})

const emptyOption: ExerciseOptionType = {id: 0, name: ''}

const ExerciseAutocompleteTextField : React.FunctionComponent<Props> = ({options, exercise, onValueChange}) => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState<ExerciseOptionType>(exercise || emptyOption)
    const [maxId, setMaxId] = React.useState<number>(options && options.length > 0 ? Math.max(...options.map(item => item.id)) : 0)
    if (!exercise && value.id > 0) {
        setValue(emptyOption)
    }
    if (exercise && exercise.name !== value.name) {
        setValue(exercise)
    }

    const getNewId = () => {
        const newId = maxId + 1
        setMaxId(newId)

        return newId
    }

    const createExercise = (name: string): ExerciseOptionType => {
        const newId = getNewId()
        dispatch(addExercise(newId, name))

        return {id: newId, name}
    }

    const getOptionFromString = (value: string): ExerciseOptionType => {
        const existingOption = options.find(item => item.name === value)

        return existingOption || {id: 0, name: value, inputValue: value}
    }

    return (
        <Autocomplete
            value={value}
            onChange={(event: any, newValue: ExerciseOptionType | string | null) => {
                const typedValue: ExerciseOptionType = (typeof newValue === 'string' ? getOptionFromString(newValue) : newValue) || emptyOption
                const valueToSet = typedValue.inputValue ? createExercise(typedValue.inputValue) : typedValue
                onValueChange(valueToSet)
                setValue(valueToSet)
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params) as ExerciseOptionType[]

                // Suggest the creation of a new value
                if (params.inputValue !== '' && options.every(item => item.name !== params.inputValue)) {
                    filtered.push({
                        id: 0,
                        inputValue: params.inputValue,
                        name: `Dodaj "${params.inputValue}"`,
                    })
                }

                return filtered
            }}
            includeInputInList
            disableClearable
            openOnFocus
            clearOnBlur
            options={options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue
                }
                // Regular option
                return option.name
            }}
            renderOption={(option) => option.name}
            freeSolo
            style={{width: 182}}
            size="small"
            renderInput={(params) => (
                <TextField
                    {...params}
                    required
                    error={!value.name}
                    autoComplete="off"
                    label="Nazwa"
                    margin="none"
                    size="small"
                />
            )}
        />
    )
}

export default ExerciseAutocompleteTextField
