import React, { FC, PropsWithChildren } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth/authContext'
import { Loader } from '../Loader/Loader'

type TProps = PropsWithChildren<RouteProps>

export const PrivateRoute: FC<TProps> = ({ children }) => {
    const { user, isAuthorized } = useAuthContext()

    if (isAuthorized === null) {
        return <Loader />
    }
    return isAuthorized && user?.name ? children : <Navigate to="/login" />
}
