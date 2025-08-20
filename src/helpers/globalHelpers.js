
import Box from '@mui/material/Box'

import { styled } from '@mui/material/styles'

// Increment index by one 
export const incrementIndex = (index, setIndex) => {
  const newIndex = index + 1
  setIndex(newIndex)
}

// Decrement index by one 
export const decrementIndex = (index, setIndex) => {
  const newIndex = index - 1
  setIndex(newIndex)
}

// Reload View
export const reloadView = () => {
  window.location.reload()
}

// Input Element
export const Input = styled('input')({
  display: 'none',
}) 

// Dummy Box for Spacing
export const dummyBox = (height = '0px') => {
  return (
    <Box sx={{ height: height }}></Box>
  )
}

// Dummy Box for Spacing
export const dummyBoxWidth = (width = '0px') => {
  return (
    <Box sx={{ minWidth: width }}></Box>
  )
}

export const isNumeric = (str) => {
  return /^\d+$/.test(str)
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const spacesRemovedFromString = (str) => {
  return str.replace(/\s+/g, '')
}

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value)
}

export const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

// Check if it's a valid email address
export const validEmail = (email) => {
  return email && email.includes('@') && email.includes('.') && email.charAt(email.length - 1) !== '@' && email.charAt(email.length - 1) !== '.' && email.charAt(email.length - 2) !== '@' && email.charAt(email.length - 2) !== '.' && email.charAt(0) !== '@' && email.charAt(0) !== '.' && !email.includes(' ')
}

// Handles basic form input changes
export const handleChange = (e, setErrors, setFormData, formData) => {
  const { name, value } = e.target
  // console.log('name ->', name)
  // console.log('value ->', value)

  setErrors(false)
  setFormData({ ...formData, [name]: (name === 'email' || name === 'emailOfTaker') ? value.toLowerCase() : name === 'entityName' && value[0] === ' ' ? value.trim() : value })
  
}

export const removeDuplicatesFromArray = (array) => {
  return [...new Set(array)]
}

export const noDuplicatesInArray = (array) => {
  return array.length === removeDuplicatesFromArray(array).length
}



// One day ago
export const oneDayAgo = () => {
  const oneDayAgo = Date.parse(new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24 * 1))
  return oneDayAgo
}

export const oneMinuteAgo = () => {
  const oneDayAgo = Date.parse(new Date((new Date()).valueOf() - 1000 * 60 * 1))
  return oneDayAgo
}

export const dateToNumber = (dateString) => {
  return Date.parse(dateString)
}

export const dateIsWithin24Hours = (dateString) => {
  // console.log('dateString ->', dateString)

  const dateNumber = dateToNumber(dateString)
  // console.log('dateNumber ->', dateNumber)

  const oneDayAgoNumber = oneDayAgo()
  // console.log('oneDayAgoNumber ->', oneDayAgoNumber)

  return dateNumber > oneDayAgoNumber
}
