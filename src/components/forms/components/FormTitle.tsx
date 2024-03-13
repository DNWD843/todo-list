import React, { FC } from 'react'
import { Typography } from '@mui/material'

export const FormTitle: FC<{ text: string }> = ({ text }) => (
    <Typography pb={2} component="h3" sx={{ fontSize: '32px', fontWeight: 700 }}>
        {text}
    </Typography>
)
