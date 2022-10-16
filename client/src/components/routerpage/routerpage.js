import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import "../../stylesheet/cards.css";
import { useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightGreen } from "@mui/material/colors";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StorageIcon from "@mui/icons-material/Storage";
import Switch from "@mui/material/Switch";

import "../../stylesheet/router.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Stack } from "@mui/system";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function RouterPage() {
  const primary = lightGreen[800];
  const [checked, setChecked] = React.useState(true);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: primary,
      },
    },
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Power Consumption",
      },
    },
  };

  const location = useLocation();
  let id = location.state.id;
  let [places, setplaces] = useState({});
  let [labels] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ]);

  // let navigate = useNavigate();

  async function fetchDate() {
    await axios({
      method: "get",
      url: process.env.REACT_APP_SERVER + "/getData",
      headers: { "auth-token": localStorage.getItem("auth-token") },
    }).then((res) => {
      let arr1 = res.data.data.Data;
      let arr = arr1.filter((el) => el.id === id);

      let result = arr.map(function (item) {
        return {
          id: item.id,
          name: item.name,
          lat: item.lat,
          long: item.long,
          ON: item.status === 0 ? true : false,
          temp: item.temperature,
          humidity: item.humidity,
          totalPowerUse: item.totalPowerUse,
          ChartData: item.ChartData,
        };
      });
      result = result[0];

      console.log(result);
      setChecked(result.ON);
      setplaces(result);
    });
  }
  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ m: 3 }} />

        <Grid container>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Box sx={{ m: 8 }} />

            <Card>
              <Box sx={{ m: 2 }} />

              <StorageIcon className="serverIcon" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {places.name}
                  <Switch checked={checked} diabled={true}></Switch>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <h3>
                    ID : <span> {places.id}</span>
                  </h3>
                  <h3>
                    ID : <span> {places.name}</span>
                  </h3>
                  <h3>
                    Latitude : <span> {places.lat}</span>
                  </h3>
                  <h3>
                    longitude : <span> {places.lat}</span>
                  </h3>
                  <h3>
                    Temperature : <span> {places.temp}</span>
                  </h3>
                  <h3>
                    Humidity : <span> {places.humidity}</span>
                  </h3>
                  <h3>
                    Total Power Consumption :{" "}
                    <span> {places.totalPowerUse}</span>
                  </h3>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Line
              options={options}
              data={{
                labels,
                datasets: [
                  {
                    label: `${places.name} Power Consumption Chart`,
                    data: places.ChartData,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
