import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(data.offers);

        setData(response.data);
      } catch (error) {
        console.log("catch >>", error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <main>
      <p>Loading...</p>
    </main>
  ) : (
    <>
      <Router>
        <Header />

        <Routes>
          <Route
            path="/"
            element={<Home data={data} isLoading={isLoading} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
