import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import InputDialogCase from "./input-dialog-case";

const TypeIn = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <InputDialogCase
        isOpen={open}
        handleClose={() => setOpen(false)}
        value={value}
        setValue={setValue}
      />
      <Box
        sx={{
          width: "100%",
          fontFamily: "Montserrat",
          padding: "0px 12px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "var(--gray-hard-500)",
          color: "rgb(var(--foreground-rgb))",
          backgroundColor: "rgb(var(--background-end-rgb))"
        }}
        onClick={() => setOpen(true)}
      >
        <Typography>{value}</Typography>
      </Box>
    </>
  )
}

export default TypeIn;