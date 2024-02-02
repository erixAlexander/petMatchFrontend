import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Home from "./Pages/Desktop/Home/Home.jsx";
import Onboarding from "./Pages/Desktop/Onboarding/Onboarding.jsx";
import Dashboard from "./Pages/Desktop/Dashboard/Dashboard.jsx";
import Profile from "./Pages/Desktop/Profile/Profile.jsx";
import PersistLogin from "./Components/PersistLogin.jsx";
import ExpoPage from "./Pages/Cellphone/ExpoPage/ExpoPage.jsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}>
        <Route path="expogo" element={<ExpoPage />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
