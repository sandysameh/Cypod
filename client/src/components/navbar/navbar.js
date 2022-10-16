import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { blueGrey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useContext } from "react";
import axios from "axios";
import { BrowserRouter, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import "../../stylesheet/navbar.css";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

export default function MyNavbar() {
  const primary = blueGrey[800];

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: primary,
      },
    },
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  let navigate = useNavigate();
  const [loggedinContext, setLoggedinContext] = useContext(LoginContext);

  const handlelogout = async (e) => {
    try {
      await axios({
        method: "get",
        url: process.env.REACT_APP_SERVER + "/logout",
        headers: { "auth-token": localStorage.getItem("auth-token") },
        data: {},
      }).then((res) => {
        if (res.status === 400) {
          Toast.fire({ icon: "error", text: res.data.msg });
        }

        if (!res.data.msg) {
          localStorage.clear();
          Toast.fire({ icon: "success", text: "Logged out successfully" });

          navigate(`/login`);
          setLoggedinContext(false);
        } else {
          Toast.fire({ icon: "error", text: res.data.msg });
        }
      });
    } catch (e) {
      Toast.fire({ icon: "error", text: e });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={(e) => navigate(`/homepage`)}
              sx={{ mr: 2 }}
            >
              <img
                className="logoImg"
                src="https://static.wixstatic.com/media/29ccb1_4f8d8d37673e45abbfe109973b46adcf~mv2.png/v1/fill/w_230,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_cypod_edited_edited.png"
                alt="logo_cypod_edited_edited.png"
              />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {loggedinContext && (
              <div>
                <Button onClick={(e) => handlelogout(e)} color="inherit">
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
