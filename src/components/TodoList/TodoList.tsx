import React, { FC } from 'react'
import './TodoList.css'
import { Todo } from '../Todo/Todo'
import { Box, Typography } from '@mui/material'
import { CREATE_NEW } from '../../constants/routesMap'
import { Link } from 'react-router-dom'
import { TodoId, TodoType } from '../../types'

type TodoListProps = {
    todos: TodoType[] | undefined
    onDelete: (todoId: TodoId) => void
    onComplete: (todoId: TodoId) => void
}

export const TodoList: FC<TodoListProps> = ({ todos, onDelete, onComplete }) => {
    return todos?.length ? (
        <ul className="todo-list">
            {todos.map((todo) => (
                <Todo key={todo.id} {...todo} onDelete={onDelete} onComplete={onComplete} />
            ))}
        </ul>
    ) : (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={2} pt={30}>
            <Typography fontSize={20} component="h2">
                В Вашем списке пусто.
            </Typography>
            <Link to={CREATE_NEW} className="todo-list-container__redirect-link clickable">
                Создать задачу
            </Link>
        </Box>
    )
}
