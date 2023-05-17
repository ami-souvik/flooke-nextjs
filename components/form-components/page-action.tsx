import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import InputDialogCase from "./input-dialog-case";
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
        right="0px"
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
          margin="0px 4px"
          clickWork={() => {
            categoryAdd(value)
            setValue(null)
          }}
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

export const OPageAction = ({ activeView, setActiveView, clickAction }) => (
  <Box
    width="calc(100% - 24px)"
    position="absolute"
    bottom="0px"
    display="flex"
    justifyContent="space-between"
    alignItems="flex-end"
    bgcolor="var(--white-X00)">
    <Box
      padding="0px 6px"
      display="flex"
      bgcolor="var(--white-X00)"
      border="0.5px solid var(--black-500)">
      <Box
        padding="6px"
        onClick={() => setActiveView(0)}>
        <FigureClick
          invert={activeView !== 0}
          icon={<WhatshotRoundedIcon htmlColor={activeView !== 0 ? "var(--gray-hard-500)" : "var(--white-X00)"} />}
          padding="6px"
        />
      </Box>
      <Box
        padding="6px"
        onClick={() => setActiveView(1)}>
        <FigureClick
          invert={activeView !== 1}
          icon={<ManageAccountsRoundedIcon htmlColor={activeView !== 1 ? "var(--gray-hard-500)" : "var(--white-X00)"} />}
          padding="6px"
        />
      </Box>
      <Box
        padding="6px"
        onClick={() => setActiveView(2)}>
        <FigureClick
          invert={activeView !== 2}
          icon={<RoomServiceRoundedIcon htmlColor={activeView !== 2 ? "var(--gray-hard-500)" : "var(--white-X00)"} />}
          padding="6px"
        />
      </Box>
    </Box>
    <Box>
      <FigureClick
        id="cs-order-editor-open-switch"
        icon={<PostAddOutlinedIcon htmlColor="var(--white-X00)" />}
        padding="12px"
        clickWork={clickAction}
      />
    </Box>
  </Box>
)