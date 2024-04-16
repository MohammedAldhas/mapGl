/* eslint-disable react/prop-types */
import "../App.css";
import { load } from "@2gis/mapgl";
import { useEffect, useState } from "react";
import MapWrapper from "./MapWrapper";
import { apiKey } from "../../public/info";
import Suggest from "./Suggest";
import axios from "axios";
import PlacesInfo from "./PlacesInfo";
import Catag from "./Catag";

function ShowMap({ onMapClick }) {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState([]);
  const [classN, setclassN] = useState("invisible");
  const [classpopup, setclasspopup] = useState("-left-[80%]");
  const [searchInput, setsearchInput] = useState("");
  const [places, setPlaces] = useState([]);
  const [cent, setcent] = useState([]);
  const [maping, setmaping] = useState(null);
  const [mapingGl, setmapingGl] = useState(null);

  useEffect(() => {
    load().then((mapglAPI) => {
      let map = new mapglAPI.Map("map-container", {
        center: [46.714382, 24.644584],
        zoom: 12,
        key: "042b5b75-f847-4f2a-b695-b5f58adc9dfd",
        zoomControl: "bottomRight",
        floorControl: "bottomLeft",
      });
      setmaping(map);

      setmapingGl(mapglAPI);
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

      new mapingGl.Marker(maping, {
        coordinates: [cent[0], cent[1]],
      });
    }
    if (maping) {
      // click handel map click
      maping.on("click", (e) => {
        const clickedLngLat = e.lngLat;
        onMapClick(clickedLngLat);
        setclassN("invisible");
      });
    }
  }, [cent, maping]);

  // ==================================================

  useEffect(() => {
    if (searchInput == "") {
      return;
    }
    axios
      .get(
        `https://catalog.api.2gis.com/3.0/suggests?q=${searchInput}&fields=items.point,items.region_id&location=46.711670,24.640437&key=${apiKey}&locale=en_SA`
      )
      .then((res) => {
        setData(res.data.result.items);
      })
      .then(
        axios
          .get(
            `https://catalog.api.2gis.com/2.0/region/list?q=${searchInput}&key=${apiKey}&locale=en_SA`
          )
          .then((res) => {
            setRegion(res.data.result.items);
          })
      );
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
  return (
    <>
      <div className="w-full h-[100vh]">
        <MapWrapper />
        <input
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
              setPlaces(data);
              setclasspopup("left-0");
              setclassN("invisible");
            }
          }}
        />
        <div id="suggest" className={`${classN}`}>
          {data.length > 0 ? (
            data.map((res, id) => {
              // console.log(res);
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
      <Catag maping={maping} mapingGl={mapingGl} />

      <div
        className={`box-border absolute top-[1px] transition-[${classpopup}] ease-in-out duration-700 ${classpopup} w-[550px] h-[99vh] overflow-auto bg-white z-50 box-border`}
        id="scrollStyling"
      >
        <div
          className="bg-red-400 w-[25px] h-[25px] rounded-full absolute top-0 right-1 cursor-pointer flex justify-center items-center text-zinc-200 hover:scale-105"
          onClick={() => {
            setclasspopup("-left-[80%]");
          }}
        >
          <p>X</p>
        </div>

        {/* all places info */}
        {places.map((el, i) => {
          //take region id from suggest API
          let datamap = data.map((d) => {
            return d.region_id;
          });
          // To compare it with region API
          let regions = region.filter((reg) => datamap.includes(reg.id));

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

export default ShowMap;
