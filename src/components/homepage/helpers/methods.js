import { maximumMediaSize } from "../../../helpers/variableDefaults"
import { fileToDataURL, getStartCropImageWidthsAndHeights, updateAWSFileAtURL, returnCroppedImage, urlToImageFile } from '../../../helpers/imageHandling.js'

export const submitButtonIsDisabled = (showPayments, updatedMediaItemObj, stripePaymentForm, loadingPayments) => {
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

export const createCroppedImage = async (updatedMediaItemObj) => {

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

