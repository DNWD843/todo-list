import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { initializeAPI } from './api/firebaseApi'
import { AuthContextProvider } from './contexts/auth/AuthContextProvider'
import './index.css'
import { App } from './components/App/App'

const firebaseApp = initializeAPI()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthContextProvider firebaseApp={firebaseApp}>
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </AuthContextProvider>,
)
