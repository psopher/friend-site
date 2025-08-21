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


// Helpers
import { showPayments, featuredDefaultsArray, positionChangeWidthSm, positionChangeWidthMd, navbarHeight, maximumMediaSize, footerHeight, pjsBlue, pjsGreen, pjsYellow } from '../../helpers/variableDefaults.js'
import useWindowDimensions from '../../helpers/windowDimensions.js'
import { reloadView, shuffleArray, dateIsWithin24Hours, createRandomNumber } from '../../helpers/globalHelpers.js'
import { spin, rock, shakeX, shakeY } from '../../helpers/keyframeAnimations.js'
import { fileToDataURL, getStartCropImageWidthsAndHeights, updateAWSFileAtURL, returnCroppedImage, urlToImageFile } from '../../helpers/imageHandling.js'
import { circularSpinnerWithText } from '../../helpers/spinners.js'

import { createCroppedImage } from './helpers/methods.js'
import { homepageBodyJSX, changeFeaturedPersonViewJSX } from './helpers/jsx.js'

// Stripe
import { useStripe, useElements } from '@stripe/react-stripe-js'

// import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics.js'

// Home Page
const Home = (props) => {

  const { stripePaymentForm, setStripePaymentForm } = props

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

          const randomNumber = createRandomNumber()
          const cacheAvoidingURL = `${retrievedFeaturedPersonsArray[0].image}?${randomNumber}`
          
          setPreviousFeaturedPerson({ ...retrievedFeaturedPersonsArray[0], image: cacheAvoidingURL })

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


  const resetLoadingAndErrors = () => {
    // console.log('resetLoadingAndErrors')
    setLoading(false)
    setLoadingPayments(false)

    setErrors(false)
    setErrorsPayments(false)
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

    // ? Create Cropped Image
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
      {viewIndex === 0 && homepageBodyJSX(previousFeaturedPerson, loading, width)}

      {/* Change Featured Person View */}
      {viewIndex === 1 && 
        changeFeaturedPersonViewJSX(
          newFeaturedPerson, setNewFeaturedPerson, 
          updatedMediaItemObj, setUpdatedMediaItemObj, 
          stripePaymentForm, setStripePaymentForm, stripe, elements, 
          handleCancelPressed, handleSubmitPressed, 
          loadingPayments, setLoadingPayments, 
          loading, resetLoadingAndErrors, 
          width
        )
      }

      {/* Footer */}
      <Footer contact={previousFeaturedPerson.contact} viewIndex={viewIndex}/>
    </>
  )
}

export default Home