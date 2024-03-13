import React, { FC } from 'react'
import './Footer.css'

export const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <span className="footer__copyright">&#169; Сделано на курсе Frontend от Karpov.Courses</span>
                <span className="footer__year"> 2023г.</span>
            </div>
        </footer>
    )
}
