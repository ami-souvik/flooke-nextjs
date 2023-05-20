import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const Picker = ({ label, values, active, setActive, disabled = false, width = "default" }) => (
  <FormControl
    sx={{
      minWidth: 120,
      width: width === "full" ? "100%" : "auto",
      padding: 0,
      border: "none"
    }}>
    <InputLabel
      style={{
        fontFamily: 'DM Sans, sans-serif'
      }}
      id="demo-select-small">{label}</InputLabel>
    <Select
      labelId="demo-select-small"
      id="demo-select-small"
      value={active}
      label="View"
      disabled={disabled}
      sx={{
        border: "none",
      }}
      style={{
        padding: 0,
        border: "none",
        // borderBottom: "2px solid #000",
        fontFamily: 'DM Sans, sans-serif'
      }}
      inputProps={{
        style: {
          border: "none",
          borderRadius: 0,
        }
      }}
      SelectDisplayProps={{
        style: {
          border: "none",
          padding: "6px 12px",
          borderRadius: 0,
        }
      }}
      onChange={(e) => setActive(e.target.value)}
    >
      {
        values &&
        values.map((each, index) => (
          <MenuItem
            key={index}
            style={{ fontFamily: 'DM Sans, sans-serif' }}
            value={each}>
            {each}
          </MenuItem>
        ))
      }
    </Select>
  </FormControl>
)

export default Picker;