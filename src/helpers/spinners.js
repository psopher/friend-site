// React
import React from 'react'

// mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// Circular Progress Spinner
export const circularSpinnerWithText = (text = '', subText = '') => {
  return (
    <Box
      sx={{ 
        width: '100%', height: '100%', maxWidth: '250px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      }}
    >
      {/* Spinner */}
      <Box
        sx={{ 
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
        }}
      >

        {/* circular spinner animation */}
        <CircularProgress color="primary" />

      </Box>  

      
      {/* Text */}
      {text.length > 0 &&
        <Box
          sx={{
            mt: 0,
            width: '100%',
            fontSize: '18px',
            fontFamily: 'Raleway',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              width: '100%',
              fontSize: '18px',
              fontFamily: 'Raleway',
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            }}
          >
            {`${text}`}
          </Typography>
          
          {subText.length > 0 &&
            <Typography
              sx={{
                width: '100%',
                fontSize: '16px',
                fontFamily: 'Raleway',
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              }}
            >
              {`${subText}`}
            </Typography>
          }
          
        </Box>
      }

    </Box>
  )
}