import { Typography } from "@mui/material"

export default function Header({ label }) : JSX.Element{
  return (
    <Typography
      fontSize="2rem"
      fontFamily="judera flat"
      textTransform="uppercase"
    >{label}</Typography>
  )
}