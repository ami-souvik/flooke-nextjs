import { ReactElement } from "react"
import { Box, IconButton, IconProps, Typography } from "@mui/material"

interface FigureClickProps {
  disabled?: boolean
  invert?: boolean
  id?: string
  label?: string
  Icon?: (IconProps) => ReactElement<IconProps>
  padding?: number | string
  margin?: number | string
  rounded?: number | string
  foreground?: string
  background?: string
  clickWork?: () => void
}

const FigureClick = ({
  disabled,
  invert,
  id,
  label,
  Icon,
  padding = "16px",
  margin = "0px",
  rounded = "0px",
  foreground = "var(--gray-hard-500)",
  background = "var(--white-X00)",
  clickWork = null
}: FigureClickProps): JSX.Element => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    margin={margin}>
    <IconButton
      id={id}
      disabled={disabled}
      sx={{
        padding,
        border: `solid 2px ${foreground}`,
        borderRadius: rounded,
        bgcolor: invert ? background : foreground,
        "&:hover": {
          backgroundColor: foreground,
          opacity: 0.9
        },
        "&:disabled": {
          backgroundColor: foreground,
          opacity: 0.5
        }
      }}
      onClick={clickWork}>
      {Icon && Icon({
        htmlColor: invert ? foreground : background,
      })}
    </IconButton>
    {
      label && <Typography
        maxWidth="92px"
        marginTop="4px"
        textTransform="uppercase"
        fontSize="0.7rem"
        textAlign="center"
      >{label}</Typography>
    }
  </Box>
)

export default FigureClick;