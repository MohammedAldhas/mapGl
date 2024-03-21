import "../App.css";
import { load } from "@2gis/mapgl";
import { useEffect, useState } from "react";
import MapWrapper from "./MapWrapper";
import { apiKey } from "../../public/info";
import axios from "axios";
// import { useMap } from "../context/MapContext";

function ShowMap({ onMapClick }) {
  const [, setLngLat] = useState(null);
  const [data, setData] = useState([]);
  const [searchInput, setsearchInput] = useState("");

  useEffect(() => {
    let map;
    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map-container", {
        center: [46.714382, 24.644584],
        zoom: 12,
        key: apiKey,
      });

      // click handel
      map.on("click", (e) => {
        const clickedLngLat = e.lngLat;
        setLngLat(clickedLngLat);
        onMapClick(clickedLngLat);
      });
    });

    return () => map && map.destroy();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://catalog.api.2gis.com/3.0/suggests?q=${searchInput}&location=46.711670,24.640437&key=${apiKey}&locale=en_SA`
      )
      .then((res) => {
        setData(res);
        console.log(data.data);
      });
  }, [searchInput]);

  return (
    <div className="w-full h-[70vh]">
      <MapWrapper />
      <div className="flex flex-row w-[400px] gap-1 box-border"></div>
      <input
        type="text"
        id="search"
        className="m-1 p-2"
        onChange={(e) => {
          console.log(e.target.value);
          setsearchInput(e.target.value);
          // console.log(this);
        }}
      />
      <div id="suggest"></div>
    </div>
  );
}

export default ShowMap;
