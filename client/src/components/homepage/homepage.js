import MyNavbar from "../navbar/navbar";
import LoginCard from "../login/login";
import Container from "@mui/material/Container";
import "../../stylesheet/homepage.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
// import Homepage from "./components/homepage/homepage";
import { useState } from "react";
import MyMap from "../map/map2";
import MyCards from "./cards";
import { Box, Grid } from "@mui/material";
export default function HomePage() {
  return (
    <Grid container>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <MyCards />
      </Grid>
      <Grid item lg={6} md={12} sm={12} xs={12}>
        <MyMap />
      </Grid>
    </Grid>

    // <div>
    //   <Container className="card-container" maxWidth="sm" maxHeight="sm ">
    //     <MyCards />
    //   </Container>

    //   <Container className="map-container" maxWidth="sm" maxHeight="sm ">
    //     <MyMap />
    //   </Container>
    // </div>
  );
}

//localStorage.getItem('tokenrole') === "Course coordinator"
