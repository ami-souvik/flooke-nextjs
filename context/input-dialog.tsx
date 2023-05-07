import { createContext, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, InputBase, IconButton } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

export const InputDialogContext = createContext(null);

const InputDialogProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [unique, setUnique] = useState(null);
  const [value, setValue] = useState(null);
  const [content, setContent] = useState({});
  const save = () => {
    if(unique) {
      const _content = {...content}
      _content[unique] = value
      setContent(_content)
    }
    setOpen(false);
    setValue(null);
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
  return(
    <InputDialogContext.Provider value={{
      dialogOpen: open,
      toggleIpDialog: () => setOpen(!open),
      ipcontent: content,
      ipvalue: value,
      setIpValue: setValue,
      setUnique: v => setUnique(v)
    }}>
      <Dialog
        fullWidth
        open={open}
        onClose={() => save()}>
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
          ></InputBase>
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
      {children}
    </InputDialogContext.Provider>
  )
}

export default InputDialogProvider;