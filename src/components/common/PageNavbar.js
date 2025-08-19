// React
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

// MUI
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'


// Import logo image — SimCap word logo w transparent background
import logoRainbow from '../../assets/logo-rainbow.png'


// Helper methods
import { navbarHeight, navbarBgDefaultColor, positionChangeWidthSm } from '../../helpers/variableDefaults'
import useWindowDimensions from '../../helpers/windowDimensions'
import { standardButton } from '../../helpers/buttons'
import { dummyBoxWidth } from '../../helpers/globalHelpers'

// The navbar appears at the top of the website on all pages except for unwrap views
const PageNavbar  = (props) => {

  const { viewIndex, setViewIndex } = props

  const handleChangeFeaturedPerson = () => {
    setViewIndex(1)
  }

  return (
    <>
      <AppBar position="static" component="nav"
        style={{ 
          background: navbarBgDefaultColor,
          boxShadow: 'none', 
        }}
      >
        <Box>
          <Toolbar 
            sx={{ 
              width: '100%',
              height: navbarHeight,
              fontFamily: 'Lato',
              display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
            }}
          >
            
            {/* Logo */}
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'flex-end' }}>

              {/* Logo image */}
              <Box as={Link} to={'/'} sx={{ width: 50 }}>
                <Box component='img' src={logoRainbow} alt="Logo" />
                {/* <Box component='img' src={logoPJSBlue} alt="Logo" /> */}
                {/* <Box component='img' src={logoPJSGreen} alt="Logo" /> */}
              </Box>

            </Box>

            {/* Change Featured Person Button */}
            {standardButton(
              `Change Featured Person`,
              'button',
              'contained',
              viewIndex !== 0,
              'secondary',
              0,
              0,
              0,
              '225px',
              '50px',
              handleChangeFeaturedPerson,
            )}


            {/* Dummy Box */}
            {/* {dummyBoxWidth('50px')} */}

            
          </Toolbar>
        </Box>
      </AppBar>
    </>
  )
}

export default PageNavbar