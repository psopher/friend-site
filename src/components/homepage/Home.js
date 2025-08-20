import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'

// Axios
import axios from 'axios'

import Footer from '../common/Footer.js'
import PageNavbar from '../common/PageNavbar.js'
import CropImage from '../common/CropImage.js'
import Payment from '../common/Payment.js'


// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Link } from '@mui/material'
import Slide from '@mui/material/Slide'

// Assets
import logoRainbow from '../../assets/logo-rainbow.png'
import ariHeadshot from '../../assets/ari-espresso.png'
import sunnyHammock from '../../assets/sunny-hammock.png'


// Helpers
import { standardButton, socialMediaButtons, arrowElement, addImageWithTextButton } from '../../helpers/buttons.js'
import { showPayments, priceForChange, featuredDefaultsArray, positionChangeWidthSm, positionChangeWidthMd, navbarHeight, maximumMediaSize, iconImageDimension, footerHeight, pjsBlue, pjsGreen, pjsYellow } from '../../helpers/variableDefaults.js'
import useWindowDimensions from '../../helpers/windowDimensions.js'
import { videoInsert } from '../../helpers/videos.js'
import { reloadView, shuffleArray, dateIsWithin24Hours } from '../../helpers/globalHelpers.js'
import { portfolioItemsMobileStepperAndArrows } from '../../helpers/mobileSteppers.js'
import { spin, rock, shakeX, shakeY } from '../../helpers/keyframeAnimations.js'
import { fileToDataURL, getStartCropImageWidthsAndHeights, updateAWSFileAtURL, returnCroppedImage, urlToImageFile } from '../../helpers/imageHandling.js'
import { circularSpinnerWithText } from '../../helpers/spinners.js'

// Stripe
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

// import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics.js'

