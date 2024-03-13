export type FormFieldState = {
    error: string
    value: string
}

export type TodoFormValues = {
    title: FormFieldState['value']
    description: FormFieldState['value']
    isImportant: boolean
    isCompleted: boolean
}

export type TodoFormValuesExtended = TodoFormValues & {
    createdAt: Date
}

export type AuthFormFieldValues = {
    email: FormFieldState['value']
    username?: FormFieldState['value']
    password: FormFieldState['value']
}
