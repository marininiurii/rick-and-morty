import { SearchIcon } from "../SearchIcon/SearchIcon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

export const TextFieldComponent = ({ onChange, label }) => {
  return (
    <FormControl>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};
