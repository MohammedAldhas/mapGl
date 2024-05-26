import {createBrowserRouter, createHashRouter} from 'react-router-dom';
// import {Register} from "../pages/Login/Register";
import Login from "../pages/Login";

import Landing from "../pages/Landing.jsx";
import Register from "../pages/Register.jsx";
import {useEffect, useState} from "react";
import {load} from "@2gis/mapgl";
import {apiKey} from "../../public/info.js";

export const useRouterLinks = () => {
    const [map, setMap] = useState(null);
    const [mapglAPI, setMapglAPI] = useState(null);

    useEffect(() => {
        load().then(async (mapglAPI) => {
            let map = await new mapglAPI.Map("map-container", {
                center: [46.6738685, 24.7105117],
                zoom: 17,
                key: apiKey,
                zoomControl: "bottomRight",
                floorControl: "topCenter",
                pitch: '45'
            });


            setMap(map);
            setMapglAPI(mapglAPI);

            window.localStorage["map"] = map;
            window.localStorage["mapglAPI"] = mapglAPI;

        });

        return () => map && map.destroy();
    }, []);

    const routerObjects =
        [
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: '/',
                element: <Landing map={map} mapglAPI={mapglAPI} />
            }
        ]
    // const router = createBrowserRouter(routerObjects);
    const router = createHashRouter(routerObjects);

    return {router};
};
