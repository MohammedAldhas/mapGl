// import { useEffect, useState } from "react";
import {useRouterLinks} from "../hooks/useRouterLinks.jsx";
import {RouterProvider} from "react-router-dom";


export default function Router() {
    const {router} = useRouterLinks();

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}
