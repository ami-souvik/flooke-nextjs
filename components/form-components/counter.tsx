import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { Box, Typography } from '@mui/material';
import useLongPress from '../../utils/events/useLongPress';

interface CounterProps {
  count: number,
  setCount: any
}

export default function Counter({
  count = 0,
  setCount = null
} : CounterProps) : JSX.Element {
  const onAddLongPress = () => {
    if(count < 50) {
      setCount(count + 1)
    }
  };
  const onAddClick = () => {
    if(count < 50) {
      setCount(count + 1)
    }
  }
  const onSubLongPress = () => {
    if(count > 0) {
      setCount(count - 1)
    }
  };
  const onSubClick = () => {
    if(count > 0) {
      setCount(count - 1)
    }
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Box
        bgcolor="#000000"
        onClick={() => {
          if(count > 0) {
            setCount(count - 1)
          }
        }}
        {...useLongPress(onSubLongPress, onSubClick, defaultOptions)}
        sx={{
          width: "3rem",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Typography
          fontSize="3rem"
          fontFamily="bulky pixels"
          letterSpacing="-0.6rem"
        >-</Typography>
      </Box>
      <Typography
        color="black"
        fontSize="3rem"
        fontFamily="bulky pixels"
        letterSpacing="-0.6rem"
        ml="0.2rem"
        mb="-0.5rem"
        >{count}</Typography>
      <Box
        bgcolor="#000000"
        onClick={() => {
          if(count < 50) {
            setCount(count + 1)
          }
        }}
        {...useLongPress(onAddLongPress, onAddClick, defaultOptions)}
        sx={{
          width: "3rem",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Typography
          fontSize="3rem"
          fontFamily="bulky pixels"
          letterSpacing="-0.6rem"
        >+</Typography>
      </Box>
    </div>
  )
}