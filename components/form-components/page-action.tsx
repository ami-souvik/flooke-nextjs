import { Box, Button } from "@mui/material";

export const IEPageAction = ({ handleFile, clickAction }) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    padding="12px"
    bgcolor="var(--white-X00)"
    >
    <Button
      variant="outlined"
      onClick={clickAction}>
      Add Item
    </Button>
  </Box>
)

export const OPageAction = ({ clickAction }) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    padding="12px"
    bgcolor="var(--white-X00)"
    >
    <Button
      variant="outlined"
      onClick={clickAction}>
      Add Order
    </Button>
  </Box>
)