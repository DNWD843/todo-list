import { useCallback, useEffect } from 'react'
import { useFetchingStatus } from './useFetchingStatus'
import { useParams } from 'react-router-dom'
import * as api from '../api/firebaseApi'
import { TodoFormValues } from '../components/forms/types'
import { TodoId, UrlParams } from '../types'

export const useTodo = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { todoId } = useParams<UrlParams>()
    const { loading, error, setLoading, setError } = useFetchingStatus() // стейты для CRUD методов работы с задачей
    const { data, setData, loading: pageLoading, setLoading: setPageLoading } = useFetchingStatus() // стейт для полученя задачи перед ее редактированием

    const addTodo = useCallback(
        (data: TodoFormValues) => {
            setLoading(true)
            api.addTodo({ ...data, createdAt: new Date() })
                .then(() => {
                    onSuccess?.()
                })
                .catch((error: any) => setError(error))
        },
        [onSuccess, setError, setLoading],
    )

    const updateTodo = useCallback(
        (data: TodoFormValues) => {
            setLoading(true)
            api.updateTodo(todoId, { ...data, createdAt: new Date() })
                .then(() => {
                    onSuccess?.()
                })
                .catch((error: any) => setError(error))
        },
        [onSuccess, setError, setLoading, todoId],
    )

    const deleteTodo = useCallback(
        (todoId: TodoId) => {
            setLoading(true)
            api.removeTodo(todoId)
                .then(() => onSuccess?.())
                .catch((error) => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [onSuccess, setError, setLoading],
    )

    const completeTodos = useCallback(
        (todoIds: TodoId[]) => {
            setLoading(true)
            return Promise.all(todoIds.map((todoId) => api.completeTodo(todoId)))
                .then(() => {
                    onSuccess?.()
                })
                .catch((error: any) => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [onSuccess, setError, setLoading],
    )

    const restoreTodos = useCallback(
        (todoIds: TodoId[]) => {
            setLoading(true)
            return Promise.all(todoIds.map((todoId) => api.restoreTodo(todoId)))
                .then(() => {
                    onSuccess?.()
                })
                .catch((error: any) => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [onSuccess, setError, setLoading],
    )

    useEffect(() => {
        if (todoId) {
            setPageLoading(true)
            api.getTodo(todoId)
                .then((res) => {
                    setData(res)
                })
                .catch((err) => setError(err.message))
                .finally(() => setPageLoading(false))
        }
    }, [setData, setError, setPageLoading, todoId])

    return {
        data,
        loading,
        pageLoading,
        error,
        addTodo,
        updateTodo,
        deleteTodo,
        completeTodos,
        restoreTodos,
    }
}
