import React, { FC, useCallback } from 'react'
import { AuthForm } from '../forms/AuthForm'
import { useAuth } from '../../hooks/useAuth'
import { TODOS } from '../../constants/routesMap'
import { useNavigate } from 'react-router-dom'

export const RegisterPage: FC = () => {
    const navigate = useNavigate()
    const onSuccess = useCallback(() => {
        navigate(TODOS)
    }, [navigate])
    const { loading, error, createNewUser } = useAuth({ onSuccess })

    return (
        <AuthForm
            title="Регистрация"
            subtitle="Введите логин, имя и пароль"
            submitButtonText="Зарегистрироваться"
            onSubmit={createNewUser}
            loading={loading}
            authError={error}
            isRegisterForm
        />
    )
}
