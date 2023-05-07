import { Box, Button, Typography } from "@mui/material";

export const IEPageAction = ({ handleFile, clickAction }) => (
  <Box
    position="absolute"
    bottom="0px"
    display="flex"
    justifyContent="flex-end"
    padding="12px"
    bgcolor="var(--gray-hard-500)"
    >
    <Box
      position="relative"
      display="flex"
      onClick={clickAction}>
      <Typography
        fontFamily="Noto Serif TC, serif"
        fontSize="1rem"
        color="var(--white-X00)"
      >item</Typography>
      <Typography
        fontFamily="Noto Serif TC, serif"
        fontSize="1rem"
        color="var(--white-X00)"
      >+</Typography>
    </Box>
  </Box>
)

export const OPageAction = ({ clickAction }) => (
  <Box
    width="100%"
    position="absolute"
    bottom="0px"
    display="flex"
    justifyContent="flex-end"
    alignItems="flex-end"
    padding="0px 12px">
    <Box
      display="flex"
      padding="12px 16px 16px 12px"
      bgcolor="var(--gray-hard-500)">
      <Box
        position="relative"
        display="flex"
        onClick={clickAction}>
        <Typography
          fontFamily="Noto Serif TC, serif"
          fontSize="1rem"
          color="var(--white-X00)"
        >order</Typography>
        <Typography
          position="absolute"
          top="2px"
          right="-8px"
          fontFamily="Noto Serif TC, serif"
          fontSize="1rem"
          lineHeight="0"
          color="var(--white-X00)"
        >+</Typography>
      </Box>
    </Box>
  </Box>
)