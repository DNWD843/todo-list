import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    browserSessionPersistence,
    setPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { FirebaseApp } from 'firebase/app'
import { authContext, TAuthContext } from './authContext'

type TProps = PropsWithChildren<{
    firebaseApp: FirebaseApp
}>

export const AuthContextProvider: FC<TProps> = ({ children, firebaseApp }) => {
    const [user, setUser] = useState<TAuthContext['user']>(null)
    const [auth] = useState(getAuth(firebaseApp))
    const [isAuthorized, setAuthorized] = useState<boolean | null>(null)

    const logout = useCallback(async () => {
        await signOut(auth)
        setUser(null)
        setAuthorized(null)
    }, [auth])

    useEffect(() => {
        if (!auth) {
            return
        }

        setPersistence(auth, browserSessionPersistence)
        auth.languageCode = 'ru'
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    userId: user.uid,
                    name: user.displayName,
                    email: user.email,
                })
                setAuthorized(true)
            } else {
                setUser(null)
                setAuthorized(false)
            }
        })
    }, [auth, auth.currentUser?.uid])

    const loginWithEmailAndPassword = useCallback(
        (email: string, password: string) => {
            setAuthorized(null)
            setUser(null)
            return signInWithEmailAndPassword(auth, email, password)
        },
        [auth],
    )

    const createUser = useCallback(
        async (email: string, name: string, password: string) => {
            setAuthorized(null)
            setUser(null)
            await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {
                displayName: name,
            })

            setUser({
                userId: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
            })
            setAuthorized(true)
        },
        [auth],
    )

    return (
        <authContext.Provider
            value={{
                user,
                isAuthorized,
                loginWithEmailAndPassword,
                createUser,
                logout,
            }}
        >
            {children}
        </authContext.Provider>
    )
}
