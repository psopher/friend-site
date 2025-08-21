import { yellow, grey, green, blue, cyan, pink   } from '@mui/material/colors'

const getDesignTokens = () => ({
  palette: {
    // primary: pink,
    primary: green,
    secondary: blue,
    warning: yellow,
    text: {
      primary: grey[900],
      secondary: grey[900],
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Lato, Saira, Oxygen, Raleway, Arial, Londrina Shadow, Sirin Stencil, Bungee Shade, Caveat, Satisfy',
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h1',
          h3: 'h1',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'p',
          subtitle2: 'p',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
})

export default getDesignTokens