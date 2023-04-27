import { useState } from "react"
import { Box, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Counter from "../form-components/smCounter";

interface PreviewCardLineProps {
  itemName: string
  count: number
}

export default function PreviewCardLine({
  itemName,
  count: propCount
}: PreviewCardLineProps) : JSX.Element {
  const [count, setCount] = useState(propCount || 0);
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
        <Counter count={count} setCount={setCount} />
        <IconButton sx={{ color: "var(--foreground-rgb)" }}>
          <DeleteOutlineIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  )
}