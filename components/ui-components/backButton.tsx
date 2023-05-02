import { Box, Typography } from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

const GoBack = ({ handleClick }) => (
  <Box
    sx={{
      display: "flex",
      cursor: "pointer",
      userSelect: "none",
      padding: "12px 0px"
    }}
    onClick={handleClick}>
    <ChevronLeftOutlinedIcon />
    <Typography
      fontFamily="DM Sans">
      <strong>BACK</strong>
    </Typography>
  </Box>
)

export default GoBack;