/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unescaped-entities */

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Standard Error Container
export const standardErrorContainer = (errorText, marginBottom, marginTop) => {
  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      mb: marginBottom, mt: marginTop,
    }}>
      <Typography variant='p' sx={{ color: 'red' }}>
        {errorText}
      </Typography>
    </Box>
  )
}