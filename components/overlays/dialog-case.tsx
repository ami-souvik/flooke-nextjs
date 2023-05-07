import { Dialog, DialogContent } from "@mui/material"

interface DialogCaseProps {
  children?: JSX.Element | JSX.Element[]
  open: boolean
  setOpen: (v: boolean) => void
}

export const DialogCase = ({
  children,
  open,
  setOpen
}: DialogCaseProps): JSX.Element => (
  <Dialog
    fullScreen
    keepMounted
    open={open}
    onClose={() => setOpen(false)}
    sx={{
      padding: "20px"
    }}
    >
    <DialogContent
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
      {children}
    </DialogContent>
  </Dialog>
)