import { createContext, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, InputBase, IconButton } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

interface InputDialogCaseProps {
  isOpen: boolean
  handleClose: () => void
  value?: string
  setValue?: (v: string) => void
}

const InputDialogCase = ({ isOpen, handleClose, value: parentValue = null, setValue: setParentValue }
  : InputDialogCaseProps): JSX.Element => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(parentValue);
  
  const save = () => {
    if(setParentValue)
      setParentValue(value);
    handleClose();
  }
  useEffect(() => {
    const input = inputRef.current;
    input?.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        // event on enter pressed
        save()
      }
    });
    return input?.removeEventListener("keypress");
  }, []);
  useEffect(() => setValue(parentValue), [parentValue])
  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={() => handleClose()}>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "flex-end"
        }}>
        <InputBase
          ref={inputRef}
          multiline
          autoFocus
          value={value}
          onChange={event => setValue(event.target.value)}
          sx={{
            width: "100%",
            borderBottom: "2px solid #000",
            fontFamily: "Comme"
          }}
        />
        <IconButton
          sx={{
            borderRadius: "0px",
            backgroundColor: "var(--gray-hard-500)",
            "&:hover": {
              backgroundColor: "var(--gray-hard-500)",
              opacity: 0.9
            },
          }}
          onClick={() => save()}>
          <DoneIcon htmlColor="var(--white-X00)"/>
        </IconButton>
      </DialogContent>
    </Dialog>
  )
}

export default InputDialogCase;