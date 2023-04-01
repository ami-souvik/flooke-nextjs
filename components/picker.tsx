import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const Picker = ({ label, values, active, setActive, disabled = false, width = "default", size = "medium", polishLabel = {}, polish = {} }) => (
  <FormControl
    sx={{ ...polish, minWidth: 120, width: width === "full" ? "100%" : "auto" }}
    size={size}>
    <InputLabel
      style={{ ...polishLabel, fontFamily: 'DM Sans, sans-serif' }}
      id="demo-select-small">{label}</InputLabel>
    <Select
      labelId="demo-select-small"
      id="demo-select-small"
      value={active}
      label="View"
      disabled={disabled}
      style={{ ...polish, fontFamily: 'DM Sans, sans-serif' }}
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