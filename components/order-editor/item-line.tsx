import { Box, Typography } from "@mui/material";

type ClickFunction = () => void;

interface ItemLineProps {
  itemName: string,
  price: number,
  clickHandle: ClickFunction
}

export default function ItemLine({
  itemName,
  price,
  clickHandle
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
      }}
      onClick={clickHandle}>
      <Typography
        fontFamily="Comme, sans-serif"
        fontSize="0.8rem">
        {itemName}
      </Typography>
      <Typography
        fontFamily="Comme, sans-serif">
        {price}
      </Typography>
    </Box>
  )
}