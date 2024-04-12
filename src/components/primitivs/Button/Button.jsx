import Button from "@mui/material/Button";

export const BasicButton = ({ onClick, children }) => {
  return (
    <Button
      sx={{
        width: 155,
        height: 36,
        background: "#F2F9FE",
        boxShadow: "0px 6px 10px 0px #00000024",
        "0px 1px 18px 0px #0000001F": "0px 3px 5px 0px #00000033",
        color: "#2196F3",
      }}
      onClick={onClick}
      variant="contained"
    >
      {children}
    </Button>
  );
};
