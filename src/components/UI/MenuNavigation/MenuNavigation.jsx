import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { MENU_NAVIGATION_LINKS, STYLES } from "./constants";

export const MenuNavigation = ({ className }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={STYLES.box}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {MENU_NAVIGATION_LINKS.map(([name, path]) => (
          <ListItem key={name} disablePadding>
            <ListItemButton href={`/${path}`}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <CloseIcon sx={STYLES.closeIcon} />
    </Box>
  );

  return (
    <div className={className}>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={STYLES.button} onClick={toggleDrawer("top", true)}>
            Menu
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};
