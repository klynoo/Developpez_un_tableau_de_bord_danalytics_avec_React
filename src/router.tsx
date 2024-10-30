import { createBrowserRouter, Outlet } from "react-router-dom";
import MainContent from "./Dashboard/MainContent";
import UserDataProvider from "./context/UserDataContext";

// import NotFound from "../pages/NotFound";
// import Home from "../pages/Home";
// import Header from "../layouts/Header";
// import Footer from "../layouts/Footer";
// import AccommodationDetail from "../components/AccomodationDetail";
// import APropos from "../pages/APropos";

export const router = createBrowserRouter([
  {
    element: (
      <>
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
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
