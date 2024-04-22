/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

export default function Catag({ maping, mapingGl, clicked }) {
  const [types, settypes] = useState();
  const [markerPoint] = useState([]);
  const [showMAarker] = useState([]);
  const [data, setdata] = useState([]);
  const [className, setclassName] = useState("hidden");
  const [loading, setloading] = useState("loading...");

  if (maping) {
    maping.on("click", () => {
      setclassName("hidden");
    });
  }
  const lists = [
    { id: 1, text: "restaurants", icon: "restaurant" },
    { id: 2, text: "cafes", icon: "local_cafe" },
    { id: 3, text: "malls", icon: "local_mall" },
    { id: 4, text: "hotels", icon: "hotel" },
    { id: 5, text: "stations", icon: "local_gas_station" },
    { id: 6, text: "mosques", icon: "mosque" },
  ];

  const listsElement = lists.map((list) => {
    return (
      <li
        key={list.id}
        className="cursor-pointer shadow px-3 h-8 rounded-full flex justify-center items-center gap-1 bg-white align-middle hover:bg-slate-100"
        onClick={(e) => {
          setdata([]);
          settypes("");
          //   maping.setZoom(15, {
          //     animate: true,
          //     duration: 500,
          //     easing: "linear",
          //   });

          setTimeout(() => {
            if (e.target.nodeName == "P") {
              settypes(e.target.innerText.slice(0, -1));
            } else {
              settypes(e.target.previousElementSibling.innerText.slice(0, -1));
            }
          }, 600);
          clicked(e);

          setclassName("block");
          setloading("loading...");
          setTimeout(() => {
            setloading("There is no places in currunt area");
          }, 1000);
        }}
      >
        <p>{list.text}</p>
        <span className="material-symbols-outlined">{list.icon}</span>
      </li>
    );
  });

  useEffect(() => {
    let bounds;
    if (maping) {
      bounds = maping.getBounds();
    }
    if (bounds) {
      let northEast = bounds.northEast;
      let southWest = bounds.southWest;

      let polygonGeom =
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
        southWest[1];

      // https://catalog.api.2gis.com/3.0/items?polygon=POLYGON((${polygonGeom}))&fields=items.point&key=${apiKey}
      // `https://catalog.api.2gis.com/3.0/items/geocode?polygon=POLYGON((${polygonGeom}))&fields=items.point&key=${apiKey}&locale=en_SA`
      //   https://catalog.api.2gis.com/3.0/markers?type=${types}&polygon=POLYGON((${polygonGeom}))&key=${apiKey}&locale=en_SA
      //   https://catalog.api.2gis.com/3.0/markers?type=${types}&polygon=POLYGON((${polygonGeom}))&fields=items.name_ex&key=demo&locale=en_SA
      axios
        .get(
          `https://catalog.api.2gis.com/3.0/items?q=${types}&polygon=POLYGON((${polygonGeom}))&fields=items.point&key=demo&locale=en_SA`
        )
        .then((res) => {
          setdata(res.data.result.items);
          comparefunc(res.data.result.items);
        });
    }
  }, [types]);

  function comparefunc(data) {
    if (markerPoint.length > 0) {
      markerPoint.forEach((mrk) => {
        mrk.destroy();
      });
    }
    data.map((w) => {
      markerPoint.push(
        new mapingGl.Marker(maping, {
          coordinates: [w.point.lon, w.point.lat],
          icon: "https://docs.2gis.com/img/mapgl/marker.svg",
        })
      );
    });
  }

  const textDataList = data.map((dat, ind) => {
    function showOnMap() {
      if (showMAarker.length > 0) {
        showMAarker.forEach((mrk) => {
          mrk.destroy();
        });
      }
      //   data.map((w) => {
      showMAarker.push(
        new mapingGl.Marker(maping, {
          coordinates: [dat.point.lon, dat.point.lat],
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
          setclassName("hidden");

          if (markerPoint.length > 0) {
            markerPoint.forEach((mrk) => {
              mrk.destroy();
            });
          }
          showOnMap;

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
        {textDataList.length > 0 ? textDataList.map((d) => d) : loading}
      </div>
      <ul className="flex flex-row-reverse justify-between gap-1">
        {listsElement}
      </ul>
    </div>
  );
}