// Home Page
const Home = (props) => {

  const { stripePaymentForm, setStripePaymentForm } = props

  // use Naviage
  const navigate = useNavigate()

  // Window Dimensions
  const { height, width } = useWindowDimensions()

  // Stripe
  const stripe = useStripe()
  const elements = useElements()

  // States
  const [viewIndex, setViewIndex] = useState(0)
  const [updatedMediaItemObj, setUpdatedMediaItemObj] = useState({})
  const [newFeaturedPerson, setNewFeaturedPerson] = useState({
    nameOfFeaturedPerson: '',
    contact: '',
  })
  const [previousFeaturedPerson, setPreviousFeaturedPerson] = useState({
    nameOfFeaturedPerson: '',
    contact: '',
    image: ''
  })

  // Loading and Errors
  const [loading, setLoading] = useState(false)
  const [loadingPayments, setLoadingPayments] = useState(false)

  const [errors, setErrors] = useState(false)
  const [errorsPayments, setErrorsPayments] = useState(false)

  useEffect(() => {
    // console.log('my account use effect runs')
    const fetchData = async () => {
      setLoading(true)
      // console.log('userId ->', userId)
      try {
        const { data: retrievedFeaturedPersonsArray } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/congratulations`, {
          headers: {
            // Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        // console.log('retrievedFeaturedPersonsArray ->', retrievedFeaturedPersonsArray)
        // console.log('retrievedFeaturedPersonsArray length ->', retrievedFeaturedPersonsArray.length)

        // console.log('date is within 24 hours ->', dateIsWithin24Hours(retrievedFeaturedPersonsArray[0].updatedAt))
        if (
          (
            retrievedFeaturedPersonsArray.length > 0
            && Object.keys(retrievedFeaturedPersonsArray[0]).length > 0
            && 'updatedAt' in retrievedFeaturedPersonsArray[0]
            && dateIsWithin24Hours(retrievedFeaturedPersonsArray[0].updatedAt)
          )
        ) {
          
          setPreviousFeaturedPerson({ ...retrievedFeaturedPersonsArray[0] })

          setLoading(false)

        } else {
          const shuffledFeaturedDefaults = shuffleArray(featuredDefaultsArray)
          setPreviousFeaturedPerson({ ...shuffledFeaturedDefaults[0] })

          setLoading(false)
        }

      } catch (err) {
        // console.log(err)

        setLoading(false)
      }
    }

    fetchData()
  }, [])

        
  useEffect(() => {
    // console.log('videoThumbnail useEffect runs')

  }, [updatedMediaItemObj, newFeaturedPerson, loading, errors, loadingPayments, errorsPayments, stripePaymentForm])


  const submitButtonIsDisabled = () => {
    return (
      loadingPayments
      ||
      !(
        Object.keys(updatedMediaItemObj).length > 0 
        && 'dataURL' in updatedMediaItemObj 
        && updatedMediaItemObj.dataURL
      )
      ||
      (
        showPayments
        && !(stripePaymentForm.paymentMethodIsValid)
      )
    )
  }

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
                  {previousFeaturedPerson.nameOfFeaturedPerson}
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
            </>
        }
      </Box>
    )
  }

  const resetLoadingAndErrors = () => {
    // console.log('resetLoadingAndErrors')
  }

  // const handleUploadImagePressed = () => {
  //   console.log('resetLoadingAndErrors')
  // }



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

  const createCroppedImage = async () => {

    // Creating the cropped image data url
    const croppedDataURL = await returnCroppedImage(
      updatedMediaItemObj.dataURL,
      updatedMediaItemObj['squareCrop'].x,
      updatedMediaItemObj['squareCrop'].y,
      updatedMediaItemObj['squareCrop'].width,
      updatedMediaItemObj['squareCrop'].height
    )

    // Creating a file from the cropped data url
    const newCroppedFile = await urlToImageFile(croppedDataURL, `crop-congratulations-image-square-${Date.now()}`)
    
    // Shaping the object with the cropped files
    const newMediaObj = { ...updatedMediaItemObj }
    newMediaObj['squareCropDataURL'] = croppedDataURL
    newMediaObj['squareCropFile'] = newCroppedFile
    newMediaObj['file'] = newCroppedFile
    // setUpdatedMediaItemObj({ ...newMediaObj })

    return newMediaObj
  }

  const handleCancelPressed = () => {
    setViewIndex(0)
    setNewFeaturedPerson({
      nameOfFeaturedPerson: '',
      contact: '',
    })
    setUpdatedMediaItemObj({})

    window.scrollTo(0, 0)
  }

  const handleSubmitPressed = async () => {

    setLoadingPayments(true)

    let squareCropFileExists = false
    let paymentProcessed = !showPayments
    let imageUpdated = false
    let databaseUpdated = false

    // Create Cropped Image
    const newMediaObj = await createCroppedImage()
    // console.log('newMediaObj ->', newMediaObj)
    if (
      'squareCropFile' in newMediaObj
      && newMediaObj.squareCropFile.size > 0
    ) {
      squareCropFileExists = true
    }
    console.log('squareCropFileExists ->', squareCropFileExists)
    

    // ? Process Payment
    if (
      showPayments
      && squareCropFileExists
    ) {
      console.log('processing payment')
      try {
        // Stripe — Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit()
        if (submitError) {
          // setRegisterErrors(false)
          setErrorsPayments(submitError)
          setLoadingPayments(false)
          return
        }
        console.log('payment method is valid')
        
        const formToUpload = { ...stripePaymentForm }

        try {
          const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/create-payment-intent-congratulations/`, formToUpload, {
            headers: {
              // Authorization: userIsAuthenticated() ? `Bearer ${getTokenFromLocalStorage()}` : 'Guest',
            },
          })
          console.log('payment intent processed')
          // console.log('data ->', data)
          // console.log('data.clientSecret ->', data.clientSecret)
          // console.log('data.customerId ->', data.customerId)

          const clientSecret = data.clientSecret
          const customerId = data.customerId
          // console.log('elements ->', elements)
          // console.log('cardElement ->', cardElement)
          // console.log('stripe ->', stripe)
    
          const { error: confirmPaymentError } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
              return_url: `${process.env.REACT_APP_CLIENT_URL}/`,
            },
            redirect: 'if_required',
          })
          console.log('payment confirmation occurred')
          // console.log('confirmPaymentError ->', confirmPaymentError)

          if (confirmPaymentError) {
            console.log('confirm payment error')

            setErrorsPayments(confirmPaymentError)
            setLoadingPayments(false)
          } else {
            console.log('payment processed successfully')
            paymentProcessed = true
          }

        } catch (paymentIntentError) {
          console.log('Payment Intent Error ->', paymentIntentError)

          setErrorsPayments({ message: 'Payment Processing Errors' })
          setLoadingPayments(false)
        }

        
      } catch (err) {
        console.log('submit new featured person request error ->', err)

        setErrorsPayments({ message: 'Payment Method Errors' })
        setLoadingPayments(false)
      }
    }

    // ? Update Image
    if (
      paymentProcessed
      && squareCropFileExists
    ) {
      // console.log('updating image')
      // console.log('imageUpdated 1 ->', imageUpdated)

      // Updating the image in AWS
      try {
        const updatedMedia = await updateAWSFileAtURL(newMediaObj)
        imageUpdated = updatedMedia.updateSuccessful
        // console.log('imageUpdated 2 ->', imageUpdated)
      } catch (err) {
        console.log('image update error ->', err)
      }
    }
    // console.log('imageUpdated 3 ->', imageUpdated)


    // ? Update Featured Person in Database
    if (
      paymentProcessed
      && imageUpdated
    ) {
      // console.log('updating featured person in database')

      try {
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/congratulations/${process.env.REACT_APP_FEATURED_PERSON_ID}`, newFeaturedPerson, {
          headers: {
            // Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })

        databaseUpdated = true

      } catch (err) {
        console.log('database update error ->', err)
      }
    }


    if (
      paymentProcessed
      && imageUpdated
      && databaseUpdated
    ) {
      console.log('successfully changed featured person')
      reloadView()
    }


    // setLoadingPayments(false)
  }

  const changeFeaturedPersonViewJSX = () => {

    const handleChangeNewFeaturedPerson = (e) => {
      const { name, value } = e.target

      setNewFeaturedPerson({ ...newFeaturedPerson, [name]: value })
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
                      submitButtonIsDisabled(),
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
      <Footer contact={previousFeaturedPerson.contact} viewIndex={viewIndex}/>
    </>
  )
}

export default Home