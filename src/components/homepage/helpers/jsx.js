import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'

// Axios
import axios from 'axios'

// Assets
import logoRainbow from '../../../assets/logo-rainbow.png'

// Components
import CropImage from '../../common/CropImage'
import Payment from '../../common/Payment'

// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

// Helpers
import { showPayments, navbarHeight, footerHeight, pjsYellow, positionChangeWidthSm, maximumMediaSize } from '../../../helpers/variableDefaults'
import { circularSpinnerWithText } from '../../../helpers/spinners'
import { rock } from '../../../helpers/keyframeAnimations'
import { fileToDataURL, getStartCropImageWidthsAndHeights } from '../../../helpers/imageHandling'
import { standardButton, addImageWithTextButton } from '../../../helpers/buttons'

import { submitButtonIsDisabled } from './methods'

// Homepage Body JSX
export const homepageBodyJSX = (previousFeaturedPerson, loading, width) => {
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
      {loading 
        ?
          circularSpinnerWithText()
          :
          <>
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
                  sx={{
                    boxShadow: 5, 
                    border: 5, borderRadius: '50%',
                    borderColor: 'red', 
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      // boxShadow: 5, 
                      border: 5, borderRadius: '50%',
                      borderColor: 'orange', 
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        // boxShadow: 5, 
                        border: 5, borderRadius: '50%',
                        borderColor: 'yellow', 
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          // boxShadow: 5, 
                          border: 5, borderRadius: '50%',
                          borderColor: 'green', 
                          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            // boxShadow: 5, 
                            border: 5, borderRadius: '50%',
                            borderColor: 'blue', 
                            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              // boxShadow: 5, 
                              border: 5, borderRadius: '50%',
                              borderColor: 'purple', 
                              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                            }}
                          >
                            {/* <Box
                              sx={{
                                // boxShadow: 5, 
                                border: 5, borderRadius: '50%',
                                borderColor: 'pink', 
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
                              }}
                            > */}
                            <Box 
                              component='img' 
                              // src={ariHeadshot} 
                              // src={sunnyHammock} 
                              // src={logoRainbow} 
                              src={'image' in previousFeaturedPerson && previousFeaturedPerson.image.length > 0 ? previousFeaturedPerson.image : logoRainbow}
                              alt='Headshot' 
                              sx={{ 
                                height: width > 299 ? 220 : 175, 
                                width: width > 299 ? 220 : 175,
                                objectFit: 'cover', 
                                backgroundColor: 'white',
                                // backgroundColor: 'orange',
                                // boxShadow: 5, 
                                border: 3, 
                                borderColor: 'black',
                                borderRadius: '50%', 
                                // animation: `${rock(0, 10, -10, 0)} 3s infinite linear`,
                              }} 
                            />
                            {/* </Box> */}
                          </Box> 
                        </Box>
                      </Box> 
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Name */}
              <Typography
                textAlign={'center'}
                sx={{
                  mt: 0, pb: 0, width: '90%', 
                  fontSize: '20px',
                  fontWeight: 'bold',
                  // color: pjsGreen,
                  color: 'purple',
                }}
              >
                {previousFeaturedPerson.nameOfFeaturedPerson}
              </Typography>

              {/* Title */}
              <Typography
                textAlign={'center'}
                sx={{
                  mt: 0, mb: 0, width: '90%', 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  // color: pjsBlue,
                  color: 'dodgerblue',
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
                  // color: 'orange',
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
          </>
      }
    </Box>
  )
}

