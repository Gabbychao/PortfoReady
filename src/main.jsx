import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ContactForm from "./pages/ContactForm/ContactForm";
import RootLayout from "./Layout/RootLayout.jsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactForm />,
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
        path: "/jobpage",
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
