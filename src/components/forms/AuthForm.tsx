import React, { FC, useCallback, useState } from 'react'
import * as EmailValidator from 'email-validator'
import './Form.css'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { DEFAULT_SUBMIT_BUTTON_TEXT, DEFAULT_SUBTITLE, initialFormFieldState, PASSWORD_LENGTH, REQUIRED_FIELD_ERROR_TEXT } from './constants'
import { Link } from 'react-router-dom'
import { LOGIN, SIGNUP } from '../../constants/routesMap'
import { AuthFormFieldValues, FormFieldState } from './types'
import classNames from 'classnames'
import { Loader } from '../Loader/Loader'
import { ErrorText } from '../ErrorText/ErrorText'
import { FormTitle } from './components/FormTitle'
import { FormSubTitle } from './components/FormSubTitle'

type AuthFormProps = {
    className?: string
    submitButtonText?: string
    title?: string
    subtitle?: string
    onSubmit: (data: AuthFormFieldValues) => void
    loading: boolean
    authError?: string
    isRegisterForm?: boolean
}

export const AuthForm: FC<AuthFormProps> = (props) => {
    const {
        title,
        submitButtonText = DEFAULT_SUBMIT_BUTTON_TEXT,
        subtitle = DEFAULT_SUBTITLE,
        onSubmit,
        loading = false,
        authError,
        isRegisterForm = false,
    } = props

    const [emailState, setEmail] = useState<FormFieldState>(initialFormFieldState)
    const [userNameState, setUserName] = useState<FormFieldState>(initialFormFieldState)
    const [passwordState, setPassword] = useState<FormFieldState>(initialFormFieldState)

    const onEmailChange = useCallback((evt) => {
        setEmail((prev) => ({ ...prev, error: '', value: evt.target.value as string }))
    }, [])

    const onUserNameChange = useCallback((evt) => {
        setUserName((prev) => ({ ...prev, error: '', value: evt.target.value as string }))
    }, [])

    const onPasswordChange = useCallback((evt) => {
        setPassword((prev) => ({ ...prev, error: '', value: evt.target.value as string }))
    }, [])

    const validateFormFields = useCallback(
        ({ email, username, password }: AuthFormFieldValues) => {
            let isFormValid = true

            if (!email) {
                setEmail((prev) => ({
                    ...prev,
                    error: REQUIRED_FIELD_ERROR_TEXT,
                }))
                isFormValid = false
            }

            if (email && !EmailValidator.validate(email)) {
                setEmail((prev) => ({
                    ...prev,
                    error: 'Введена некорректная электронная почта',
                }))
                isFormValid = false
            }

            if (isRegisterForm && !username) {
                setUserName((prev) => ({
                    ...prev,
                    error: REQUIRED_FIELD_ERROR_TEXT,
                }))
                isFormValid = false
            }

            if (!password) {
                setPassword((prev) => ({
                    ...prev,
                    error: REQUIRED_FIELD_ERROR_TEXT,
                }))
                isFormValid = false
            }

            if (password && password.length < PASSWORD_LENGTH) {
                setPassword((prev) => ({
                    ...prev,
                    error: `Минимальная длина пароля ${PASSWORD_LENGTH} символов`,
                }))
                isFormValid = false
            }

            return isFormValid
        },
        [isRegisterForm],
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isFormValid = validateFormFields({
            email: emailState.value,
            username: userNameState.value,
            password: passwordState.value,
        })

        if (!isFormValid) {
            return
        }

        onSubmit({
            email: emailState.value,
            username: userNameState.value,
            password: passwordState.value,
        })
    }

    return (
        <Box className="form">
            {title ? <FormTitle text={title} /> : null}
            {subtitle ? <FormSubTitle text={subtitle} /> : null}
            {authError ? <ErrorText error={authError} /> : null}
            <form onSubmit={handleSubmit} method="POST" noValidate>
                <Stack direction="column" spacing={3} pb={4}>
                    <TextField
                        fullWidth
                        label="Электронная почта"
                        variant="outlined"
                        name="email"
                        value={emailState.value}
                        onChange={onEmailChange}
                        error={Boolean(emailState.error)}
                        helperText={emailState.error}
                        disabled={loading}
                    />
                    {isRegisterForm ? (
                        <TextField
                            fullWidth
                            label="Имя"
                            variant="outlined"
                            name="name"
                            value={userNameState.value}
                            onChange={onUserNameChange}
                            error={Boolean(userNameState.error)}
                            helperText={userNameState.error}
                            disabled={loading}
                        />
                    ) : null}

                    <TextField
                        fullWidth
                        type="password"
                        label="Пароль"
                        variant="outlined"
                        name="password"
                        value={passwordState.value}
                        onChange={onPasswordChange}
                        error={Boolean(passwordState.error)}
                        helperText={passwordState.error}
                        disabled={loading}
                    />
                    <Button type="submit" variant="contained" color="primary" size="large" disabled={loading} sx={{ minHeight: '46px' }} fullWidth>
                        {loading ? <Loader.Inner /> : submitButtonText}
                    </Button>
                </Stack>
            </form>
            {isRegisterForm ? (
                <Typography>
                    Уже есть аккаунт?{' '}
                    <Link
                        to={LOGIN}
                        className={classNames('form__redirect-link', 'clickable', {
                            'form__redirect-link_inactive': loading,
                        })}
                    >
                        Войти
                    </Link>
                </Typography>
            ) : (
                <Typography>
                    Еще нет аккаунта?{' '}
                    <Link
                        to={SIGNUP}
                        className={classNames('form__redirect-link', 'clickable', {
                            'form__redirect-link_inactive': loading,
                        })}
                    >
                        Зарегистрироваться
                    </Link>
                </Typography>
            )}
        </Box>
    )
}
