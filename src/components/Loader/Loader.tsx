import React from 'react'
import './Loader.css'
import { Box, CircularProgress } from '@mui/material'

export const Loader = () => (
    <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: 'white' }} />
    </Box>
)

const LoaderInnerComponent = () => <CircularProgress style={{ width: '25px', height: '25px' }} sx={{ color: 'white' }} />

Loader.Inner = LoaderInnerComponent
