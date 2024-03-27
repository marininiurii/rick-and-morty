import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export const SelectField = ({ data, onChange, value, name}) => {

  const { items, label } = data;

  const content = items.map((item, index) => (
    <MenuItem key={index} value={item}>{item}</MenuItem>
  ))

  return (
    <Box sx={{ minWidth: 240, minHeight: 56 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Gender"
          onChange={onChange}
          name={name}
        >
          {content}
        </Select>
      </FormControl>
    </Box>
  );
};
