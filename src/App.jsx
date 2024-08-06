import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Payment from "./pages/Payment";
library.add(faMagnifyingGlass);

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token" || null));

  const setUser = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/offers?title=${search}`
        );
        // console.log(data.offers);

        setData(response.data);
      } catch (error) {
        console.log("catch >>", error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [search, data.offers]);
  return isLoading ? (
    <main>
      <p>Loading...</p>
    </main>
  ) : (
    <>
      <Router>
        <Header token={token} setUser={setUser} setSearch={setSearch} />

        <Routes>
          <Route
            path="/"
            element={<Home data={data} isLoading={isLoading} />}
          />
          <Route path="/offer/:id" element={<Offer data={data} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
