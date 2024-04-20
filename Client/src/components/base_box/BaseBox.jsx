import React from 'react'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'

const BaseBox = ({children, ...props}) => {
  return (
    <Box {...props}>
      <CssBaseline />
      {children}
    </Box>
  )
}

export default BaseBox
