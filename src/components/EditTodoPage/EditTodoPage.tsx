import React, { FC, useCallback } from 'react'
import { TodoForm } from '../forms/TodoForm'
import { TODOS } from '../../constants/routesMap'
import { useNavigate } from 'react-router-dom'
import { useTodo } from '../../hooks/useTodo'
import { Loader } from '../Loader/Loader'

export const EditTodoPage: FC = () => {
    const navigate = useNavigate()
    const onSuccess = useCallback(() => {
        navigate(TODOS)
    }, [navigate])
    const { data, loading, pageLoading, error, updateTodo } = useTodo({ onSuccess })

    if (pageLoading) {
        return <Loader />
    }

    if (!data) {
        return null
    }

    return <TodoForm {...data} formTitle="Редактирование задачи" submitButtonText="Сохранить" onSubmit={updateTodo} error={error} loading={loading} />
}
