import { useCallback } from 'react'
import { useFetchingStatus } from './useFetchingStatus'
import { useAuthContext } from '../contexts/auth/authContext'
import { AuthFormFieldValues } from '../components/forms/types'

export const useAuth = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { loginWithEmailAndPassword, createUser, logout: authLogout, user, isAuthorized } = useAuthContext()
    const { loading, error, setLoading, setError } = useFetchingStatus()

    const createNewUser = useCallback(
        ({ email, username, password }: AuthFormFieldValues) => {
            setError('')
            setLoading(true)
            createUser(email, username || '', password)
                .then(() => {
                    onSuccess?.()
                })
                .catch((error: any) => {
                    setError(error?.message || 'Ошибка регистрации')
                })
                .finally(() => setLoading(false))
        },
        [createUser, onSuccess, setError, setLoading],
    )

    const loginUser = useCallback(
        ({ email, password }: AuthFormFieldValues) => {
            setError('')
            setLoading(true)
            loginWithEmailAndPassword(email, password)
                .then(() => {
                    onSuccess?.()
                })
                .catch((error) => {
                    setError(error?.message || 'Ошибка авторизации')
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [loginWithEmailAndPassword, onSuccess, setError, setLoading],
    )

    const logout = useCallback(() => {
        setLoading(true)
        authLogout()
            .then(() => {
                onSuccess?.()
            })
            .catch((error) => {
                setError(error?.message || 'Что-то пошло не так')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [authLogout, onSuccess, setError, setLoading])

    return {
        loading,
        error,
        createNewUser,
        loginUser,
        logout,
        user,
        isAuthorized,
    }
}
