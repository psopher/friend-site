/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unescaped-entities */

import ReactHtmlParser from 'react-html-parser'

// mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// FAQ Text
export const faqTextTypography = (text, size = '20px', font = 'Caveat') => {
  return (
    <Typography
      component="pre" //in Order to read multiline strings
      sx={{
        fontFamily: font,
        fontSize: size,
        width: '100%',
        // backgroundColor: 'orange',
        // display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      }}
    >
      {`${text}`.replace(/ {4} +/g, '')}
      {/* {`${text}`} */}
    </Typography>
  )
}

export const faqHTMLTypography = (text, size = '20px', font = 'Caveat') => {
  return (
    <Typography
      // component="pre" //in Order to read multiline strings
      sx={{
        fontFamily: font,
        fontSize: size,
        width: '100%',
        // backgroundColor: 'orange',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
      }}
    >
      {ReactHtmlParser(text)}
      {/* {`${text}`} */}
    </Typography>
  )
}

export const saveSuccessfulTypography = () => {
  return (
    <Typography 
      component='pre'
      textAlign={'center'}
      sx={{
        mt: 2, mb: 2,
        width: '90%',
        fontStyle: 'italic',
        color: 'blue',
      }}
    >
      
      {`Saved!`.replace(/ {4} +/g, '')}
        
    </Typography>
  )
}


export const advisoryTypography = (text, textAlign = 'center', fontSize = '16px', color = 'blue') => {
  return (
    <Typography 
      component='pre'
      textAlign={textAlign}
      sx={{
        mt: 2, mb: 2,
        width: '90%',
        fontStyle: 'italic',
        color: color,
        fontSize: fontSize,
      }}
    >
      
      {`${text}`.replace(/ {4} +/g, '')}
        
    </Typography>
  )
}