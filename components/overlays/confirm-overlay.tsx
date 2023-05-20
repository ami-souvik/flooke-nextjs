import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const ConfirmOverlay = ({
  open,
  handleClose,
  title,
  message,
  onSuccess
}) => (
  <Dialog
    fullWidth
    keepMounted
    open={open}
    onClose={handleClose}
    sx={{
      zIndex: 1305
    }}>
    <DialogTitle>
      <Typography
        fontSize="1.2rem"
      >{title}</Typography>
    </DialogTitle>
    <DialogContent
      sx={{
        padding: "26px",
        display: "flex",
        flexDirection: "column"
      }}>
      <Typography
        fontSize="0.8rem"
      >{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={() => {
        onSuccess()
        handleClose()
      }}>Confirm</Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmOverlay;