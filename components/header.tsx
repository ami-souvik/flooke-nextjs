import { Box, Button, Typography } from "@mui/material"
import { goBack, closeFullscreen } from "../utils/helperUtils";
import GoBack from "./ui-components/backButton";

export default function Header({ label }) : JSX.Element{
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="0px 12px"
      borderBottom="1px solid #DDD">
      <Typography
        fontSize="2rem"
        fontFamily="DM Sans"
        textTransform="uppercase"
      >{label}</Typography>
      <GoBack handleClick={goBack} />
    </Box>
  )
}