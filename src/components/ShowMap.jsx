import "../App.css";
import { load } from "@2gis/mapgl";
import { useEffect, useState } from "react";
import MapWrapper from "./MapWrapper";
import { apiKey } from "../../public/info";
import axios from "axios";

// import { useMap } from "../context/MapContext";

function ShowMap({ onMapClick }) {
  const [data, setData] = useState([]);
  const [datamarker, setdatamarker] = useState([]);
  const [classN, setclassN] = useState("invisible");
  const [searchInput, setsearchInput] = useState("");
  const [places, setPlaces] = useState([]);
  const [cent, setcent] = useState([46.714382, 24.644584]);

  useEffect(() => {
    let map;
    load().then((mapglAPI) => {
      map = new mapglAPI.Map("map-container", {
        center: [46.714382, 24.644584],
        zoom: 12,
        key: apiKey,
      });
      if (localStorage.getItem("lon") && localStorage.getItem("lat")) {
        map.setCenter(cent, {
          animate: true,
          duration: 900,
          easing: "linear",
        });

        setTimeout(() => {
          map.setZoom(17, {
            animate: true,
            duration: 5000,
            easing: "linear",
          });
        }, 800);

        new mapglAPI.Marker(map, {
          coordinates: [
            localStorage.getItem("lon"),
            localStorage.getItem("lat"),
          ],
        });
        // setzom(19);
      }
      localStorage.clear();
      // click handel
      map.on("click", (e) => {
        const clickedLngLat = e.lngLat;
        onMapClick(clickedLngLat);
      });
    });

    return () => map && map.destroy();
  }, [cent]);

  useEffect(() => {
    if (searchInput == "") {
      return;
    }
    axios
      .get(
        `https://catalog.api.2gis.com/3.0/suggests?q=${searchInput}&location=46.711670,24.640437&key=${apiKey}&locale=en_SA`
      )
      .then((res) => {
        setData(res.data.result.items);
        // console.log(data);
      })
      .then(
        axios
          .get(
            `https://catalog.api.2gis.com/3.0/markers?q=${searchInput}&location=46.711670,24.640437&key=${apiKey}&locale=en_SA`
          )
          .then((res) => {
            setdatamarker(res.data.result.items[0]);
          })
      );
  }, [searchInput]);

  return (
    <>
      <div className="w-full h-[70vh]">
        <MapWrapper />
        <div className="flex flex-row w-[400px] gap-1 box-border"></div>
        <input
          type="text"
          id="search"
          className="m-1 p-2"
          onChange={(e) => {
            // console.log(e.target.value);
            if (e.target.value != "") {
              setclassN("visible");
              setsearchInput(e.target.value);
            } else {
              setclassN("invisible");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPlaces(data);
            }
            // setsearchInput(e.target.value);
          }}
        />
        <div id="suggest" className={`${classN}`}>
          {data.length > 0 ? (
            data.map((res) => {
              return (
                <p
                  className="cursor-pointer hover:bg-slate-400"
                  key={res.id}
                  onClick={() => {
                    setcent([datamarker.lon, datamarker.lat]);
                    localStorage.setItem("lon", datamarker.lon);
                    localStorage.setItem("lat", datamarker.lat);
                    setclassN("invisible");
                  }}
                  title={res.address_name}
                >
                  {res.name}
                </p>
              );
            })
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      </div>

      {places.map((el, i) => {
        return (
          <ul
            key={i}
            className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-full"
          >
            <li>Name: {el.name}</li>
            <li>Location: {el.address_name}</li>
            <li>Type: {el.type}</li>
          </ul>
        );
      })}
    </>
  );
}

export default ShowMap;
