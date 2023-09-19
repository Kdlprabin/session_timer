import { createBrowserRouter } from "react-router-dom";
import { Home, Clock } from "./Page";
import Layout from "../layout";
import React from "react";

export const router = createBrowserRouter(
    [{
        path: "/",
        element: <Layout />,
        children: [{
            path: "/",
            element: <Home />
        },
        {
            path: "/clock",
            children: [{
                path: "/clock/:id",
                element: <Clock />
            }]
        }]
    }
    ]
);
