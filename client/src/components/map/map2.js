import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
// import Homepage from "./components/homepage/homepage";
import { useEffect, useState } from "react";
import axios from "axios";
import Map, { NavigationControl, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../../stylesheet/map.css";

export default function MyMap() {
  let [places, setplaces] = useState([]);

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
          long: item.long,
          lat: item.lat,
          ON: item.status == 0 ? "ON" : "OFF",
          color: item.status == 0 ? "#00e676" : "#d50000",
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
    <div className="App">
      <Map
        mapLib={maplibregl}
        initialViewState={{
          longitude: 55.326633,
          latitude: 25.243143,
          zoom: 2,
        }}
        style={{ width: "100%", height: " calc(100vh - 77px)" }}
        mapStyle="https://api.maptiler.com/maps/basic-v2-light/style.json?key=xVVBR7V22Cl4eoU0O2JD"
      >
        {places.map((i) => (
          <Marker
            longitude={i.long}
            latitude={i.lat}
            color="#37474f"
            popup={new maplibregl.Popup().setHTML(
              "<h3>" +
                `ID: 
                <span style="diaplay:inline-block">${i.id}</span> ` +
                "</h3>" +
                "<h3>" +
                i.name +
                "</h3>" +
                `<h3 style="color:${i.color}">` +
                `${i.ON}` +
                "</h3>"
            )}
          ></Marker>
        ))}
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}

//localStorage.getItem('tokenrole') === "Course coordinator"
