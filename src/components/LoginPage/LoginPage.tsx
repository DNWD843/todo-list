import React, { FC, useCallback } from 'react'
import { AuthForm } from '../forms/AuthForm'
import { TODOS } from '../../constants/routesMap'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export const LoginPage: FC = () => {
    const navigate = useNavigate()
    const onSuccess = useCallback(() => {
        navigate(TODOS)
    }, [navigate])
    const { loading, error, loginUser } = useAuth({ onSuccess })

    return <AuthForm submitButtonText="Войти" title="Авторизация" onSubmit={loginUser} loading={loading} authError={error} />
}
