export type TodoType = {
    id: TodoId
    title: string
    description: string
    isImportant: boolean
    isCompleted: boolean
    createdAt: Date
}

export type UserId = string
export type TodoId = string

export type UrlParams = {
    todoId: TodoId
}
