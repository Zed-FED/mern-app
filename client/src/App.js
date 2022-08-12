import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Single from "./pages/single";
import UpdateUser from "./pages/edit";
import AddUser from "./pages/add";

import SideBar from "./components/common/Sidebar/Sidebar";
import MDToolbar from "./components/common/Toolbar/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/Employee/EmployeeList";
import Category from "./pages/Category";
import { createContext, useState } from "react";
// import "./App.css";

export const ToggleMenu = createContext();
function App() {
  const [toggle, setToggle] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <ToggleMenu.Provider value={toggle}>
      <ThemeProvider theme={theme}>
        <div
          className={userInfo ? (toggle ? "App menu-close" : "App") : "Auth"}
        >
          <BrowserRouter>
            {userInfo && <SideBar />}
            {userInfo && <MDToolbar toggleMenu={toggleMenu} toggle={toggle} />}
            <div className="content p-15px">
              <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/home"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/:id"
                  element={
                    <PrivateRoute>
                      <Single />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <PrivateRoute>
                      <UpdateUser />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <AddUser />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/employee-list"
                  element={
                    <PrivateRoute>
                      <EmployeeList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/departments"
                  element={
                    <PrivateRoute>
                      <Category />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ToggleMenu.Provider>
  );
}

export default App;
