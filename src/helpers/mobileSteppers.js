
import MobileStepper from '@mui/material/MobileStepper'

import Box from '@mui/material/Box'

import { positionChangeWidthSm, ministepsHeight } from './variableDefaults'


// Standardized mobile stepper used in wrap and unwrap views
export const mobileStepperElement = (activeStep, steps, activeStepColor) => {
  return (
    <MobileStepper
      variant="dots"
      steps={steps}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, mb: 2, mt: 2, 
        bgcolor: 'transparent', 
        // color: activeStepColor, 
        // '& .MuiMobileStepper-dots': {
        //   color: 'darkgray',
        // },
        '& .MuiMobileStepper-dot': {
          backgroundColor: 'darkgray',
        },
        '& .MuiMobileStepper-dotActive': {
          backgroundColor: activeStepColor,
        },
      }}
    />
  )
}

// Mobile stepper and arrows for some of the wrap views at some widths
export const portfolioItemsMobileStepperAndArrows = (width, miniStep, totalSteps, backArrow, forwardArrow, activeStepColor) => {
  return (
    <Box
      sx={{
        height: ministepsHeight,
        width: '100%',
        mb: 2, mt: 2,
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
      }}
    >
      {
        width < positionChangeWidthSm && 
        backArrow
      }
      {mobileStepperElement(miniStep, totalSteps, activeStepColor)}
      {
        width < positionChangeWidthSm && 
        forwardArrow
      }

    </Box>
  )
}