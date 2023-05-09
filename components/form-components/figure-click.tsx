import { IconButton } from "@mui/material"

interface FigureClickProps {
  disabled?: boolean
  icon: JSX.Element
  padding?: number | string
  clickWork: () => void
}

const FigureClick = ({ disabled, icon, padding = "16px", clickWork }: FigureClickProps): JSX.Element => (
  <IconButton
    disabled={disabled}
    sx={{
      padding,
      marginX: "2px",
      bgcolor: "var(--gray-hard-500)",
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