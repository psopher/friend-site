// React
import React, { useState } from 'react'

// Axios
import axios from 'axios'

import { uploadImageDimension, maximumMediaSize } from './variableDefaults'

// AWS Requirement — Needs to be here to prevent weird errors
window.Buffer = window.Buffer || require('buffer').Buffer


// input url string, return image file
export const urlToImageFile = async (urlString, fileName = 'image.jpg') => {
  var response = await fetch(urlString)
  var data = await response.blob()
  var metadata = {
    type: 'image/jpeg',
  }
  var file = new File([data], fileName, metadata)
  return file
}

// Input image blob, return file
export const blobImageToFile = async (blobString, fileName = 'image.jpg') => {
  
  var metadata = {
    type: 'image/jpeg',
  }
  var file = new File([blobString], fileName, metadata)
  return file
}

// to call this function: await fileToDataURL(file) — because a Promise returned, 'await' is required
// Input file, return dataURL; Accepts Images and Videos
export const fileToDataURL = async (file) => {

  return new Promise((resolve, reject) => {
    
    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        resolve(reader.result)
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(file)
  })
}

// Input Data URL, return blob
function dataURItoBlob(dataURI) {
  
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1])
  else
    byteString = unescape(dataURI.split(',')[1])

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

// The start crop widths and heights for an Image, from its dataURL
export const getStartCropImageWidthsAndHeights = async (dataURL) => {
  return new Promise((resolve, reject) => {

    var img = new Image()

    img.onload = function() {
      const squareImageDimension = img.width < img.height ? img.width : img.height
      const portraitImageWidth = img.height > ((4 / 3) * img.width) ? img.width : (.75 * img.height)
      const portraitImageHeight = img.height > ((4 / 3) * img.width) ? ((4 / 3) * img.width) : img.height
      resolve({
        squareImageWidth: squareImageDimension,
        squareImageHeight: squareImageDimension,
        portraitImageWidth: portraitImageWidth,
        portraitImageHeight: portraitImageHeight,
      })
    }
    img.src = dataURL

  })
}

// Return Data URL from Image with Given Crop Dimensions
// Used for react-easy-crop image cropping
export const returnCroppedImage = async (originalDataURL, cropX, cropY, cropWidth, cropHeight) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = originalDataURL

    img.onload = async function() {
      // crop image
      const canvasCrop = document.createElement('canvas')
      canvasCrop.height = cropHeight
      canvasCrop.width = cropWidth
      const contextCrop = canvasCrop.getContext('2d', { alpha: false })

      contextCrop.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

      // Convert the square image to a data url
      const croppedImageURL = canvasCrop.toDataURL('image/jpg', 1)

      // console.log('squareCropImageURL ->', squareCropImageURL)

      // Resize Image
      if (cropWidth > uploadImageDimension) {

        const imgResize = new Image()
        imgResize.src = croppedImageURL

        imgResize.onload = async function() {
          const canvasResize = document.createElement('canvas')
          canvasResize.width = uploadImageDimension
          canvasResize.height = Math.round(imgResize.height * (uploadImageDimension / imgResize.width))

          const contextResize = canvasResize.getContext('2d', { alpha: false })
          contextResize.drawImage(imgResize, 0, 0, canvasResize.width, canvasResize.height)

          // Convert the resized image to a data url
          const resizedImageURL = canvasResize.toDataURL('image/jpg', 1)

          // Return the resized Image
          resolve(resizedImageURL)
        }
      } else {
        resolve(croppedImageURL)
      }
    }
  })
}


// Center and crop an image into a 512x512 jpg square; 
// Return the image
export const returnSquareImage = async (file) => {

  return new Promise((resolve, reject) => {
    // Give the selected image a blob URL
    const urlString = URL.createObjectURL(file)
    // console.log('urlString ->', urlString)
    const img = new Image()
    img.src = urlString


    img.onload = async function() {
      const canvasResize = document.createElement('canvas')

      const imageResizeDimension = uploadImageDimension
      const aspectRatio = img.width / img.height

      if (aspectRatio < 1) {
        canvasResize.width = imageResizeDimension
        canvasResize.height = ~~(img.height * (imageResizeDimension / img.width))
      } else if (aspectRatio > 1) {
        canvasResize.width = ~~(img.width * (imageResizeDimension / img.height))
        canvasResize.height = imageResizeDimension
      } else {
        canvasResize.width = imageResizeDimension
        canvasResize.height = imageResizeDimension
      }
      const context = canvasResize.getContext('2d', { alpha: false })
      context.drawImage(img, 0, 0, canvasResize.width, canvasResize.height)

      // Convert the square image to a data url
      const resizedImageURL = canvasResize.toDataURL('image/jpg', 1)

      // Convert the data url to an image that can be cropped
      const resizedImageObjectURL = dataURItoBlob(resizedImageURL)
      const urlCropString = URL.createObjectURL(resizedImageObjectURL)
      const imgCrop = new Image()
      imgCrop.src = urlCropString

      // Crop the image onload
      imgCrop.onload = async function() {
    
        // crop image
        if (aspectRatio !== 1) {
          const canvasCrop = document.createElement('canvas')
          canvasCrop.height = imageResizeDimension
          canvasCrop.width = imageResizeDimension
          const contextCrop = canvasCrop.getContext('2d', { alpha: false })
    
          let startX
          let startY
          if (aspectRatio < 1) {
            startX = 0
            startY = (imgCrop.height - imageResizeDimension) / 2
          } else if (aspectRatio > 1) {
            startX = (imgCrop.width - imageResizeDimension) / 2
            startY = 0
          }
      
          contextCrop.drawImage(imgCrop, startX, startY, imageResizeDimension, imageResizeDimension, 0, 0, imageResizeDimension, imageResizeDimension)
    
          // Convert the square image to a data url
          const squareCropImageURL = canvasCrop.toDataURL('image/jpg', 1)

          // console.log('squareCropImageURL ->', squareCropImageURL)
          resolve(squareCropImageURL)
        } else {

          // console.log('resizedImageURL ->', resizedImageURL)
          resolve(resizedImageURL)
        }
      }
    }
  })
}

export const updateAWSFileAtURL = async (updatedMediaItemObj) => {

  if (
    // updatedMediaItemObj.file.size <= maximumCroppedMediaSize
    // updatedMediaItemObj.squareCropFile.size <= maximumMediaSize
    updatedMediaItemObj.squareCropFile.size > 0
  ) {
    try {
      const formData = new FormData()
      // formData.append('mediaFile', updatedMediaItemObj.file)
      formData.append('mediaFile', updatedMediaItemObj.squareCropFile)
      // console.log('formData ->', formData)

      // Upload data to server, retrieve a reserved image URL from the AWS S3 bucket
      // const { data } = await axios.put(`/api/awsImageURL`, requestObject, {
      console.log(process.env.REACT_APP_SERVER_URL)
      console.log(`${process.env.REACT_APP_SERVER_URL}/api/aws-update-image`)
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/aws-update-image`, formData, {
        headers: {
          // Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('data ->', data)

      return data

    } catch (error) {
      // console.log(error)
      return { updateSuccessful: false } //Don't change this name because it is used elsewhere in the code
    }
  } else {
    return { updateSuccessful: false } //Don't change this name because it is used elsewhere in the code
  }
}