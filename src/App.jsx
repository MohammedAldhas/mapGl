import { useEffect, useState } from "react";
import { apiKey } from "../public/info";

import ShowMap from "./components/ShowMap";
import useMyHook from "./hooks/useMyHook";
import {BASE_URL} from "./constants/Constants.js";
import Identify from "./components/Identify.jsx";
import {load} from "@2gis/mapgl";

export default function App({map, mapglAPI}) {
  const [lngLat, setLngLat] = useState([]);
  const [classN, setclassN] = useState("hidden");
  const { data, loading, error } = useMyHook(BASE_URL + `/items/geocode?lon=${lngLat[0]}&lat=${lngLat[1]}&fields=items.point&key=${apiKey}`);

  const handleMapClick = (clickedLngLat) => {
    setLngLat(clickedLngLat);
  };

  useEffect(() => {
    if (lngLat.length > 0) {
      setclassN("block");
    }
  }, [lngLat]);

  if (error) {
    return console.log(error);
  }


  return (
    <>

      <ShowMap onMapClick={handleMapClick} map={map} mapglAPI={mapglAPI} />

      <Identify loading={loading} classN={classN} data={data} setclassN={setclassN} />

    </>
  );
}
