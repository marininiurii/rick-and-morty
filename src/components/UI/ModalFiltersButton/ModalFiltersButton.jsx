import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { STYLES } from "./constants";
import { useState } from "react";

export const ModalFiltersButton = ({ children, className }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={className}>
      <Button sx={STYLES.button} onClick={handleOpen}>
        ADVANCED FILTERS
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLES.box}>{children}</Box>
      </Modal>
    </div>
  );
};
