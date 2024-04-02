import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SelectField } from "../Select/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 300,
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalFiltersButton = ({ children, className }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={className}>
      <Button
        sx={{
          width: 312,
          height: 56,
          background: "#F2F9FE",
          boxShadow: "0px 6px 10px 0px #00000024",
          "0px 1px 18px 0px #0000001F": "0px 3px 5px 0px #00000033",
          color: "#2196F3",
        }}
        onClick={handleOpen}
      >
        ADVANCED FILTERS
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
