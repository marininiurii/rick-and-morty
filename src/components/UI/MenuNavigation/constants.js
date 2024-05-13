export const STYLES = {
  button: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#000000",
    marginRight: "10px",
  },
  box: {
    position: "relative",
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    "&:hover": {
      background: "rgb(230, 230, 230)",
      borderRadius: 5,
    },
  },
};

export const MENU_NAVIGATION_LINKS = [
  ["Characters", ""],
  ["Locations", "locations"],
  ["Episodes", "episodes"],
];
