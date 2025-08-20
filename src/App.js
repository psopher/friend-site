/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route } from 'react-router-dom' //Router components

// Import Components
import Layout from './components/common/Layout'
import ScrollToTop from './components/common/ScrollToTop'
import NotFound from './components/common/NotFound'
import Home from './components/homepage/Home'

//MUI
import getDesignTokens from './helpers/theme.js' //MUI theming presets
import { createTheme, ThemeProvider } from '@mui/material/styles' //MUI theme creator functions/components
import Box from '@mui/material/Box'
import { priceForChange } from './helpers/variableDefaults.js'

// Stripe
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY)

const App = () => {
  // Helmet Context
  const helmetContext = {}

  // Stripe Options
  const [stripePaymentForm, setStripePaymentForm] = useState({
    amount: priceForChange * 100,
    currency: 'usd',
    mode: 'payment',
  })

  return (
    // HelmetProvider must go around everything in order to use dynamic helmets
    <HelmetProvider context={helmetContext}>
      
      {/* Wrap everything in the theme so that these presets cascade down */}
      <ThemeProvider theme={createTheme(getDesignTokens())}>

        {/* The 'wrapper-box' id is referenced in main.scss for global variables that cascade down */}
        <Box id='wrapper-box' bgcolor='background.default' color='text.primary'>
          
          {/* All the routes must be set inside the Browser Router */}
          <BrowserRouter>

            {/* Scroll to top automatically every time route changes */}
            <ScrollToTop />

            {/* Stripe Elements */}
            <Elements options={stripePaymentForm} stripe={stripePromise}>
                
              {/* The Website */}
              <Routes>

                {/* No Navbar Routes */}

                {/* Navbar In "Layout"; Navbar only appears for routes that are children of this Route */}
                <Route element={<Layout />}> 

                  {/* Homepage */}
                  <Route path="/" element={<Home stripePaymentForm={stripePaymentForm} setStripePaymentForm={setStripePaymentForm} />} />

                  {/* Not Found; this path matches any path specified, so it needs to come last */}
                  <Route path="*" element={<NotFound />} />

                </Route>

              </Routes>
            
            </Elements>
                
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
