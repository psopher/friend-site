/* eslint-disable no-prototype-builtins */
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Cropper from 'react-easy-crop'

// import { navbarHeight, footerHeight, dashboardNavbarHeight, positionChangeWidthSm, cropAspectRatiosArray } from '../../../helpers/variableDefaults'
import { navbarHeight, footerHeight, positionChangeWidthSm } from '../../helpers/variableDefaults'
import { returnCroppedImage, urlToImageFile } from '../../helpers/imageHandling'
import { standardButton } from '../../helpers/buttons'
import { reloadView } from '../../helpers/globalHelpers'

// import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics'

// Crop Image Page
const CropImage = ({ updatedMediaItemObj, setUpdatedMediaItemObj, resetLoadingAndErrors, width }) => {

  // Navigate
  const navigate = useNavigate()

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  // Loading
  const [loadingNewMedia, setLoadingNewMedia] = useState(false)
  const [creatingCrop, setCreatingCrop] = useState(false)

  // Errors
  const [errorNewMedia, setErrorNewMedia] = useState(false)

  // Save Successful
  const [saveSuccessfulNewMedia, setSaveSuccessfulNewMedia] = useState(false)
    
      
  useEffect(() => {
    // console.log('videoThumbnail useEffect runs')

  }, [creatingCrop])

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log('cropped area percentages ->', croppedArea)
    // console.log('cropped area pixels ->', croppedAreaPixels)

    setUpdatedMediaItemObj({
      ...updatedMediaItemObj,
      'squareCrop': {
        x: croppedAreaPixels.x,
        y: croppedAreaPixels.y,
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      },
    })

  }

  const handleCancelPressed = () => {
    // console.log('handleCancelPressed runs')
    if (
      saveSuccessfulNewMedia
      // || !saveSuccessfulNewMedia
    ) { 
      reloadView()
    } else {
      resetLoadingAndErrors()
      setUpdatedMediaItemObj({})
    }

    window.scrollTo(0, 0)
  }

  const handleSavePressed = async (videoFile) => {
    // console.log('handleSavePressed runs')

    resetLoadingAndErrors()

    // Get Cropped Image
    setCreatingCrop(true)
    
    const croppedDataURL = await returnCroppedImage(
      updatedMediaItemObj.dataURL,
      updatedMediaItemObj['squareCrop'].x,
      updatedMediaItemObj['squareCrop'].y,
      updatedMediaItemObj['squareCrop'].width,
      updatedMediaItemObj['squareCrop'].height
    )
    // console.log('croppedDataURL ->', croppedDataURL)
    // const croppedImageWidthAndHeight = await getCurrentImageWidthsAndHeights(croppedDataURL)
      
    const newCroppedFile = await urlToImageFile(croppedDataURL, `crop-congratulations-image-square`)
      
    const newMediaObj = { ...updatedMediaItemObj }
      
      
    // Set Media Obj with Cropped Data URL
    newMediaObj['squareCropDataURL'] = croppedDataURL
    newMediaObj['squareCropFile'] = newCroppedFile
    newMediaObj['file'] = newCroppedFile

    setUpdatedMediaItemObj({ ...newMediaObj })

    setCreatingCrop(false)
  }

  const cropChange = async (crop) => {
    // console.log('crop ->', crop)
    setCrop(crop)
  }

  const zoomChange = async (zoom) => {
    setZoom(zoom)
  }

  const saveAndCancelButtonsJSX = (cancelDisabled, saveDisabled, handleCancelPressed, handleSavePressed, topMargin, bottomMargin, marginX, cancelColor = 'warning', saveColor = 'primary') => {
    return (
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {standardButton(
          'Cancel', 
          'button',
          'contained',
          cancelDisabled,
          cancelColor, 
          topMargin,
          bottomMargin,
          marginX,
          '80px',
          '45px',
          handleCancelPressed
        )}
        {standardButton(
          saveColor === 'error' ? 'Delete' : saveColor === 'secondary' ? 'Next' : 'Save', 
          'button',
          'contained',
          saveDisabled,
          saveColor, 
          topMargin,
          bottomMargin,
          marginX,
          '80px',
          '45px',
          handleSavePressed
        )}
      </Box>
    )
  }

  return (
    <>
      {/* Helmet — for analytics, seo, and page title changing */}
      {/* {seoPageTags(
        'CropUpdateMediaCarousel'
      )} */}

      {/* Body */}
      <Box 
        sx={{ 
          // minHeight: `calc(100vh - ${navbarHeight})`, 
          width: '100vw', 
          display: 'flex', flexDirection: 'column', justifyContent: width <= positionChangeWidthSm ? 'flex-start' : 'flex-start', alignItems: 'center', 
        }}
      >
        <Box
          sx={{
            width: '100%',
            // backgroundColor: 'pink',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
          }}
        >
          {/* Title */}
          <Box
            sx={{
              mb: 1,
              width: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                mt: 2,
                // mb: 1,
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              }}
            >
              {'Crop'}
            </Typography>
          </Box>
          
          <Box
            sx={{
              // backgroundColor: 'orange',
              my: 1,
              width: '300px',
              // maxWidth: '300px',
              height: '300px',
              // maxHeight: '300px',
              border: 2,
              borderColor: 'black',
            }}
          >
            <Box
              sx={{
                height: '100%',
                position: 'relative',
              }}
            >
              <Cropper
                image={updatedMediaItemObj.dataURL}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={cropChange}
                onCropComplete={onCropComplete}
                onZoomChange={zoomChange}
                // style={{
                //   containerStyle: { backgroundColor: 'white' },
                // }}
                objectFit={'cover'}
              />
            </Box>
          </Box>
          {/* ))} */}
        </Box>

        {/* Save and Cancel Buttons */}
        {/* {saveAndCancelButtonsJSX(
          false,
          false,
          handleCancelPressed,
          handleSavePressed,
          1,
          5,
          1,
          'warning',
          'secondary'
        )} */}

      </Box>
    </>
  )
}

export default CropImage