import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const Picker = ({ label, values, active, setActive }) => (
  <FormControl
    sx={{ m: 1, minWidth: 120 }}
    size="small">
    <InputLabel
      style={{ fontFamily: 'DM Sans, sans-serif' }}
      id="demo-select-small">{label}</InputLabel>
    <Select
      labelId="demo-select-small"
      id="demo-select-small"
      value={active}
      label="View"
      style={{ fontFamily: 'DM Sans, sans-serif' }}
      onChange={(e) => setActive(e.target.value)}
    >
      {
        values &&
        values.map(each => (
          <MenuItem
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