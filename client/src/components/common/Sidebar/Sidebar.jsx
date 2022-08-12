import Navigation from "./Navigation";
import Box from "@mui/material/Box";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ToggleMenu } from "../../../App";
const SideBar = () => {
  return (
    <ToggleMenu.Consumer>
      {(value) => {
        return (
          <Box
            component="aside"
            className={
              value ? `sidebar-close sidebar-container` : `sidebar-container`
            }
            bgcolor="primary.main"
            color="white.main"
          >
            <div className="logo">
              <Logo />
            </div>
            <Navigation />
          </Box>
        );
      }}
    </ToggleMenu.Consumer>
  );
};

export default SideBar;
