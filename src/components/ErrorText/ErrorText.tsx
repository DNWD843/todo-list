import React, { FC } from 'react'
import { Typography } from '@mui/material'

export const ErrorText: FC<{ error?: string; className?: string }> = ({ error, className }) => {
    if (!error) {
        return null
    }

    return (
        <Typography tag="span" color="error" sx={{ m: 2 }} className={className}>
            {error}
        </Typography>
    )
}
