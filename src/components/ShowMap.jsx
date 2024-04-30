/* eslint-disable react/prop-types */
import "../App.css";
import { load } from "@2gis/mapgl";
import { useEffect, useState } from "react";
import MapWrapper from "./MapWrapper";
import { apiKey } from "../../public/info";
import Suggest from "./Suggest";
import axios from "axios";
import useMyHook from "../hooks/useMyHook";
import PlacesInfo from "./PlacesInfo";
import Catag from "./Catag";

export default function ShowMap({ onMapClick }) {
  const [classN, setclassN] = useState("invisible");
  const [classpopup, setclasspopup] = useState("-left-[80%]");
  const [searchInput, setsearchInput] = useState("");
  const [places, setPlaces] = useState([]);
  const [cent, setcent] = useState([]);
  const [maping, setmaping] = useState(null);
  const [mapingGl, setmapingGl] = useState(null);
  const [showMarker] = useState([]);
  const [region, setRegion] = useState([]);
  const {
    data: data,
    loading,
    error,
  } = useMyHook(
    `https://catalog.api.2gis.com/3.0/suggests?q=${searchInput}&fields=items.point,items.region_id&location=46.711670,24.640437&key=${apiKey}&locale=en_SA`
  );
  if (error) {
    console.error(error);
  }
  if (maping) {
    // click handel map click

    maping.on("click", (e) => {
      const clickedLngLat = e.lngLat;
      onMapClick(clickedLngLat);
      setclassN("invisible");
      setclasspopup("-left-[80%]");

      if (showMarker.length > 0) {
        showMarker.map((e) => {
          e.destroy();
        });
      }

      showMarker.push(
        new mapingGl.Marker(maping, {
          coordinates: [clickedLngLat[0], clickedLngLat[1]],
        })
      );
    });
  }
  const dirBtn = `<button class="box-border shadow rounded-lg px-3 py-1 bg-white hover:bg-slate-100 flex items-center">
      <span class="material-symbols-outlined">
      route
      </span>
    </button>`;

  // show map
  useEffect(() => {
    load().then((mapglAPI) => {
      let map = new mapglAPI.Map("map-container", {
        center: [46.714382, 24.644584],
        zoom: 12,
        key: apiKey,
        zoomControl: "bottomRight",
        floorControl: "bottomLeft",
      });
      setmaping(map);

      setmapingGl(mapglAPI);

      const control = new mapglAPI.Control(map, dirBtn, {
        position: "topLeft",
      });

      control
        .getContainer()
        .querySelector("button")
        .addEventListener("click", () => {
          dirfunc(map);
        });
    });

    return () => maping && maping.destroy();
  }, []);

  useEffect(() => {
    if (cent.length > 0 && maping) {
      maping.setCenter(cent, {
        animate: true,
        duration: 900,
        easing: "linear",
      });

      setTimeout(() => {
        maping.setZoom(17, {
          animate: true,
          duration: 5000,
          easing: "linear",
        });
      }, 800);

      showMarker.push(
        new mapingGl.Marker(maping, {
          coordinates: [cent[0], cent[1]],
        })
      );
    }
  }, [cent, maping]);
  console.log(data);
  // ==================================================

  useEffect(() => {
    if (searchInput == "") {
      return;
    }

    axios
      .get(
        `https://catalog.api.2gis.com/2.0/region/list?q=${searchInput}&key=${apiKey}&locale=en_SA`
      )
      .then((res) => {
        console.log(res);
        setRegion(res.data.result.items);
      });
  }, [searchInput]);

  function clickOnSuggestion(arr) {
    setcent(arr);
    setclassN("invisible");
  }

  function goToLoc(point) {
    if (places) {
      setcent([point.lon, point.lat]);
    }
  }

  function catagClicked(e) {
    setsearchInput("");
    // console.log(e.target.nodeName);
    if (e.target.nodeName == "P") {
      setsearchInput(e.target.innerText);
    } else {
      setsearchInput(e.target.previousElementSibling.innerText);
    }
  }

  function dirfunc(m) {
    m.on("click", (e) => {
      console.log(e.lngLat);
    });
  }
  return (
    <>
      <div className="w-full h-[100vh]">
        <MapWrapper />
        <input
          value={searchInput}
          type="text"
          placeholder="search here..."
          id="search"
          className="box-border m-1 p-2 border border-solid border-[#a68cfa75]"
          onChange={(e) => {
            if (e.target.value != "") {
              setclassN("visible");
              setsearchInput(e.target.value);
            } else {
              setclassN("invisible");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPlaces(data?.items);
              setclasspopup("left-0");
              setclassN("invisible");
            }
          }}
        />
        <div id="suggest" className={`${classN} text-center font-semibold`}>
          {data ? (
            data?.items.map((res, id) => {
              return (
                <div key={id}>
                  <Suggest
                    id={res.id}
                    address_name={res.address_name}
                    name={res.name}
                    handle={() => {
                      clickOnSuggestion([res.point.lon, res.point.lat]);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      </div>
      <Catag maping={maping} mapingGl={mapingGl} clicked={catagClicked} />
      <div
        className={`box-border absolute top-[1px] transition-[${classpopup}] ease-in-out duration-700 ${classpopup} w-[550px] h-[99vh] overflow-auto bg-white z-50 box-border`}
        id="scrollStyling"
      >
        <div className="w-full flex justify-end items-center sticky top-1 right-1">
          <div
            className="bg-red-400 w-[25px] h-[25px] rounded-full  cursor-pointer flex justify-center items-center text-zinc-200 hover:scale-105 hover:bg-red-700"
            onClick={() => {
              setclasspopup("-left-[80%]");
            }}
          >
            <p>X</p>
          </div>
        </div>

        {/* all places info */}
        {places.map((el, i) => {
          //take region id from suggest API
          let datamap = data?.items.map((d) => {
            return d.region_id;
          });
          // To compare it with region API
          let regions = region.filter((reg) => datamap.includes(reg.id));

          // console.log(region);
          // This shows when you press Enter
          return (
            <PlacesInfo
              handel={() => {
                goToLoc(el.point);
              }}
              key={i}
              name={el.name}
              address_name={el.address_name}
              type={el.type}
              region={
                regions.length > 0 ? regions.map((re) => re.name) : "Unknown"
              }
            />
          );
        })}
      </div>
    </>
  );
}
