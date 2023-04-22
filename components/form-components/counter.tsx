import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { Box, Typography } from '@mui/material';

interface CounterProps {
  count: number,
  setCount: any
}

export default function Counter({
  count = 0,
  setCount = null
} : CounterProps) : JSX.Element {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Box
        bgcolor="#000000"
        onClick={() => {
          if(count > 0) {
            setCount(count - 1)
          }
        }}
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