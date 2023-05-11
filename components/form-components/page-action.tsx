import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import InputDialogCase from "../../context/input-dialog-case";
import FigureClick from "./figure-click";

export const IEPageAction = ({ error, clearError, categoryAdd, itemAdd }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <>
      <Typography
        color="var(--red-hard-500)"
        fontSize="0.8rem"
        fontFamily="Comme, sans-serif"
        paddingX="12px"
      >{error}</Typography>
      <Box
        width="100%"
        position="absolute"
        bottom="0px"
        display="flex"
        justifyContent="center"
        padding="0px 12px">
        <InputDialogCase
          isOpen={open}
          handleClose={() => setOpen(false)}
          value={value}
          setValue={(v) => {
            clearError()
            setValue(v)
          }}
        />
        <Box
          sx={{
            width: "100%",
            fontFamily: "Comme, sans-serif",
            padding: "0px 12px",
            border: "2px solid var(--gray-hard-500)",
            color: "rgb(var(--foreground-rgb))",
            backgroundColor: "rgb(var(--background-end-rgb))"
          }}
          onClick={() => setOpen(true)}>
          <Typography>{value}</Typography>
        </Box>
        <FigureClick
          icon={<AddOutlinedIcon htmlColor="var(--white-X00)" />}
          padding="12px"
          clickWork={categoryAdd}
        />
        <FigureClick
          icon={<PostAddOutlinedIcon htmlColor="var(--white-X00)" />}
          padding="12px"
          clickWork={itemAdd}
        />
      </Box>
    </>
  )
}

export const OPageAction = ({ clickAction }) => (
  <Box
    width="100%"
    position="absolute"
    bottom="0px"
    display="flex"
    justifyContent="flex-end"
    alignItems="flex-end"
    padding="0px 12px">
    <Box
      padding="4px 0px">
      <FigureClick
        id="cs-order-editor-open-switch"
        icon={<PostAddOutlinedIcon htmlColor="var(--white-X00)" />}
        padding="12px"
        clickWork={clickAction}
      />
    </Box>
  </Box>
)