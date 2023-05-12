import { IconButton } from "@mui/material"

interface FigureClickProps {
  disabled?: boolean
  invert?: boolean
  id?: string
  icon: JSX.Element
  padding?: number | string
  clickWork?: () => void
}

const FigureClick = ({ disabled, invert, id, icon, padding = "16px", clickWork=null }: FigureClickProps): JSX.Element => (
  <IconButton
    id={id}
    disabled={disabled}
    sx={{
      padding,
      marginX: "2px",
      bgcolor: invert ? "transparent" : "var(--gray-hard-500)",
      borderRadius: "0",
      "&:hover": {
        backgroundColor: "var(--gray-hard-500)",
        opacity: 0.9
      },
      "&:disabled": {
        backgroundColor: "var(--gray-hard-500)",
        opacity: 0.5
      }
    }}
    onClick={clickWork}>
    {icon}
  </IconButton>
)

export default FigureClick;