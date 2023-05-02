import { IconButton } from "@mui/material"

const FigureClick = ({ icon, padding = "16px", clickWork }) => (
  <IconButton
    sx={{
      padding,
      bgcolor: "var(--gray-hard-500)",
      borderRadius: "0",
      "&:hover": {
        backgroundColor: "var(--gray-hard-500)",
        opacity: 0.9
      }
    }}
    onClick={clickWork}>
    {icon}
  </IconButton>
)

export default FigureClick;