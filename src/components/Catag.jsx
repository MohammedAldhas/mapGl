/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey } from "../../public/info";

export default function Catag({ maping, mapingGl }) {
  const [markers, setMarkers] = useState([]);
  const [types, settypes] = useState();
  const [markerPoint] = useState([]);

  const lists = [
    { id: 1, text: "branch" },
    { id: 2, text: "building" },
    { id: 3, text: "street" },
    { id: 4, text: "org" },
    { id: 5, text: "station" },
  ];

  const listsElement = lists.map((list) => {
    return (
      <li
        key={list.id}
        className="cursor-pointer"
        onClick={(e) => {
          settypes(e.target.innerText);
        }}
      >
        {list.text}
      </li>
    );
  });

  useEffect(() => {
    let bounds;
    if (maping) {
      bounds = maping.getBounds();
      maping.setZoom(16, {
        animate: true,
        duration: 500,
        easing: "linear",
      });
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

      // `https://catalog.api.2gis.com/3.0/items/geocode?polygon=POLYGON((${polygonGeom}))&fields=items.point&key=${apiKey}&locale=en_SA`
      //   https://catalog.api.2gis.com/3.0/markers?type=${types}&polygon=POLYGON((${polygonGeom}))&key=${apiKey}&locale=en_SA
      axios
        .get(
          `https://catalog.api.2gis.com/3.0/items/geocode?polygon=POLYGON((${polygonGeom}))&fields=items.point&key=${apiKey}&locale=en_SA`
        )
        .then((res) => {
          //   console.log(res.data.meta);
          setMarkers(res.data.result.items);
        })
        .then(() => {
          comparefunc();
        });
    }
  }, [types]);

  function comparefunc() {
    if (markerPoint.length > 0) {
      markerPoint.forEach((mrk) => {
        mrk.destroy();
      });
    }
    if (markers) {
      markers.map((w) => {
        console.log(w.type);
        if (w.type === types) {
          markerPoint.push(
            new mapingGl.Marker(maping, {
              coordinates: [w.point.lon, w.point.lat],
            })
          );
        }
      });
    }
  }

  return (
    <div className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute bottom-0 right-10 bg-[#f5deb3c4]">
      <ul className="flex flex-row justify-between">{listsElement}</ul>
    </div>
  );
}
