import { useEffect, useState } from "react";
import { apiKey } from "../public/info";
import axios from "axios";
import ShowMap from "./components/ShowMap";

function App() {
  const [data, setData] = useState([""]);
  const [lngLat, setLngLat] = useState(null);
  const [classN, setclassN] = useState("invisible");

  const handleMapClick = (clickedLngLat) => {
    setLngLat(clickedLngLat);

    // console.log(clickedLngLat);
  };
  useEffect(() => {
    if (lngLat != null) {
      hideElm();

      //gecoder API
      axios
        .get(
          `https://catalog.api.2gis.com/3.0/items/geocode?lon=${lngLat[0]}&lat=${lngLat[1]}&fields=items.point&key=${apiKey}`
        )
        .then((res) => {
          setData(res.data.result.items);
          // console.log(data);
        });
    }
  }, [lngLat]);

  function hideElm() {
    setclassN("visible");
  }

  return (
    <>
      <ShowMap onMapClick={handleMapClick} />
      {/* <div className=""> */}
      <div
        className={`${classN} box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute top-0 right-0 bg-[#f5deb3c4]`}
      >
        <p>Address: {data[0].address_name || data[0].full_name}</p>
        <p>Name: {data[0].name || data[0].full_name}</p>
        <p>Building: {data[0].building_name || "Unknown"}</p>
        <p>
          lang: {data[0].point ? data[0].point.lat : ""} lon:{" "}
          {data[0].point ? data[0].point.lon : ""}
        </p>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
