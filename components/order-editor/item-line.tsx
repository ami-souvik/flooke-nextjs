import { Box, Typography } from "@mui/material";

interface ItemLineProps {
  itemName: string,
  price: number
}

export default function ItemLine({
  itemName,
  price
}: ItemLineProps) : JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px",
        borderColor: "var(--gray-subtle-500)",
        borderStyle: "solid",
        borderLeftWidth: "0px",
        borderRightWidth: "0px",
        borderTopWidth:"0.5px",
        borderBottomWidth:"0.5px"
      }}>
      <Typography
        fontFamily="Montserrat">
        {itemName}
      </Typography>
      <Typography
        fontFamily="Montserrat">
        {price}
      </Typography>
    </Box>
  )
}