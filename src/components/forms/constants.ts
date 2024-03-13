import { FormFieldState } from './types'

export const DEFAULT_SUBTITLE = 'Введите логин и пароль'
export const DEFAULT_SUBMIT_BUTTON_TEXT = 'Отправить'
export const PASSWORD_LENGTH = 6
export const REQUIRED_FIELD_ERROR_TEXT = 'Поле обязательно для заполнения'

export const initialFormFieldState: FormFieldState = {
    error: '',
    value: '',
}
