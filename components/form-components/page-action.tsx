import { Box, Button } from "@mui/material";

const PageAction = ({ label, clickAction }) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    padding="12px"
    bgcolor="var(--white-X00)"
    >
    <Button
      variant="outlined"
      onClick={clickAction}>
      {label}
    </Button>
  </Box>
)

export default PageAction;