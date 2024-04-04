/* eslint-disable react/prop-types */
import "../App.css";
import { load } from "@2gis/mapgl";
import { useEffect, useState } from "react";
import MapWrapper from "./MapWrapper";
import { apiKey } from "../../public/info";
import Suggest from "./Suggest";
import axios from "axios";
import PlacesInfo from "./PlacesInfo";

function ShowMap({ onMapClick }) {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState([]);
  const [classN, setclassN] = useState("invisible");
  const [classpopup, setclasspopup] = useState("-left-[80%]");
  const [searchInput, setsearchInput] = useState("");
  const [places, setPlaces] = useState([]);
  const [cent, setcent] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [maping, setmaping] = useState(null);
  const [mapingGl, setmapingGl] = useState(null);
  const [pl, setpl] = useState([]);

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

      // THE PROBLEM IS HERE
      new mapingGl.Marker(maping, {
        coordinates: [cent[0], cent[1]],
      });
    }
    if (maping) {
      let bounds = maping.getBounds();

      if (bounds) {
        let northEast = bounds.northEast;
        let southWest = bounds.southWest;
        // let northEast = mapgl.getBounds().northEast;
        // let southWest = mapgl.getBounds().southWest;
        // n0 n1, n0 s1, s0 s1, s0 n1, n0 n1
        let polygonGeom =
          northEast[0] +
          " " +
          northEast[1] +
          "," +
          northEast[0] +
          " " +
          southWest[1] +
          "," +
          southWest[0] +
          " " +
          southWest[1] +
          "," +
          southWest[0] +
          " " +
          northEast[1] +
          "," +
          northEast[0] +
          " " +
          northEast[1];

        setpl(polygonGeom);

        axios
          .get(
            `https://catalog.api.2gis.com/3.0/items/geocode?polygon=POLYGON((${pl}))&fields=items.point&key=${apiKey}&locale=en_SA`
          )
          .then(maping.setZoom(16))
          .then((res) => {
            setMarkers(res.data.result.items);
          });
      }

      // click handel map click
      maping.on("click", (e) => {
        const clickedLngLat = e.lngLat;
        onMapClick(clickedLngLat);
      });
    }
  }, [cent, maping, pl]);

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

  function clickOnSuggestion(e, arr) {
    // console.log(arr[0], arr[1]);
    setcent(arr);

    setclassN("invisible");
    // setcent([res.point.lon, res.point.lat]);
    //                   setclassN("invisible");
  }

  function comparefunc(e) {
    // let coords = [];
    if (markers) {
      // console.log("Good");
      markers.map((w) => {
        if (w.type == e.target.innerText) {
          console.log(pl);
          console.log(w);
          new mapingGl.Marker(maping, {
            coordinates: [w.point.lon, w.point.lat],
            label: {
              text: `${w.full_name}`,
            },
          });
        }
      });
    }
  }

  return (
    <>
      <div className="w-full h-[100vh]">
        <MapWrapper />

        {/* <div className="flex flex-row w-[400px] gap-1 box-border"></div> */}
        <input
          type="text"
          placeholder="search here..."
          id="search"
          className="m-1 p-2 border border-solid border-[#a68cfa75]"
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
            }
          }}
        />
        <div id="suggest" className={`${classN}`}>
          {data.length > 0 ? (
            data.map((res) => {
              return (
                <>
                  <Suggest
                    id={res.id}
                    address_name={res.address_name}
                    name={res.name}
                    handle={(e) => {
                      clickOnSuggestion(e, [res.point.lon, res.point.lat]);
                    }}
                  />
                </>
              );
            })
          ) : (
            <p>No suggestions available.</p>
          )}
        </div>
      </div>
      <div className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute top-[110px] right-0 bg-[#f5deb3c4]">
        <ul className="flex flex-row justify-between">
          <li className="cursor-pointer" onClick={(e) => comparefunc(e)}>
            branch
          </li>
          <li className="cursor-pointer" onClick={(e) => comparefunc(e)}>
            building
          </li>
          <li className="cursor-pointer" onClick={(e) => comparefunc(e)}>
            street
          </li>
          <li className="cursor-pointer" onClick={(e) => comparefunc(e)}>
            org
          </li>
          <li className="cursor-pointer" onClick={(e) => comparefunc(e)}>
            station
          </li>
        </ul>
      </div>
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
