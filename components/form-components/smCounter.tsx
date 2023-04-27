import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import useLongPress from '../../utils/events/useLongPress';

interface CounterProps {
  count: number,
  setCount: any
}

export default function Counter({
  count = 0,
  setCount = null
} : CounterProps) : JSX.Element {
  const onAddLongClick = () => {
    if(count < 50) {
      setCount(count + 1)
    }
  }
  const onAddClick = () => {
    if(count < 50) {
      setCount(count + 1)
    }
  }
  const onSubClick = () => {
    console.log('called');
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
        bgcolor="var(--red-hard-500)"
        {...useLongPress(onSubClick, onSubClick, defaultOptions)}
        sx={{
          width: "2rem",
          height: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Typography
          fontSize="2rem"
          fontFamily="bulky pixels"
          letterSpacing="-0.6rem"
        >-</Typography>
      </Box>
      <Typography
        fontSize="2rem"
        fontFamily="Montserrat"
        paddingX={1}
        >{count}</Typography>
      <Box
        bgcolor="var(--green-hard-500)"
        {...useLongPress(onAddLongClick, onAddClick, defaultOptions)}
        sx={{
          width: "2rem",
          height: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Typography
          fontSize="2rem"
          fontFamily="bulky pixels"
          letterSpacing="-0.6rem"
        >+</Typography>
      </Box>
    </div>
  )
}