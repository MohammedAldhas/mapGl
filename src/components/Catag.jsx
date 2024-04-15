/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey } from "../../public/info";

function Catag(props) {
  const [markers, setMarkers] = useState([]);
  const [types, settypes] = useState("branch");
  const [markerPoint] = useState([]);
  useEffect(() => {
    let bounds;
    if (props.maping) {
      bounds = props.maping.getBounds();
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
      axios
        .get(
          `https://catalog.api.2gis.com/3.0/markers?type=${types}&polygon=POLYGON((${polygonGeom}))&key=${apiKey}&locale=en_SA`
        )
        .then((res) => {
          setMarkers(res.data.result.items);
        });
    }
  }, [types]);

  function comparefunc(type) {
    settypes(type);

    props.maping.setZoom(16, {
      animate: true,
      duration: 500,
      easing: "linear",
    });
    if (markerPoint.length > 0) {
      markerPoint.forEach((mrk) => {
        mrk.destroy();
      });
    }
    if (markers) {
      markers.map((w) => {
        markerPoint.push(
          new props.mapingGl.Marker(props.maping, {
            coordinates: [w.lon, w.lat],
          })
        );
      });
    }
  }

  return (
    <div className="box-border p-3 shadow m-2 border-2 border-solid border-[#00000037] rounded-xl w-[280px] text-sm absolute bottom-0 right-10 bg-[#f5deb3c4]">
      <ul className="flex flex-row justify-between">
        <li
          className="cursor-pointer"
          onClick={(e) => comparefunc(e.target.innerText)}
        >
          branch
        </li>
        <li
          className="cursor-pointer"
          onClick={(e) => comparefunc(e.target.innerText)}
        >
          building
        </li>
        <li
          className="cursor-pointer"
          onClick={(e) => comparefunc(e.target.innerText)}
        >
          street
        </li>
        <li
          className="cursor-pointer"
          onClick={(e) => comparefunc(e.target.innerText)}
        >
          org
        </li>
        <li
          className="cursor-pointer"
          onClick={(e) => comparefunc(e.target.innerText)}
        >
          station
        </li>
      </ul>
    </div>
  );
}

export default Catag;
