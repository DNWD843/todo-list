import React, { FC, useCallback } from 'react'
import { TodoForm } from '../forms/TodoForm'
import { useNavigate } from 'react-router-dom'
import { TODOS } from '../../constants/routesMap'
import { useTodo } from '../../hooks/useTodo'

export const CreateTodoPage: FC = () => {
    const navigate = useNavigate()
    const onSuccess = useCallback(() => {
        navigate(TODOS)
    }, [navigate])

    const { loading, error, addTodo } = useTodo({ onSuccess })

    return <TodoForm formTitle="Создание задачи" submitButtonText="Создать" onSubmit={addTodo} error={error} loading={loading} />
}
