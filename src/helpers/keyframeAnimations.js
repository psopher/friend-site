
import { keyframes } from '@mui/system'


export const spin = (startDegrees = 0, endDegrees = 360) => {
  
  return keyframes`
    from {
      transform: rotate(${startDegrees}deg);
    }
    to {
      transform: rotate(${endDegrees}deg);
    }
  `
}

export const rock = (degreesStart = 0, degrees25Percent = 10, degrees75Percent = -10, degreesEnd = 0) => {
  return keyframes`
    0% {
      transform: rotate(${degreesStart}deg);
    }
    25% {
      transform: rotate(${degrees25Percent}deg);
    }
    75% {
      transform: rotate(${degrees75Percent}deg);
    }
    100% {
      transform: rotate(${degreesEnd}deg);
    }
  `
}

export const shakeX = (xStartPX = 0, x25PercentPX = -10, x75PercentPX = 10, xEndPX = 0) => {
  return keyframes`
    0% {
      transform: translateX(${xStartPX}px);
    }
    25% {
      transform: translateX(${x25PercentPX}px);
    }
    75% {
      transform: translateX(${x75PercentPX}px);
    }
    100% {
      transform: translateX(${xEndPX}px);
    }
  `
}

export const shakeY = (yStartPX = 0, y25PercentPX = 6, y75PercentPX = -6, yEndPX = 0) => {
  return keyframes`
    0% {
      transform: translateY(${yStartPX}px);
    }
    25% {
      transform: translateY(${y25PercentPX}px);
    }
    75% {
      transform: translateY(${y75PercentPX}px);
    }
    100% {
      transform: translateY(${yEndPX}px);
    }
  `
}