import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material'
import { DEFAULT_SUBMIT_BUTTON_TEXT, REQUIRED_FIELD_ERROR_TEXT } from './constants'
import './Form.css'
import { TodoFormValues } from './types'
import { TodoType } from '../../types'
import { Loader } from '../Loader/Loader'
import { ErrorText } from '../ErrorText/ErrorText'
import { FormTitle } from './components/FormTitle'

type TodoFormProps = {
    submitButtonText?: string
    formTitle?: string
    onSubmit: (data: TodoFormValues) => void
    error?: string
    loading?: boolean
} & Partial<Omit<TodoType, 'id'>>

type TodoFormErrors = Record<keyof Omit<TodoFormValues, 'isImportant' | 'isCompleted'>, string>

const initialFormErrors: TodoFormErrors = {
    title: '',
    description: '',
}

const checkTodoForm = (values: TodoFormValues, errors: TodoFormErrors) => {
    const hasErrors = Object.values(errors).some(Boolean)
    const hasFilledRequiredFields = values.title && values.description

    return !hasErrors && hasFilledRequiredFields
}

const initialValues: TodoFormValues = {
    title: '',
    description: '',
    isImportant: false,
    isCompleted: false,
}

export const TodoForm: FC<TodoFormProps> = (props) => {
    const { title, description, isImportant, isCompleted, formTitle, submitButtonText = DEFAULT_SUBMIT_BUTTON_TEXT, onSubmit, error, loading } = props
    const [values, setValues] = useState<TodoFormValues>(initialValues)
    const [errors, setErrors] = useState<TodoFormErrors>(initialFormErrors)

    const onInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
            ...prev,
            [evt.target.name]: evt.target.value,
        }))

        if (!evt.target.value) {
            setErrors((prev) => ({
                ...prev,
                [evt.target.name]: REQUIRED_FIELD_ERROR_TEXT,
            }))
        } else {
            setErrors((prev) => ({
                ...prev,
                [evt.target.name]: '',
            }))
        }
    }, [])

    const onCheckboxChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
            ...prev,
            [evt.target.name]: evt.target.checked,
        }))
    }, [])

    const isFormValid = checkTodoForm(values, errors)

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()

        if (!isFormValid) {
            return
        }

        onSubmit(values)
    }

    useEffect(() => {
        const newValues = {
            ...(typeof title === 'string' && { title }),
            ...(typeof description === 'string' && { description }),
            ...(typeof isImportant === 'boolean' && { isImportant }),
            ...(typeof isCompleted === 'boolean' && { isCompleted }),
        }

        setValues((prev) => ({ ...prev, ...newValues }))
    }, [description, isImportant, title, isCompleted])

    return (
        <Box className="form">
            {formTitle ? <FormTitle text={formTitle} /> : null}
            {error ? <ErrorText error={error} /> : null}
            <form onSubmit={handleSubmit} method="POST">
                <Stack direction="column" spacing={3}>
                    <TextField
                        fullWidth
                        label="Заголовок"
                        variant="outlined"
                        name="title"
                        value={values['title']}
                        onChange={onInputChange}
                        error={Boolean(errors['title'])}
                        helperText={errors['title']}
                        disabled={loading}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Описание задачи"
                        variant="outlined"
                        name="description"
                        value={values['description']}
                        onChange={onInputChange}
                        error={Boolean(errors['description'])}
                        helperText={errors['description']}
                        disabled={loading}
                        minRows={4}
                        multiline
                        required
                    />

                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                checked={values['isImportant']}
                                name="isImportant"
                                onChange={onCheckboxChange}
                                control={<Checkbox />}
                                label="Отметить как важную"
                                labelPlacement="end"
                                disabled={loading}
                            />
                        </FormGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!isFormValid || loading}
                        fullWidth
                        sx={{ minHeight: '46px' }}
                    >
                        {loading ? <Loader.Inner /> : submitButtonText}
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
