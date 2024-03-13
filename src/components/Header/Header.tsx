import React, { FC, useCallback } from 'react'
import './Header.css'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { COMPLETED_TODOS, CREATE_NEW, LOGIN, SIGNUP, TODOS } from '../../constants/routesMap'
import classNames from 'classnames'
import { useAuth } from '../../hooks/useAuth'
import { Loader } from '../Loader/Loader'
import { ErrorText } from '../ErrorText/ErrorText'

export const Header: FC = () => {
    const navigate = useNavigate()
    const onSuccess = useCallback(() => {
        navigate(LOGIN)
    }, [navigate])
    const { logout, user, loading, error } = useAuth({ onSuccess })

    const { pathname } = useLocation()

    return (
        <header className="header">
            <div className="header__container ">
                <span className="header__logo">MyTodoList</span>
                {user?.name ? (
                    <>
                        <nav className="header__navigation">
                            <ul className="header__nav-links">
                                <li>
                                    <NavLink
                                        to={TODOS}
                                        className={({ isActive }) => classNames('header__nav-link', 'clickable', { 'header__nav-link_active': isActive })}
                                    >
                                        Мои задачи
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={COMPLETED_TODOS}
                                        className={({ isActive }) => classNames('header__nav-link', 'clickable', { 'header__nav-link_active': isActive })}
                                    >
                                        Выполненные
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={CREATE_NEW}
                                        className={({ isActive }) => classNames('header__nav-link', 'clickable', { 'header__nav-link_active': isActive })}
                                    >
                                        Создать новую
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </>
                ) : null}

                <div className="header__user-profile">
                    {pathname === SIGNUP ? (
                        <Link to={LOGIN} className="clickable">
                            Войти
                        </Link>
                    ) : null}
                    {pathname === LOGIN ? (
                        <Link to={SIGNUP} className="clickable">
                            Зарегистрироваться
                        </Link>
                    ) : null}
                    {user?.name ? (
                        <>
                            <span className="header__user-name">{`Привет, ${user.name}`}</span>
                            <button type="button" className="button clickable" onClick={logout} disabled={loading}>
                                {loading ? <Loader.Inner /> : 'Выйти'}
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
            <ErrorText error={error} className="header__error" />
        </header>
    )
}
