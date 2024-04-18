/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey } from "../../public/info";

export default function Catag({ maping, mapingGl }) {
  const [types, settypes] = useState();
  const [markerPoint, setMarkerPoint] = useState([]);

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
          maping.setZoom(16, {
            animate: true,
            duration: 500,
            easing: "linear",
          });

          setTimeout(() => {
            settypes(e.target.innerText);
          }, 600);
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
      axios
        .get(
          `https://catalog.api.2gis.com/3.0/markers?type=${types}&polygon=POLYGON((${polygonGeom}))&key=demo&locale=en_SA`
        )
        .then((res) => {
          if (res.data.result.items.length > 500) {
            res.data.result.items.length = 500;
          }
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
      //   console.log(w);
      //   if (w.type === types) {
      markerPoint.push(
        new mapingGl.Marker(maping, {
          coordinates: [w.lon, w.lat],
        })
      );
      //   }
    });
  }

  return (
    <div className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute bottom-0 right-10 bg-[#f5deb3c4]">
      <ul className="flex flex-row justify-between">{listsElement}</ul>
    </div>
  );
}