export const changeFeaturedPersonViewJSX = (newFeaturedPerson, setNewFeaturedPerson, updatedMediaItemObj, setUpdatedMediaItemObj, stripePaymentForm, setStripePaymentForm, stripe, elements, handleCancelPressed, handleSubmitPressed, loadingPayments, setLoadingPayments, loading, resetLoadingAndErrors, width) => {

  const handleChangeNewFeaturedPerson = (e) => {
    const { name, value } = e.target

    setNewFeaturedPerson({ ...newFeaturedPerson, [name]: value })
  }
  
  const handleImageSelect = async (e) => {
    // console.log('handleImageSelect runs')

    resetLoadingAndErrors()

    if (e.target.files.length > 0) {
      // Set errors to false and loading to true
      // setErrors({ ...errors, image: false })
      // setLoading({ ...loading, image: true })

      if (
        e.target.files[0].size < maximumMediaSize // less than maximum accepted size
        && e.target.files[0].size > 0
        &&
        (
          e.target.files[0].type.includes('image') 
        )
      ) {
        
        const fileDataURL = await fileToDataURL(e.target.files[0])
        // console.log('fileDataURL')
        const mediaStartCropWidthsAndHeightsObj = await getStartCropImageWidthsAndHeights(fileDataURL)
        // console.log('mediaStartCropWidthsAndHeightsObj')

        setUpdatedMediaItemObj({
          ...updatedMediaItemObj,

          file: e.target.files[0],
          dataURL: fileDataURL,
          
          mediaType: 'image',

          squareCrop: {
            x: 0,
            y: 0, 
            width: mediaStartCropWidthsAndHeightsObj.squareImageWidth,
            height: mediaStartCropWidthsAndHeightsObj.squareImageHeight,
          },
          squareCropDataURL: '',

        })

      } else {
        console.log('file too large ->', e.target.files[0].size)
        // setErrors({ ...errors, image: true })
      }
    
      // setLoading({ ...loading, image: false })
    }
  }

  const nameAndContactTextFieldJSX = (name, placeholder, disabled) => {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        }}
      >

        {/* TextField */}
        <TextField 
          variant={'outlined'}
          disabled={disabled}
          name={name}
          maxLength={50}
          label={placeholder}
          // focused={true}
          aria-label={name}
          placeholder={placeholder}
          autoComplete='off'
          // size={size}
          value={newFeaturedPerson[name]}
          onChange={(e) => handleChangeNewFeaturedPerson(e)}
          color="primary"
          sx={{ 
            backgroundColor: 'white',
            // width: width >= 440 ? 'calc(100% - 120px)' : '95%',
            // width: width < positionChangeWidthSm ? '90%' : 'calc(48% - 40px)', 
            width: width < positionChangeWidthSm ? '90%' : newFeaturedPerson[name].length <= 1 ? '48%' : '45%', 
            maxWidth: newFeaturedPerson[name].length <= 1 ? '290px' : '290px',
            // maxWidth: '325px', 
            // ml: '45px', 
            mt: 1,
          }}
        />
      </Box>
    )
  }


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
      {loading 
        ?
          circularSpinnerWithText()
          :
          <>
            {/* Image */}
            {Object.keys(updatedMediaItemObj).length > 0
              && 'dataURL' in updatedMediaItemObj 
              && updatedMediaItemObj.dataURL
              ?
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  }}
                >
                  <CropImage updatedMediaItemObj={updatedMediaItemObj} setUpdatedMediaItemObj={setUpdatedMediaItemObj} loadingPayments={loadingPayments} resetLoadingAndErrors={resetLoadingAndErrors} width={width} />
                </Box>
                :
                <Box
                  sx={{
                    backgroundColor: 'mistyrose',
                    mt: width < positionChangeWidthSm ? 2 : 2,
                    width: '90%', maxWidth: '290px',
                    height: '300px',
                    boxShadow: 3, borderRadius: '5px',
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  }}
                >
                  {addImageWithTextButton(
                    'Upload Image',
                    'imageId',
                    'image',
                    'contained',
                    'secondary',
                    false,
                    handleImageSelect,
                    '50px',
                    '200px',
                    0
                  )}
                </Box>
            }

            {/* Name */}
            {nameAndContactTextFieldJSX('nameOfFeaturedPerson', 'Name', loadingPayments)}


            {/* Contact */}
            {nameAndContactTextFieldJSX('contact', 'Contact (email/IG/cell)', loadingPayments)}

            {/* Payments */}
            {showPayments &&
              <Payment stripePaymentForm={stripePaymentForm} setStripePaymentForm={setStripePaymentForm} stripe={stripe} elements={elements} loadingPayments={loadingPayments} setLoadingPayments={setLoadingPayments} />
            }

            
            {/* Submit and Cancel Buttons */}
            <Box
              sx={{
                mt: 2,
                mb: 3,
                width: '100%',
                // maxWidth: '250px',
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              }}
            >
              {loadingPayments ?
                circularSpinnerWithText('uploading changes')
                :
                <>
                  {/* Cancel */}
                  {standardButton(
                    'Cancel',
                    'button',
                    'contained',
                    loadingPayments,
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
                    submitButtonIsDisabled(showPayments, updatedMediaItemObj, stripePaymentForm, loadingPayments),
                    'secondary',
                    0,
                    0,
                    1,
                    '85px',
                    '50px',
                    handleSubmitPressed
                  )}
                
                </>
              }

            </Box>
          </>
      }
    </Box>
  )
}