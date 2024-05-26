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
// import ssm from "../icons/image (3).svg";
import {BASE_URL} from "../constants/Constants.js";

import myloc from "../icons/blue.svg";
export default function ShowMap({ onMapClick, map, mapglAPI }) {
  const [classN, setclassN] = useState("invisible");
  const [classpopup, setclasspopup] = useState("-left-[80%]");
  const [searchInput, setsearchInput] = useState("");
  const [places, setPlaces] = useState([]);
  const [cent, setcent] = useState([]);
  // const [map, setMap] = useState(null);
  // const [mapglAPI, setMapglAPI] = useState(null);
  const [showMarker] = useState([]);
  const [region, setRegion] = useState([]);

  const [myLoc, setmyLoc] = useState({
    points: [],
    marker: "",
  });
  const {
    data: data,
    loading,
    error,
  } = useMyHook(
      BASE_URL + `/suggests?q=${searchInput}&fields=items.point,items.region_id&location=46.711670,24.640437&key=${apiKey}&locale=en_SA`
  );
  if (error) {
    console.error(error);
  }
  if (map) {
    // click handel map click

    map.on("click", (e) => {
      const clickedLngLat = e.lngLat;
      onMapClick(clickedLngLat);
      setclassN("invisible");
      setclasspopup("-left-[80%]");

      if (showMarker.length > 0) {
        showMarker.map((e) => {
          e.destroy();
        });
      }
    });
  }
  const dirBtn = `<button class="box-border shadow rounded-lg px-3 py-1 bg-white hover:bg-slate-100 flex items-center">
  <span class="material-symbols-outlined">
  my_location
  </span>
    </button>`;


  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(() => {
  //       setmyLoc({
  //         ...myLoc,
  //         marker: new mapglAPI.Marker(map, {
  //           coordinates: myLoc.points,
  //           icon: myloc,
  //         }),
  //       });
  //       // console.log(myLoc.points);
  //     });
  //   }
  // }, [myLoc]);
  // show map
  // useEffect(() => {
  //   load().then(async (mapglAPI) => {
  //     let map = await new mapglAPI.Map("map-container", {
  //       center: [46.6738685, 24.7105117],
  //       zoom: 17,
  //       key: apiKey,
  //       zoomControl: "bottomRight",
  //       floorControl: "topCenter",
  //       pitch: '45'
  //     });
  //
  //     // if ("geolocation" in navigator) {
  //     //   navigator.geolocation.getCurrentPosition(function (position) {
  //     //     let latitude = position.coords.latitude;
  //     //     let longitude = position.coords.longitude;
  //     //
  //     //     setmyLoc({
  //     //       ...myLoc,
  //     //       points: [],
  //     //     });
  //     //     setmyLoc({
  //     //       ...myLoc,
  //     //       points: [longitude, latitude],
  //     //     });
  //     //   });
  //     // } else console.log("no access");
  //
  //     setMap(map);
  //     setMapglAPI(mapglAPI);
  //
  //     window.localStorage["map"] = map;
  //     window.localStorage["mapglAPI"] = mapglAPI;
  //
  //     // const control = new mapglAPI.Control(map, dirBtn, {
  //     //   position: "bottomLeft",
  //     // });
  //
  //     // control
  //     //   .getContainer()
  //     //   .querySelector("button")
  //     //   .addEventListener("click", (e) => {
  //     //     if ("geolocation" in navigator) {
  //     //       navigator.geolocation.getCurrentPosition(function (position) {
  //     //         let latitude = position.coords.latitude;
  //     //         let longitude = position.coords.longitude;
  //     //         console.log(position);
  //     //         console.log(e);
  //     //         map.setCenter([longitude, latitude], {
  //     //           animate: true,
  //     //           duration: 400,
  //     //           easing: "linear",
  //     //         });
  //     //         map.setZoom(17, {
  //     //           animate: true,
  //     //           duration: 400,
  //     //           easing: "linear",
  //     //         });
  //     //       });
  //     //     }
  //     //   });
  //   });
  //
  //   return () => map && map.destroy();
  // }, []);

  useEffect(() => {
    if (cent.length > 0 && map) {
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

      showMarker.push(
        new mapglAPI.Marker(map, {
          coordinates: [cent[0], cent[1]],
        })
      );
    }
  }, [cent, map]);

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
        // console.log(res);
        setRegion(res.data.result?.items);
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

  // function dirfunc(m) {
  //   m.on("click", (e) => {
  //     console.log("Fefjiewj");
  //   });
  // }
  return (
    <>
      <div className="w-full h-[100vh]">
        <MapWrapper/>

        <Suggest
            searchInput={searchInput}
            setclassN={setclassN}
            setsearchInput={setsearchInput}
            setPlaces={setPlaces}
            setclasspopup={setclasspopup}
            classN={classN}
            data={data}
            loading={loading}
            clickOnSuggestion={clickOnSuggestion}
        />

      </div>

      {/*<Catag map={map} mapglAPI={mapglAPI} clicked={catagClicked} />*/}

      {/*<div className={`box-border absolute top-[1px] transition-[${classpopup}] ease-in-out duration-700 ${classpopup} w-[550px] h-[99vh] overflow-auto bg-white z-50 box-border`} id="scrollStyling">*/}
      {/*  <div className="w-full flex justify-end items-center sticky top-1 right-1">*/}
      {/*    <div*/}
      {/*      className="bg-red-400 w-[25px] h-[25px] rounded-full  cursor-pointer flex justify-center items-center text-zinc-200 hover:scale-105 hover:bg-red-700"*/}
      {/*      onClick={() => {*/}
      {/*        setclasspopup("-left-[80%]");*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <p>X</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  /!* all places info *!/*/}
      {/*  {places.map((el, i) => {*/}
      {/*    //take region id from suggest API*/}
      {/*    let datamap = data?.items.map((d) => {*/}
      {/*      return d.region_id;*/}
      {/*    });*/}
      {/*    // To compare it with region API*/}
      {/*    let regions = region?.filter((reg) => datamap.includes(reg.id));*/}

      {/*    // console.log(region);*/}
      {/*    // This shows when you press Enter*/}
      {/*    return (*/}
      {/*      <PlacesInfo*/}
      {/*        handel={() => {*/}
      {/*          goToLoc(el.point);*/}
      {/*        }}*/}
      {/*        key={i}*/}
      {/*        name={el.name}*/}
      {/*        address_name={el.address_name}*/}
      {/*        type={el.type}*/}
      {/*        region={*/}
      {/*          regions?.length > 0 ? regions.map((re) => re.name) : "Unknown"*/}
      {/*        }*/}
      {/*      />*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}

    </>
  );
}
