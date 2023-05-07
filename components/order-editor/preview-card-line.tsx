import { useState } from "react"
import { Box, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Counter from "../form-components/smCounter";

interface PreviewCardLineProps {
  added: boolean
  updated: boolean
  deleted: boolean
  itemName: string
  deleteItem: () => void
  count: number
  setCount: (count: number) => void
}

export default function PreviewCardLine({
  added,
  updated,
  deleted,
  itemName,
  deleteItem,
  count,
  setCount,
}: PreviewCardLineProps) : JSX.Element {
  const backgroundColor =
    added ? "var(--green-subtle-400)" :
    updated ? "var(--yellow-subtle-200)" :
    deleted ? "var(--red-subtle-500)" : "transparent";
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor
      }}>
      <Typography
        fontFamily="Comme, sans-serif"
        fontSize="0.8rem"
        padding="0px 4px">
        {itemName}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Counter count={count} setCount={c => setCount(c)} />
        <IconButton
          sx={{
            color: "var(--foreground-rgb)",
            borderRadius: 0
          }}
          onClick={deleteItem}>
          <DeleteOutlineIcon fontSize="medium" />
        </IconButton>
      </Box>
    </Box>
  )
}