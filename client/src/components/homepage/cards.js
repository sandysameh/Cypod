import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import "../../stylesheet/cards.css";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function MyCards() {
  let [places, setplaces] = useState([]);
  let navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "cor", headerName: "Location", width: 190 },
    { field: "ON", headerName: "Status", width: 100 },
    { field: "temp", headerName: "Temperature", width: 100 },
    { field: "humidity", headerName: "Humidity", width: 90 },

    { field: "totalPowerUse", headerName: "Consumption", width: 100 },
  ];

  async function fetchDate() {
    await axios({
      method: "get",
      url: process.env.REACT_APP_SERVER + "/getData",
      headers: { "auth-token": localStorage.getItem("auth-token") },
    }).then((res) => {
      let arr = res.data.data.Data;
      let result = arr.map(function (item) {
        return {
          id: item.id,
          name: item.name,
          cor: `(${item.lat},${item.lat})`,
          ON: item.status == 0 ? "ON" : "OFF",
          temp: item.temperature,
          humidity: item.humidity,
          totalPowerUse: item.totalPowerUse,
        };
      });
      setplaces(result);
    });
  }
  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <div className="mycardbody">
      <div style={{ height: 480, width: "100%" }}>
        <DataGrid
          onRowClick={(e) => {
            navigate("/server", { state: { id: e.id } });
          }}
          rows={places}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
        />
      </div>
    </div>
  );
}

//localStorage.getItem('tokenrole') === "Course coordinator"
