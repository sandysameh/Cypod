import "./App.css";
import MyNavbar from "./components/navbar/navbar";
import LoginCard from "./components/login/login";
import jwt_decode from "jwt-decode";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import ServerPage from "./components/routerpage/routerpage";

import { useEffect, useState } from "react";
import { LoginContext } from "./context/LoginContext";

function App() {
  let [loggedin, setLoggedin] = useState(false);
  let [error, setError] = useState(false);
  let [role, setRole] = useState(false);

  useEffect(() => {
    try {
      var token = localStorage.getItem("auth-token");
      var decoded = jwt_decode(token);
      setRole(decoded.tokenrole);

      console.log(jwt_decode(localStorage.getItem("auth-token")));

      // Do something that could throw
    } catch (error) {
      setError(true);
    }
  }, []);
  return (
    <LoginContext.Provider value={[loggedin, setLoggedin]}>
      <div className="App">
        <Router>
          <MyNavbar />
          <Routes>
            <Route exact path="/" element={<LoginCard />} />

            <Route exact path="/login" element={<LoginCard />} />
            {!error && role === "A" ? (
              <>
                <Route exact path="/homepage" element={<Homepage />} />
                <Route exact path="/server" element={<ServerPage />} />
              </>
            ) : (
              <Route exact path="/login" element={<LoginCard />} />
            )}
          </Routes>
        </Router>
      </div>
    </LoginContext.Provider>
  );
}

export default App;

//localStorage.getItem('tokenrole') === "Course coordinator"
