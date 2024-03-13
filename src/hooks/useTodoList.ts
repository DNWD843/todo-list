import { useCallback, useEffect } from 'react'
import { getTodoList } from '../api/firebaseApi'
import { useFetchingStatus } from './useFetchingStatus'
import { TodoType } from '../types'

export const useTodoList = (completedOnly?: boolean) => {
    const { setData, setLoading, setError, data, loading, error } = useFetchingStatus<{ todos: TodoType[] }>()

    const fetchTodos = useCallback(() => {
        setError('')
        setLoading(true)
        getTodoList()
            .then((res) => {
                setData({
                    todos: res.todos
                        .filter((todo) => {
                            if (completedOnly) {
                                return todo.isCompleted
                            }

                            return !todo.isCompleted
                        })
                        .sort((a, b) => {
                            return Number(b.isImportant) - Number(a.isImportant)
                        }),
                })
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [completedOnly, setData, setError, setLoading])

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    return {
        data,
        loading,
        error,
        refetch: fetchTodos,
    }
}
