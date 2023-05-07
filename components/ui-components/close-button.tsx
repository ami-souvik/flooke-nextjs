import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

const CloseButton = ({ handleClose }) => (
  <Box
    sx={{
      display: "flex",
      cursor: "pointer",
      userSelect: "none"
    }}
    onClick={handleClose}>
    <Typography
      fontFamily="Rand">
      <strong>Close</strong>
    </Typography>
    <CloseIcon />
  </Box>
)

export default CloseButton;