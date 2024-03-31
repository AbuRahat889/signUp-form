import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import About from "./Components/About/About.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import { HelmetProvider } from "react-helmet-async";
import SignUp from "./Components/SignUp/SignUp.jsx";

const router = new createBrowserRouter([
  {
    path:'/',
    element:<App></App>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/about',
        element:<About></About>
      },
      {
        path:'/signin',
        element:<SignIn></SignIn>
      },
      {
        path:'/signup',
        element:<SignUp></SignUp>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router}></RouterProvider>
    </HelmetProvider>
    
  </React.StrictMode>
);
