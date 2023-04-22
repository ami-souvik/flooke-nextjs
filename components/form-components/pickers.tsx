import { Box, Select, MenuItem } from '@mui/material';

const values = ["appetizers", "course", "dessert"]

export const DoublePicker = () : JSX.Element => (
  <Box
    sx={{
      display: "flex"
    }}>
    <Select
      sx={{
        width: "50%",
        bgcolor: "#D9D9D9",
        fontSize: "1.2rem",
        fontFamily: "alpha beta",
        textTransform: "capitalize",
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "3px",
        borderBottomWidth: "6px"
      }}>
      {
        values &&
        values.map((each, index) => (
          <MenuItem
            key={index}
            value={each}>
            {each}
          </MenuItem>
        ))
      }
    </Select>
    <Select
      sx={{
        width: "50%",
        bgcolor: "#D9D9D9",
        fontSize: "1.2rem",
        fontFamily: "alpha beta",
        textTransform: "capitalize",
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "3px",
        borderBottomWidth: "6px"
      }}>
      {
        values &&
        values.map((each, index) => (
          <MenuItem
            key={index}
            value={each}>
            {each}
          </MenuItem>
        ))
      }
    </Select>
  </Box>
)

export const Picker = ({ values }) : JSX.Element => (
  <Select
    sx={{
      width: "50%",
      bgcolor: "#D9D9D9",
      fontSize: "1.2rem",
      fontFamily: "alpha beta",
      textTransform: "capitalize",
      borderRadius: 0,
      borderStyle: "solid",
      borderWidth: "3px",
      borderBottomWidth: "6px"
    }}>
    {
      values &&
      values.map((each, index) => (
        <MenuItem
          key={index}
          value={each}>
          {each}
        </MenuItem>
      ))
    }
  </Select>
)