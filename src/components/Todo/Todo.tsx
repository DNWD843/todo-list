import React, { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Todo.css'
import { TodoId, TodoType } from '../../types'
import classNames from 'classnames'
import DoneIcon from '@mui/icons-material/Done'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

type TodoProps = TodoType & {
    onDelete: (id: TodoId) => void
    onComplete: (id: TodoId) => void
}

export const Todo: FC<TodoProps> = ({ id, title, description, isImportant, isCompleted, onDelete, onComplete }) => {
    const [isTodoCompleted, setCompleted] = useState(isCompleted)
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        onDelete(id)
    }

    const handleComplete = () => {
        setCompleted((prev) => !prev)
        onComplete(id)
    }

    return (
        <div
            className={classNames('todo', {
                todo_important: isImportant,
                todo_completed: isTodoCompleted,
            })}
        >
            <NavLink to={`/update/${id}`} className="todo__content">
                <h2 className="todo__title">{title}</h2>
                <span className="todo__description">{description}</span>
            </NavLink>
            <div className="todo__actions">
                <button type="button" className="todo__action-button" onClick={handleComplete}>
                    {isTodoCompleted ? <DoneIcon /> : <CropSquareIcon />}
                </button>
                <button type="button" className="todo__action-button" onClick={handleClickOpen}>
                    <DeleteIcon />
                </button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{`Удаление задачи "${title}"?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">После удаления задачу невозможно восстановить.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button variant="contained" color="error" onClick={handleDelete} autoFocus>
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}
