import React from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { navbarHeight, footerHeight } from '../../helpers/variableDefaults'

import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics'

// Unavailable Page
const Unavailable = () => {
  return (
    <>
      {/* Helmet — for analytics, seo, and page title changing */}
      {seoPageTags(
        'Unavailable'
      )}

      {/* Body */}
      <Box 
        sx={{ 
          height: `calc(100vh - ${navbarHeight} - ${footerHeight})`, 
          width: '100vw', 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
        }}
      >

        {/* Unavailable text */}
        <Typography variant='h4'>Sorry, this website is Unavailable in your country.</Typography>

      </Box>
    </>
  )
}

export default Unavailable