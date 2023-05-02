import { useState } from "react"
import { Box, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Counter from "../form-components/smCounter";

interface PreviewCardLineProps {
  itemName: string
  deleteItem: () => void
  count: number
  setCount: (count: number) => void
}

export default function PreviewCardLine({
  itemName,
  deleteItem,
  count,
  setCount,
}: PreviewCardLineProps) : JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
      <Typography
        fontFamily="Montserrat">
        {itemName}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Counter count={count} setCount={c => setCount(c)} />
        <IconButton
          sx={{ color: "var(--foreground-rgb)" }}
          onClick={deleteItem}>
          <DeleteOutlineIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  )
}