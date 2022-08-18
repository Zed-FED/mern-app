import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MDButton from "../Button/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/userActions";
import {
  Avatar,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";

export default function MDToolbar(props) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userDetails;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="app-toolbar">
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, position: "relative", zIndex: 2 }}
            onClick={props.toggleMenu}
            className={"nav-button " + (props.toggle ? "toggled" : null)}
          >
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
            <span className="bar bar4"></span>
          </IconButton>
          {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome{" "}
            <Box component="span" color="primary.main">
              {userInfo.name}
            </Box>
          </Typography>*/}

          <Paper
            component="form"
            sx={{ boxShadow: "none", borderRadius: 5 }}
            className="header-searchbox"
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="text"
              onClick={handleOpenUserMenu}
              sx={{ p: 0, mr: 1 }}
            >
              <Avatar alt={userInfo.name} src={userInfo.pic} sx={{ mr: 1 }} />
              <span>{userInfo.name}</span>
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <MDButton
                  variant="text"
                  sx={{ mb: 1 }}
                  component={Link}
                  to={`/edit/${userInfo._id}`}
                  startIcon={<AccountCircleIcon />}
                >
                  Profile
                </MDButton>
                <MDButton
                  variant="contained"
                  onClick={onLogout}
                  startIcon={<PowerSettingsNewIcon />}
                >
                  Logout
                </MDButton>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
