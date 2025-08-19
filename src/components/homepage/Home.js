import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'

import Footer from '../common/Footer.js'
import PageNavbar from '../common/PageNavbar.js'


// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'
import Slide from '@mui/material/Slide'

// Assets
import logoRainbow from '../../assets/logo-rainbow.png'
import ariHeadshot from '../../assets/ari-espresso.png'
import sunnyHammock from '../../assets/sunny-hammock.png'


// Helpers
import { standardButton, socialMediaButtons, arrowElement } from '../../helpers/buttons.js'
import { portfolioArray, positionChangeWidthSm, positionChangeWidthMd, navbarHeight, iconImageDimension, footerHeight, pjsBlue, pjsGreen, pjsYellow } from '../../helpers/variableDefaults.js'
import useWindowDimensions from '../../helpers/windowDimensions.js'
import { videoInsert } from '../../helpers/videos.js'
import { portfolioItemsMobileStepperAndArrows } from '../../helpers/mobileSteppers.js'
import { spin, rock, shakeX, shakeY } from '../../helpers/keyframeAnimations.js'

// import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics.js'

// Home Page
const Home = () => {

  // use Naviage
  const navigate = useNavigate()

  // Window Dimensions
  const { height, width } = useWindowDimensions()

  // States
  const [viewIndex, setViewIndex] = useState(0)



  // Homepage Body JSX
  const homepageBodyJSX = () => {
    return (
      <Box 
        sx={{ 
          minHeight: `calc(100vh - ${navbarHeight} - ${footerHeight})`, 
          // minHeight: `calc(100vh - ${navbarHeight})`, 
          width: '100vw', 
          backgroundColor: 'whitesmoke',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', 
        }}
      >
        {/* Hero */}
        <Box
          sx={{
            mb: 0,
            width: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
          }}
        >
          {/* Headshot */}
          <Box 
            sx={{ 
              mb: 2, 
              // mt: 5,
              // backgroundColor: 'yellow',
              // boxShadow: 2,
              height: width > 299 ? 300 : 220, 
              animation: `${rock(0, 10, -10, 0)} 5s infinite linear`,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
            }}
          >
            <Box 
              component='img' 
              // src={ariHeadshot} 
              // src={sunnyHammock} 
              src={logoRainbow} 
              alt='Headshot' 
              sx={{ 
                height: width > 299 ? 220 : 175, 
                width: width > 299 ? 220 : 175,
                objectFit: 'cover', 
                backgroundColor: 'white',
                // backgroundColor: 'orange',
                boxShadow: 5, 
                border: 3, borderRadius: '50%',
                borderColor: 'black', 
                // animation: `${rock(0, 10, -10, 0)} 3s infinite linear`,
              }} 
            />
          </Box>

          {/* Name */}
          <Typography
            textAlign={'center'}
            sx={{
              mt: 0, pb: 0, width: '90%', 
              fontSize: '20px',
              fontWeight: 'bold',
              color: pjsGreen,
            }}
          >
            Name
          </Typography>

          {/* Title */}
          <Typography
            textAlign={'center'}
            sx={{
              mt: 0, mb: 0, width: '90%', 
              fontSize: '16px',
              fontWeight: 'bold',
              color: pjsBlue,
            }}
          >
            Is Gay
          </Typography>

          {/* Tagline */}
          <Typography
            textAlign={'center'}
            sx={{
              mt: 0, mb: 0, width: '90%', 
              fontSize: '16px',
              fontWeight: 'bold',
              color: pjsYellow,
            }}
          >
            ...Very gay
          </Typography>

          {/* Contact */}
          {/* <Typography
            textAlign={'center'}
            sx={{
              mt: 3, mb: 0, width: '90%', 
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            (email@email.com)
          </Typography> */}

        </Box>

        
      </Box>
    )
  }


  const handleCancelPressed = () => {
    setViewIndex(0)
  }

  const handleSubmitPressed = () => {
    setViewIndex(0)
  }

  const changeFeaturedPersonViewJSX = () => {
    return (
      <Box 
        sx={{ 
          py: 2,
          minHeight: `calc(100vh - ${navbarHeight} - ${footerHeight})`, 
          // minHeight: `calc(100vh - ${navbarHeight})`, 
          width: '100vw', 
          backgroundColor: 'whitesmoke',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', 
        }}
      >


        {/* Submit and Cancel Buttons */}
        <Box
          sx={{
            width: '100%',
            // maxWidth: '250px',
            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
          }}
        >
          {/* Cancel */}
          {standardButton(
            'Cancel',
            'button',
            'contained',
            false,
            'warning',
            0,
            0,
            1,
            '85px',
            '50px',
            handleCancelPressed
          )}

          {/* Submit */}
          {standardButton(
            'Submit',
            'button',
            'contained',
            true,
            'secondary',
            0,
            0,
            1,
            '85px',
            '50px',
            handleSubmitPressed
          )}

        </Box>
      </Box>
    )
  }

  return (
    <>
      {/* Helmet — for analytics, seo, and page title changing */}
      {/* {seoPageTags(
        'Home'
      )} */}

      {/* Navbar */}
      <PageNavbar viewIndex={viewIndex} setViewIndex={setViewIndex} />

      {/* Body */}

      {/* Main homepage body */}
      {viewIndex === 0 && homepageBodyJSX()}

      {/* Change Featured Person View */}
      {viewIndex === 1 && 
        changeFeaturedPersonViewJSX()
      }



      {/* Footer */}
      <Footer contact={'email@email.com'} viewIndex={viewIndex}/>
    </>
  )
}

export default Home