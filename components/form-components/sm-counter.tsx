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
  const onAddClick = () => {
    if(count < 50) {
      setCount(count + 1)
    }
  }
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
        bgcolor="var(--primary-yellow)"
        onClick={onSubClick}
        sx={{
          width: "1.6rem",
          height: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Typography
          fontSize="1.6rem"
          fontFamily="Comme, sans-serif"
          color="var(--gray-hard-500)"
        >-</Typography>
      </Box>
      <Typography
        fontSize="1.6rem"
        fontFamily="Comme, sans-serif"
        paddingX="2px"
        >{count}</Typography>
      <Box
        bgcolor="var(--primary-yellow)"
        onClick={onAddClick}
        sx={{
          width: "1.6rem",
          height: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Typography
          fontSize="1.6rem"
          fontFamily="Comme, sans-serif"
          color="var(--gray-hard-500)"
        >+</Typography>
      </Box>
    </div>
  )
}