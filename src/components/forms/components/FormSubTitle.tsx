import React, { FC } from 'react'
import { Typography } from '@mui/material'

export const FormSubTitle: FC<{ text: string }> = ({ text }) => (
    <Typography pb={4} component="p" sx={{ fontSize: '22px', fontWeight: 500 }}>
        {text}
    </Typography>
)
