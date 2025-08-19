import { Outlet } from 'react-router-dom'
import PageNavbar from './PageNavbar'
import Footer from './Footer'

//mui
import Box from '@mui/material/Box'

import useWindowDimensions from '../../helpers/windowDimensions'
import { positionChangeWidthSm } from '../../helpers/variableDefaults'

// So that the navbar can be an element of a Route, which means it will only appear above components that are children of the root where it is an element
const Layout = () => {
  return (
    <>
      {/* <PageNavbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default Layout