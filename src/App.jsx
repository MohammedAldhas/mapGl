import { useEffect, useState } from "react";
import { apiKey } from "../public/info";
import axios from "axios";
import ShowMap from "./components/ShowMap";

function App() {
  const [data, setData] = useState([""]);
  const [lngLat, setLngLat] = useState(null);

  const handleMapClick = (clickedLngLat) => {
    setLngLat(clickedLngLat);

    // console.log(clickedLngLat);
  };
  useEffect(() => {
    if (lngLat != null) {
      //gecoder API
      axios
        .get(
          `https://catalog.api.2gis.com/3.0/items/geocode?lon=${lngLat[0]}&lat=${lngLat[1]}&fields=items.point&key=${apiKey}`
        )
        .then((res) => {
          setData(res.data.result.items);
          console.log(data);
        });
    }
  }, [lngLat]);

  return (
    <>
      <ShowMap onMapClick={handleMapClick} />
      <div className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl">
        <p>Address: {data[0].address_name || data[0].full_name}</p>
        <p>Name: {data[0].name || data[0].full_name}</p>
        <p>Building: {data[0].building_name || "Unknown"}</p>
        <p>lang: {data[0].point ? data[0].point.lat : ""}  lon: {data[0].point ? data[0].point.lon : ""}</p>
      </div>
      {/* {data.length > 0
          ? data.map((e) => {
              <p className="text-xs" key={e.id}>
                Name:{e.full_name}
              </p>;
            })
          : console.log("hhhhh")} */}
    </>
  );
}

export default App;
