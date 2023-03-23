import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';

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
      <IconButton
        onClick={() => {
          if(count >= 0) {
            setCount(count - 1)
          }
        }}
        aria-label="increase" 
        size="large"
        style={{ backgroundColor: 'white' }}>
        <ArrowBackIcon fontSize="inherit"/>
      </IconButton>
      <h1 style={{ padding: '0px 20px' }}>{count}</h1>
      <IconButton
        onClick={() => {
          if(count <= 50) {
            setCount(count + 1)
          }
        }}
        aria-label="decrease"
        size="large"
        style={{ backgroundColor: 'white' }}>
        <ArrowForwardSharpIcon fontSize="inherit" />
      </IconButton>
    </div>
  )
}