/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unescaped-entities */

import React from 'react'

// mui
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { Link } from '@mui/material'

import PhotoCamera from '@mui/icons-material/PhotoCamera'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'
import XIcon from '@mui/icons-material/X'
import GitHubIcon from '@mui/icons-material/GitHub'
// import { ReactComponent as UpworkIcon } from '../assets/upwork-icon.svg'
// import { ReactComponent as FiverrIcon } from '../assets/fiverr-icon.svg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { simcapTurquoise, pjsBlue, pjsGreen, pjsYellow } from './variableDefaults'

import { Input } from './globalHelpers'

// Standard Button
export const standardButton = (buttonText, type, variant, disabled = false, color, topMargin, bottomMargin, marginX, buttonWidth, buttonHeight, clickHandler) => {
  return (
    <Button 
      disabled={disabled}
      type={type}
      fullWidth
      variant={variant}
      color={color}
      onClick={clickHandler} 
      sx={{ 
        mt: topMargin, 
        mb: bottomMargin, 
        mx: marginX, 
        width: buttonWidth,
        height: buttonHeight,
      }}
    >
      {buttonText}
    </Button>
  )
}



// Back/Forward and forward arrow IconButton in wrap and unwrap processes
export const arrowElement = (type, disabled, clickHandler, arrowBgColor = 'white', arrowColor, hoverColor) => {

  return (
    <IconButton 
      disabled={disabled}
      // color='primary' 
      onClick={clickHandler} 
      sx={{ 
        backgroundColor: arrowBgColor,
        color: arrowColor,
        boxShadow: 3, 
        mb: 0, 
        mx: 4, 
        '&:hover': { 
          color: hoverColor, 
          backgroundColor: arrowColor,
        },
      }}
    >
      {type === 'back' 
        ? 
        <ArrowBackIosNewIcon 
          // sx={{ color: arrowColor }} 
        /> 
        : 
        <ArrowForwardIosIcon 
          // sx={{ color: arrowColor }} 
        /> 
      }
    </IconButton>
  )
}

// Social Media Buttons Elements
export const socialMediaButtons = (flexDirection = 'row', justifyContent = 'flex-end', alignItems = 'center', bottomMargin = 0, fromFooter = false) => {
  return (
    <Box sx={{ 
      mb: bottomMargin,
      display: 'flex', justifyContent: { justifyContent }, flexDirection: { flexDirection }, alignItems: { alignItems }, 
    }}>
            
      {/* <Link href="https://www.linkedin.com/in/philip-sopher-ab403037/" className='linkedin' target="_blank" > */}
      {/* <Link href="#" className="linkedin" >
        <IconButton id='instagram' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', m: 1, border: 2, borderColor: pjsYellow, boxShadow: 3, backgroundColor: 'whitesmoke', '&:hover': { backgroundColor: pjsYellow } }} >
          <LinkedInIcon sx={{ color: '#000000' }}/>
        </IconButton>
      </Link> */}
            
      {/* <Link href="https://github.com/psopher/" className='github' target="_blank" > */}
        {/* <Link href="#" className="github" > */}
        {/* <IconButton id='instagram' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', m: 1, border: 2, borderColor: pjsYellow, boxShadow: 3, backgroundColor: 'whitesmoke', '&:hover': { backgroundColor: pjsYellow } }} >
          <GitHubIcon sx={{ color: '#000000' }}/>
        </IconButton> */}
      {/* </Link> */}
            
      {/* <Link href="https://www.upwork.com/freelancers/~015cf4608fd8fd00ef" className='upwork' target="_blank" > */}
        {/* <Link href="#" className="github" > */}
        {/* <IconButton id='upwork' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', m: 1, border: 2, borderColor: pjsYellow, boxShadow: 3, backgroundColor: 'whitesmoke', '&:hover': { backgroundColor: pjsYellow } }} >
          <UpworkIcon sx={{ color: '#000000' }}/>
        </IconButton> */}
      {/* </Link> */}
            
      {/* <Link href="https://www.fiverr.com/philipsopher/code-your-full-stack-website-and-turn-your-idea-into-an-mvp" className='fiverr' target="_blank" > */}
      {/* <Link href="#" className="github" > */}
      {/* <IconButton id='fiverr' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', maxHeight: '40px', m: 1, border: 2, borderColor: pjsYellow, boxShadow: 3, backgroundColor: 'whitesmoke', '&:hover': { backgroundColor: pjsYellow } }} >
        <FiverrIcon sx={{ color: '#000000' }} />
      </IconButton>
      </Link> */}
            
      {/* <Link href="https://www.instagram.com/byphilipsopher/" className='instagram' target="_blank" > */}
      {/* <Link href="#" className="instagram" > */}
      {/* <IconButton id='instagram' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', m: 1, border: 2, borderColor: pjsYellow, boxShadow: 3, backgroundColor: 'whitesmoke', '&:hover': { backgroundColor: pjsYellow } }} >
        <InstagramIcon sx={{ color: '#000000' }}/>
      </IconButton> */}
      {/* </Link> */}
            
      {/* <Link href="https://www.instagram.com/sheir.estate/" className='twitter' target="_blank" > */}
      {/* <Link href="#" className="twitter" >
        <IconButton id='instagram' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', m: 1, border: 2, borderColor: simcapTurquoise, boxShadow: 3, backgroundColor: 'white', '&:hover': { backgroundColor: simcapTurquoise } }} >
          <XIcon sx={{ color: '#000000' }}/>
        </IconButton>
      </Link> */}

      {/* <Link href="https://www.tiktok.com/@3d.wrap" className='tiktok' target="_blank" >
        <IconButton id='tiktok' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', m: 1, border: 2, borderColor: 'black', boxShadow: 3, backgroundColor: 'white' }} >
          <TikTokIcon color='primary' sx={{ color: '#000000' }}/>
        </IconButton>
      </Link>
            
      <Link href="https://www.youtube.com/channel/UCSxlfIDKJu2FT2BoqnHHUXw" className='youtube' target="_blank" >
        <IconButton id='youtube' aria-label="upload picture" component="span" sx={{ width: '40px', height: '40px', mr: fromFooter ? 0 : 1, ml: 1, my: 1, border: 2, borderColor: 'black', boxShadow: 3, backgroundColor: 'white' }} >
          <YouTubeIcon sx={{ color: '#000000' }}/>
        </IconButton>
      </Link> */}
    </Box>
  )
}
