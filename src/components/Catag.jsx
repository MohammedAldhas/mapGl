/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useMyHook from "../hooks/useMyHook";
import blueSt from "../icons/Station.svg";
import br from "../icons/restaurant.svg";
import bc from "../icons/cafe.svg";
import bm from "../icons/mall.svg";
import bh from "../icons/hotel.svg";
import bmo from "../icons/mosque.svg";

import reds from "../icons/Station1.svg";
import redr from "../icons/restaurant1.svg";
import redc from "../icons/cafe1.svg";
import redm from "../icons/mall1.svg";
import redh from "../icons/hotel1.svg";
import redmo from "../icons/mosque1.svg";

export default function Catag({ maping, mapingGl, clicked }) {
  const [polygonGeom, setPolygonGeom] = useState("");
  const [types, setTypes] = useState("");
  const [markerPoint] = useState([]);
  const [showMAarker] = useState([]);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("hidden");
  // const [storeData, setstoreData] = useState([]);
  const { data, loading, error } = useMyHook(
    `https://catalog.api.2gis.com/3.0/items?q=${types}&polygon=POLYGON((${polygonGeom}))&fields=items.point&key=demo&locale=en_SA`
  );

  useEffect(() => {
    if (maping) {
      const bounds = maping.getBounds();
      if (bounds) {
        const northEast = bounds.northEast;
        const southWest = bounds.southWest;

        setPolygonGeom(
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
            northEast[1] +
            "," +
            northEast[0] +
            " " +
            southWest[1]
        );
      }
    }
  }, [types]);

  function comparefunc(data) {
    if (markerPoint.length > 0) {
      markerPoint.forEach((mrk) => {
        mrk.destroy();
      });
    }

    let m = icons[`${types}`];
    data?.map((w) => {
      markerPoint.push(
        new mapingGl.Marker(maping, {
          coordinates: [w.point.lon, w.point.lat],
          icon: m,
        })
      );
    });
  }

  function deletMarkers() {
    if (markerPoint.length > 0) {
      markerPoint.forEach((mrk) => {
        mrk.destroy();
      });
    }
    if (showMAarker.length > 0) {
      showMAarker.forEach((mrk) => {
        mrk.destroy();
      });
    }
  }

  if (maping) {
    maping.on("click", () => {
      setClassName("hidden");
      deletMarkers();
    });
  }

  const icons = {
    restaurant: br,
    cafe: bc,
    mall: bm,
    hotel: bh,
    station: blueSt,
    mosque: bmo,
  };

  const redIcons = {
    restaurant: redr,
    cafe: redc,
    mall: redm,
    hotel: redh,
    station: reds,
    mosque: redmo,
  };

  const lists = [
    { id: 1, text: "restaurants", icon: "restaurant" },
    { id: 2, text: "cafes", icon: "local_cafe" },
    { id: 3, text: "malls", icon: "local_mall" },
    { id: 4, text: "hotels", icon: "hotel" },
    { id: 5, text: "stations", icon: "local_gas_station" },
    { id: 6, text: "mosques", icon: "mosque" },
  ];

  const listsElement = lists.map((list) => (
    <li
      key={list.id}
      className="cursor-pointer shadow px-3 h-8 rounded-full flex justify-center items-center gap-1 bg-white align-middle hover:bg-slate-100"
      onClick={(e) => {
        if (e.target.nodeName == "P") {
          setTypes(e.target.innerText.slice(0, -1));
        } else {
          setTypes(e.target.previousElementSibling.innerText.slice(0, -1));
        }

        if (maping && maping.getZoom() >= 15) {
          comparefunc(data?.items);
          setMessage("There is no places in currunt area");
        } else {
          setMessage("The Zoom is too far, Please be click here");
          deletMarkers();
        }
        clicked(e);
        setClassName("block");
      }}
    >
      <p>{list.text}</p>
      <span className="material-symbols-outlined">{list.icon}</span>
    </li>
  ));

  if (error) {
    console.error(error);
    return null;
  }

  const textDataList = data?.items.map((dat, ind) => {
    function showOnMap() {
      if (showMAarker.length > 0) {
        showMAarker.forEach((mrk) => {
          mrk.destroy();
        });
      }
      showMAarker.push(
        new mapingGl.Marker(maping, {
          coordinates: [dat.point.lon, dat.point.lat],
          icon: redIcons[`${types}`],
        })
      );
    }
    return (
      <p
        className="text-center rounded-md hover:bg-slate-400 hover:cursor-pointer"
        key={ind}
        title={dat.address_name}
        onMouseEnter={showOnMap}
        onClick={() => {
          setClassName("hidden");

          if (markerPoint.length > 0) {
            markerPoint.forEach((mrk) => {
              mrk.destroy();
            });
          }
          // showOnMap();

          maping.setCenter([dat.point.lon, dat.point.lat], {
            animate: true,
            duration: 500,
            easing: "linear",
          });
          maping.setZoom(19, {
            animate: true,
            duration: 800,
            easing: "linear",
          });
        }}
      >
        {dat.name}
        <hr />
      </p>
    );
  });

  return (
    <div className="absolute bottom-2 right-12 box-border" id="scrollStyling">
      <div
        className={`bg-white w-full h-80 mb-2 rounded-lg overflow-auto text-center font-bold ${className}`}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : maping && maping.getZoom() >= 15 && data ? (
          textDataList
        ) : (
          <span className="cursor-pointer" onClick={() => maping.setZoom(15)}>
            {message}
          </span>
        )}
      </div>
      <ul className="flex flex-row-reverse justify-between gap-1">
        {listsElement}
      </ul>
    </div>
  );
}
