/* eslint-disable no-prototype-builtins */
import React from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { navbarHeight, footerHeight } from '../../helpers/variableDefaults'

import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics'

// 404 Not Found Page
const NotFound = () => {
  return (
    <>
      {/* Helmet — for analytics, seo, and page title changing */}
      {seoPageTags(
        '404'
      )}

      {/* Body */}
      <Box 
        sx={{ 
          height: `calc(100vh - ${navbarHeight} - ${footerHeight})`, 
          width: '100vw', 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
        }}
      >

        {/* 404 Not Found text */}
        <Typography variant='h4'>Page Not Found!</Typography>

        {/* Link back to home.js */}
        <Typography as={Link} to="/" sx={{ textDecoration: 'underline' }}>Back to Home</Typography>
      </Box>
    </>
  )
}

export default NotFound