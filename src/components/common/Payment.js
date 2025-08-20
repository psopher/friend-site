/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'


import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { navbarHeight, footerHeight, priceForChange } from '../../helpers/variableDefaults'
import { standardButton } from '../../helpers/buttons'
import { standardErrorContainer } from '../../helpers/errors'
import { circularSpinnerWithText } from '../../helpers/spinners'
import useWindowDimensions from '../../helpers/windowDimensions'
import { advisoryTypography } from '../../helpers/typographies'
import { handleChange } from '../../helpers/globalHelpers'

// import { seoPageTags, customAnalyticsEvent } from '../../helpers/analytics'

// Stripe
import { PaymentElement } from '@stripe/react-stripe-js'

// VC Sim Payment
const Payment = (props) => {

  // Window Dimensions
  const { height, width } = useWindowDimensions()

  const { stripePaymentForm, setStripePaymentForm, stripe, elements, loadingPayments, setLoadingPayments } = props


  // Payment States
  const [paymentMethodString, setPaymentMethodString] = useState('card')

  // Loading
  // const [loadingPayment, setLoadingPayment] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  // const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(false)
  const [paymentErrors, setPaymentErrors] = useState({ })
  const [errorsSubmit, setErrorsSubmit] = useState(false)

  const [submitSuccessful, setSubmitSuccessful] = useState(false)

  useEffect(() => {
    // console.log('value ->', value)
  }, [paymentMethodString, loadingSubmit, paymentErrors, errorsSubmit])

  const handlePaymentElementChange = (e) => {
    // console.log('handlePaymentElementChange runs')
    // console.log('handlePaymentElementChange event ->', e)

    // setPaymentErrors({ message: 'testing' })
    setPaymentErrors({ })

    console.log('e.complete ->', e.complete)

    if ('value' in e && 'type' in e.value && e.value.type !== paymentMethodString) {
      
      setPaymentMethodString(e.value.type)
    }

    if (
      !('paymentMethodIsValid' in stripePaymentForm)
      ||
      (
        'paymentMethodIsValid' in stripePaymentForm
        && e.complete !== stripePaymentForm.paymentMethodIsValid
      )
    ) {

      setStripePaymentForm({ ...stripePaymentForm, paymentMethodIsValid: e.complete })

    } 
  }

  const paymentDetailsJSX = (PaymentElement, paymentMethodString, handlePaymentElementChange, stripePaymentForm, setStripePaymentForm, paymentErrors, setPaymentErrors, loadingPayment) => {
    console.log('stripePaymentForm amount ->', stripePaymentForm.amount)
    return (
      <Box
        sx={{
          mt: 1, mb: 0,
          pt: 2, pb: paymentMethodString === 'card' ? 3 : 2,
          backgroundColor: 'lightyellow',
          width: '100%',
          boxShadow: 3,
          borderRadius: '5px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: '18',
          }}
        >
          Payment Method
        </Typography>

        {/* Card Information */}
        <Box 
          sx={{ 
            width: '95%',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', flexDirection: 'column',
            }}
          >

            <PaymentElement 
              onChange={(e) => handlePaymentElementChange(e)} 
              options={{
                // paymentMethodOrder: ['apple_pay', 'google_pay'],
                terms: {
                  googlePay: 'never',
                  applePay: 'never',
                  card: 'never',
                },
              }}
            />


            {(paymentMethodString === 'card') &&
              <>
                {/* Cardholder Name */}
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: '15px',
                    fontWeight: 400,
                    color: '#36454F',
                  }}
                >
                  Cardholder Name
                </Typography>

                <TextField
                  focused={false}
                  size={'small'}
                  name={'cardholderName'}
                  value={stripePaymentForm.cardholderName}
                  onChange={(e) => handleChange(e, setPaymentErrors, setStripePaymentForm, stripePaymentForm)}
                  sx={{
                    // mb: 1.5,
                    backgroundColor: 'white',
                  }}
                />
              </>
            }


            {/* Promo Code */}
            {/* <Typography
              sx={{
                mt: 1.5,
                fontSize: '15px',
                fontWeight: 400,
                color: '#36454F',
              }}
            >
              Promo Code
            </Typography>

            <TextField
              focused={false}
              size={'small'}
              name={'promoCode'}
              value={stripePaymentForm.promoCode}
              onChange={(e) => handleChange(e, setPaymentErrors, setStripePaymentForm, stripePaymentForm)}
              sx={{
                // mb: 1.5,
                backgroundColor: 'white',
              }}
            /> */}


            {/* Payment Error */}
            {/* {console.log('paymentErrors ->', paymentErrors)} */}
            {Object.keys(paymentErrors).length > 0 &&
              standardErrorContainer(
                `${paymentErrors.hasOwnProperty('message') ? paymentErrors.message : 'Could not process payment. Try again with a different card.'}`,
                0,
                0
              )
            }
      
            {loadingPayment &&
              <Box
                sx={{
                  width: '100%',
                  minHeight: '100px',
                  height: '100px',
                  maxHeight: '100px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {circularSpinnerWithText()}
              </Box>
            }

            {loadingPayment && 
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
                
                {
                  `*Payment Processing 
                  *Do not refresh or exit page`.replace(/ {4} +/g, '')
                }
                  
              </Typography>
            }
          </Box> 
        </Box>
      </Box>
    )
  }

  const summaryJSX = () => {
    return (
      <Box
        sx={{
          my: 1,
          p: 2,
          backgroundColor: 'lightyellow',
          width: '100%',
          boxShadow: 3,
          borderRadius: '5px',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
        }}
      >
        {/* Title, Advisory */}
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '18',
          }}
        >
          Summary
        </Typography>

        {/* Payment Summary (Product Purchased, Price) */}
        <Box
          sx={{
            my: 1,
            p: 2,
            width: '90%',
            maxWidth: '300px',
            backgroundColor: 'white',
            borderRadius: 3,
            border: 2,
            borderColor: 'black',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <Typography>
              {`Change Featured Person`}
            </Typography>
            <Typography>
              {/* TK */}
              {
                `$${priceForChange}`
              }
            </Typography>
          </Box>

        </Box>
      </Box>
    )
  }

  return (
    <>
      {/* Helmet — for analytics, seo, and page title changing */}
      {/* {seoPageTags(
        'Simulation Payment'
      )} */}

      {/* Body */}
      <Box 
        sx={{ 
          // height: `calc(100vh - ${navbarHeight} - ${footerHeight})`, 
          // height: '100vh',
          // backgroundColor: 'pink',
          width: '100%', 
          mt: 0,
          mb: 0,
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', 
        }}
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: '290px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', 
          }}
        >
          {/* Title  */}
          {/* <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '18',
            }}
          >
            Payment
          </Typography> */}
          {/* {advisoryTypography(
            `Viewing results costs $${priceForChange}`
          )} */}

          {/* Summary */}
          {summaryJSX()}

          {/* Payment Details */}
          {paymentDetailsJSX(PaymentElement, paymentMethodString, handlePaymentElementChange, stripePaymentForm, setStripePaymentForm, paymentErrors, setPaymentErrors, loadingPayments)}

          
        </Box>
      </Box>
    </>
  )
}

export default Payment