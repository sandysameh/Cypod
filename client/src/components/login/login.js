import { useEffect, useState, useContext } from "react";
// import { Button, Form, Card, Container, Row, Col } from "react-bootstrap/";
import "../../stylesheet/logincard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import MuiAlert from "@mui/material/Alert";
import { blueGrey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { Box } from "@mui/system";

function LoginCard() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  const [loggedinContext, setLoggedinContext] = useContext(LoginContext);

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

  const loginUser = async (e) => {
    //Event is gonna be triggered and send it from front end to backend
    e.preventDefault();
    try {
      await axios({
        method: "put",
        url: process.env.REACT_APP_SERVER + "/login",
        data: {
          email: email,
          password: password,
        },
      }).then((res) => {
        if (!res.data.msg) {
          localStorage.setItem("auth-token", res.data.token);
          Toast.fire({ icon: "success", text: "Logged in Successfully" });

          //   console.log(res.data.token);
          setLoggedinContext(true);

          navigate(`/homepage`);
        } else {
          Toast.fire({ icon: "error", text: res.data.msg });
        }
      });
    } catch (e) {
      Toast.fire({ icon: "error", text: e });
    }
  };

  return (
    <>
      <div className="animation-area">
        <ul className="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <ThemeProvider theme={darkTheme}>
        <Box sx={{ m: 15 }} />

        <form className="form">
          <AccountCircle className="accounticon" />
          <Box sx={{ m: 2 }} />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email"
            variant="standard"
          />
          <Box sx={{ m: 0.5 }} />

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            label="Password"
            variant="standard"
          />
          <Box sx={{ m: 2 }} />
          <Button
            onClick={(e) => loginUser(e)}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </form>
      </ThemeProvider>
    </>
  );
}

export default LoginCard;
