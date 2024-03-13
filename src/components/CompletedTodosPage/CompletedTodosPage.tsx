import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useTodoList } from '../../hooks/useTodoList'
import { TodoId } from '../../types'
import { Loader } from '../Loader/Loader'
import { useTodo } from '../../hooks/useTodo'
import { ErrorText } from '../ErrorText/ErrorText'
import { TodoList } from '../TodoList/TodoList'

const REQUEST_DELAY = 2000

export const CompletedTodosPage: FC = () => {
    const [completedOnly] = useState(true)
    const [selectedTodos, setSelectedTodos] = useState<TodoId[]>([])
    const { data, loading: isListFetching, error: todoListError, refetch } = useTodoList(completedOnly)
    const {
        loading: isTodoMethodProcessing,
        error: todoError,
        deleteTodo,
        restoreTodos,
    } = useTodo({
        onSuccess: refetch,
    })

    const timeoutRef = useRef(0)

    const onComplete = useCallback((id: TodoId) => {
        setSelectedTodos((prev) => {
            if (prev.includes(id)) {
                return prev.filter((completedTodoId) => completedTodoId !== id)
            }

            return [...prev, id]
        })
    }, [])

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (selectedTodos.length) {
            timeoutRef.current = setTimeout(() => {
                restoreTodos(selectedTodos).then(() => setSelectedTodos([]))
            }, REQUEST_DELAY)
        }
    }, [selectedTodos, restoreTodos, refetch])

    if (isListFetching || isTodoMethodProcessing) {
        return <Loader />
    }

    if (todoListError || todoError) {
        return <ErrorText error={todoListError || todoError} />
    }

    return <TodoList todos={data?.todos} onDelete={deleteTodo} onComplete={onComplete} />
}
