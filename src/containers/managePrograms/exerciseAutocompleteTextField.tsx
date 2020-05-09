import React from 'react'
import {useDispatch} from 'react-redux'
import {TextField} from '@material-ui/core'
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete'
import {addExercise} from '../../store/exercises/actions'

interface ExerciseOptionType {
    inputValue?: string
    name: string
    id?: number
}

type Props = {
    options: ExerciseOptionType[]
    exercise: ExerciseOptionType
    onValueChange: (value: string) => void
}

const filter = createFilterOptions<ExerciseOptionType>({trim: true})

const ExerciseAutocompleteTextField : React.FunctionComponent<Props> = ({options, exercise, onValueChange}) => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState<ExerciseOptionType | null>(exercise)
    if (!value || exercise.name !== value.name) {
        setValue(exercise)
    }

    return (
        <Autocomplete
            value={value}
            onChange={(event: any, newValue: ExerciseOptionType | string | null) => {
                const getOptionFromString = (value: string): ExerciseOptionType => {
                    const existingOption = options.find(item => item.name === value)

                    return existingOption || {name: value, inputValue: value}
                }
                let typedValue: ExerciseOptionType | null = typeof newValue === 'string' ? getOptionFromString(newValue) : newValue
                let valueToSet = typedValue
                if (typedValue && typedValue.inputValue) {
                    dispatch(addExercise(typedValue.inputValue))
                    valueToSet = {name: typedValue.inputValue}
                }

                onValueChange(valueToSet ? valueToSet.name : '')
                setValue(valueToSet)
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params) as ExerciseOptionType[]

                // Suggest the creation of a new value
                if (params.inputValue !== '' && options.every(item => item.name !== params.inputValue)) {
                    filtered.push({
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
                    label="Nazwa"
                    margin="none"
                    size="small"
                />
            )}
        />
    )
}

export default ExerciseAutocompleteTextField
