import { useState } from "react";
import { apiKey } from "../public/info";
import axios from "axios";
// import { load } from "@2gis/mapgl";
import "../src/App.css";
import { useEffect } from "react";
import ShowMap from "./components/ShowMap";
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://catalog.api.2gis.com/3.0/items/geocode?lon=46.712460&lat=24.639339&fields=items.point&key=${apiKey}`
      )
      .then((res) => {
        setData(res.data.result);
        console.log(res.data.result.items);
      });
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "100vh" }}>
        <ShowMap />
      </div>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}

export default App;
