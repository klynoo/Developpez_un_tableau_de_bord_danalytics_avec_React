import { createBrowserRouter, Outlet } from "react-router-dom";
import MainContent from "./Dashboard/MainContent";
import UserDataProvider from "./context/UserDataContext";
import Header from "./Components/Layout/Header";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "user/:id",
        element: (
          <UserDataProvider>
            <MainContent />
          </UserDataProvider>
        ),
      },
    ],
  },
]);
