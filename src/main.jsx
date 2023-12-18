import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ContactForm from "./pages/ContactForm/ContactForm";
import RootLayout from "./Layout/RootLayout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import StudentProfile from "./pages/Profile/StudentProfile";
import EmployerProfile from "./pages/Profile/EmployerProfile";
import Applicants from "./pages/Profile/Applicants";
import JobPage from "./pages/JobPage/JobPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserRole from "./pages/Register/UserRole";
import Register from "./pages/Register/Register";
import JobList from "./pages/JobList/JobList";
import EditStudent from "./pages/EditProfile/EditStudent";
import EditEmployer from "./pages/EditProfile/EditEmployer";
import { AuthProvider } from "./hooks/useAuth";
import axios from "axios";
import Dashboard from "./pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/studentprofile",
        element: <StudentProfile />,
      },
      {
        path: "/employerprofile",
        element: <EmployerProfile />,
      },
      {
        path: "/employerprofile/applicants",
        element: <Applicants />,
      },
      {
        path: "/jobpage/:postId",
        element: <JobPage />,
      },
      {
        path: "/joblist",
        element: <JobList />,
      },
      {
        path: "/editstudent",
        element: <EditStudent />,
      },
      {
        path: "/editemployer",
        element: <EditEmployer />,
      },
    ],
  },
  {
    path: "/landingpage",
    element: <LandingPage />,
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path: "/contact",
    element: <ContactForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/userrole",
    element: <UserRole />,
  },
  {
    path: "/userrole/register",
    element: <Register />,
  },
]);

const theme = createTheme({
  palette: {
    gray: {
      main: "#000000",
    },
  },
});

axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);