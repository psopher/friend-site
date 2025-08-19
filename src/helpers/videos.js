import React from 'react'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

export const videoInsert = (videoLink, altText, cardWidth, width) => {

  return (
    <Card align="left" 
      sx={{ 
        position: 'relative',
        backgroundColor: '#C5C5C5',
        pb: cardWidth === '95%' ? '56.25%' : '59.21%',
        mt: 3, mb: 0,
        boxShadow: 3, 
        width: cardWidth,
        // maxWidth: '600px',
        // height: width > positionChangeWidthSm ? width > positionChangeWidthSm ? '65vh' : '50vh' : '35vh',
        // height: width >= positionChangeWidthMd ? `506.25px` : `calc(95vw*9/16)px`,
        maxWidth: 'md',
      }}
    >
      <CardMedia
        component="iframe"
        src={videoLink}
        height="100%"
        // height={`calc(${cardWidth}*9)`}
        alt={altText}
        sx={{ 
          width: '100%',
          position: 'absolute',
          borderRadius: 0,
          // display: 'inline-block',
        }}
      />
    </Card>
  )
}