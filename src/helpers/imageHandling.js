// React
import React, { useState } from 'react'

// Axios
import axios from 'axios'

export const updateAWSFileAtURL = async (updatedMediaItemObj) => {

  if (
    // updatedMediaItemObj.file.size <= maximumCroppedMediaSize
    updatedMediaItemObj.file.size <= 10000000
  ) {
    try {
      const formData = new FormData()
      formData.append('mediaFile', updatedMediaItemObj.file)
      // console.log('formData ->', formData)

      // Upload data to server, retrieve a reserved image URL from the AWS S3 bucket
      // const { data } = await axios.put(`/api/awsImageURL`, requestObject, {
      const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/aws-update-image`, formData, {
        headers: {
          // Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      // console.log('data ->', data)

      return data

    } catch (error) {
      // console.log(error)
      return { updateSuccessful: false } //Don't change this name because it is used elsewhere in the code
    }
  } else {
    return { updateSuccessful: false } //Don't change this name because it is used elsewhere in the code
  }
}