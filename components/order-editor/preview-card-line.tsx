import { useState } from "react"
import { Box, Typography, IconButton } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Counter from "../form-components/sm-counter";
import InputDialogCase from "../form-components/input-dialog-case";

interface PreviewCardLineProps {
  added: boolean
  updated: boolean
  deleted: boolean
  itemName: string
  itemComment: string
  setComment: (v: string) => void
  deleteItem: () => void
  count: number
  setCount: (count: number) => void
}

export default function PreviewCardLine({
  added,
  updated,
  deleted,
  itemName,
  itemComment,
  setComment,
  deleteItem,
  count,
  setCount,
}: PreviewCardLineProps) : JSX.Element {
  const backgroundColor =
    added ? "var(--green-subtle-400)" :
    updated ? "var(--yellow-subtle-200)" :
    deleted ? "var(--red-subtle-500)" : "transparent";
  const [open, setOpen] = useState(false);
  return (
    <>
      <InputDialogCase
        isOpen={open}
        handleClose={() => setOpen(false)}
        value={itemComment}
        setValue={setComment}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor
        }}>
        <Box
          onClick={() => setOpen(true)}>
          <Typography
            fontFamily="Comme, sans-serif"
            fontSize="0.8rem"
            padding="0px 4px">
            {itemName}
          </Typography>
          {
            itemComment &&
            <Typography
              lineHeight="0.9rem"
              padding="6px"
              margin="4px 8px 4px -4px"
              fontSize="0.8rem"
              fontFamily="DM Sans, sans-serif"
              fontStyle="italic"
              borderRadius="4px"
              boxShadow="0px 0px 8px var(--gray-subtle-500)"
              color="var(--white-X00)"
              bgcolor="var(--lightblue-400)"
            >{itemComment}</Typography>
          }
        </Box>
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
    </>
  )
}