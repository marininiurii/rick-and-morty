import Button from "@mui/material/Button";
import { STYLES_FOR_BUTTON } from "./constants";

export const BasicButton = ({ onClick, children }) => {
  return (
    <Button sx={STYLES_FOR_BUTTON} onClick={onClick} variant="contained">
      {children}
    </Button>
  );
};
