// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Hook Import

const ReactHotToast = styled(Box)(({ theme }) => {
  // ** Hook & Var
  
  return {
    '& > div': {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      zIndex: `${theme.zIndex.drawer - 1} !important`,
      top: '75px !important'
    },
    '& .react-hot-toast': {
      fontWeight: 400,
      fontSize: '1rem',
      letterSpacing: '0.14px',
      boxShadow: theme.shadows[4],
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.background.paper,
      '&>:first-of-type:not([role])>:first-of-type': {
        width: 14,
        height: 14
      }
    }
  }
})

export default ReactHotToast
