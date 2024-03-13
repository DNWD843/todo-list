import { createContext, useContext } from 'react'
import { UserCredential } from 'firebase/auth'
import { UserId } from '../../types'

export type TLoginWithEmailAndPasswordResult = UserCredential
export type TCreateUserResult = UserCredential

export type TAuthContext = {
    user: { userId: UserId; name: string; email: string } | null
    isAuthorized: boolean | null
    loginWithEmailAndPassword: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>
    createUser: (email: string, name: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const authContext = createContext<TAuthContext>({
    user: null,
    isAuthorized: null,
    loginWithEmailAndPassword: () => Promise.reject({}),
    createUser: () => Promise.reject({}),
    logout: () => Promise.reject(),
})

export const useAuthContext = (): TAuthContext => useContext<TAuthContext>(authContext)
