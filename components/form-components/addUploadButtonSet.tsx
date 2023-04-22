import { Box, Typography } from "@mui/material"

const AddUploadButtonSet = ({ handleAdd, handleUpload }) : JSX.Element => (
  <Box
    sx={{
      display: "flex"
    }}>
    <Box
      bgcolor="#FFCF2E"
      onClick={handleAdd}
      sx={{
        width: "5rem",
        height: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
    <Typography
      color="#000000"
      fontSize="4.5rem"
      fontFamily="judera flat"
      sx={{ transform: "rotate(-90deg)" }}
      ml={"-0.2rem"}
    >{">"}</Typography>
    </Box>
    <Box
      ml="0.5rem"
      bgcolor="#000000"
      onClick={handleUpload}
      sx={{
        width: "5rem",
        height: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Typography
        color="#FFCF2E"
        fontSize="4.5rem"
        fontFamily="judera flat"
        sx={{ transform: "rotate(-90deg)" }}
        ml={"-0.2rem"}
      >{">>"}</Typography>
    </Box>
  </Box>
)

export default AddUploadButtonSet;