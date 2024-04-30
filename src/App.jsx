import { useEffect, useState } from "react";
import { apiKey } from "../public/info";

import ShowMap from "./components/ShowMap";
import useMyHook from "./hooks/useMyHook";

export default function App() {
  const [lngLat, setLngLat] = useState([]);
  const [classN, setclassN] = useState("hidden");
  const { data, loading, error } = useMyHook(
    `https://catalog.api.2gis.com/3.0/items/geocode?lon=${lngLat[0]}&lat=${lngLat[1]}&fields=items.point&key=${apiKey}`
  );

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
      <ShowMap onMapClick={handleMapClick} />

      <div
        className={`${classN} box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute top-0 right-0 bg-[#f5deb3c4]`}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>
              Address: {data?.items[0].address_name || data?.items[0].full_name}
            </p>
            <p>Name: {data?.items[0].name || data?.items[0].full_name}</p>
            <p>Building: {data?.items[0].building_name || "Unknown"}</p>
            <p>
              lang: {data?.items[0]?.point ? data?.items[0]?.point.lat : ""}{" "}
              lon: {data?.items[0]?.point ? data?.items[0]?.point.lon : ""}
            </p>
            <p>type:{data?.items[0]?.type}</p>
          </>
        )}
      </div>
    </>
  );
}
