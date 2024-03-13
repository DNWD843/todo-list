import React, { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import * as to from '../../constants/routesMap'
import { RegisterPage } from '../RegisterForm/RegisterPage'
import { LoginPage } from '../LoginPage/LoginPage'
import { CreateTodoPage } from '../CreateTodoPage/CreateTodoPage'
import { EditTodoPage } from '../EditTodoPage/EditTodoPage'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'
import { ActiveTodosPage } from '../ActiveTodosPage/ActiveTodosPage'
import { CompletedTodosPage } from '../CompletedTodosPage/CompletedTodosPage'

export const App: FC = () => {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path={to.LOGIN} element={<LoginPage />} />
                    <Route path={to.SIGNUP} element={<RegisterPage />} />
                    <Route
                        path={to.TODOS}
                        element={
                            <PrivateRoute>
                                <ActiveTodosPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={to.COMPLETED_TODOS}
                        element={
                            <PrivateRoute>
                                <CompletedTodosPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={to.EDIT}
                        element={
                            <PrivateRoute>
                                <EditTodoPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={to.CREATE_NEW}
                        element={
                            <PrivateRoute>
                                <CreateTodoPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path={to.ANY} element={<Navigate to={to.LOGIN} />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}
