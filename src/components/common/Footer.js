import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Helpers
import { standardButton, socialMediaButtons } from '../../helpers/buttons.js'
import { footerHeight, positionChangeWidthSm, positionChangeWidthMd, navbarHeight, pjsBlue, pjsGreen, pjsYellow } from '../../helpers/variableDefaults'
import useWindowDimensions from '../../helpers/windowDimensions.js'

// import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics'

// Footer
const Footer = ({ contact = 'email@email.com', viewIndex = 0}) => {

  // use Naviage
  const navigate = useNavigate()

  // Window Dimensions
  const { height, width } = useWindowDimensions()

  return (
    <Box
      sx={{
        mt: 0,
        width: '100%',
        minHeight: footerHeight,
        // height: footerHeight,
        // maxHeight: footerHeight,
        // backgroundColor: 'black',
        // backgroundColor: pjsYellow,
        backgroundColor: pjsGreen,
        // backgroundColor: pjsBlue,
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <Box
        sx={{
          // px: width < positionChangeWidthSm ? 1 : 0,
          width: '95%',
          height: '100%',
          display: 'flex', flexDirection: width < positionChangeWidthSm ? 'column' : 'row', justifyContent: 'center', alignItems: 'center',
        }}
      >

        {/* Contact */}
        {viewIndex === 0 &&
          <Typography
            sx={{
              pb: width < positionChangeWidthSm ? 1 : 0,
              color: 'whitesmoke',
              // color: pjsBlue,
              fontWeight: 'bold',
            }}
          >
            {contact}
          </Typography>
        }

        {/* Social Media Buttons */}
        {/* {socialMediaButtons('row', 'center', 'center', 0, true)} */}

      </Box>
    </Box>
  )
}

export default Footer