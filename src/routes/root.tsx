import { useLocation, Outlet } from "react-router-dom";
import React from 'react'
import { Sidebar } from "../components"

const getSectionName = (pathname: string): string => {
  switch (pathname) {
    case "/home":
      return "Home";
    case "/genres":
      return "Genres";
    case "/albums":
      return "Albums";
    case "/artists":
      return "Artists";
    case "/favourites":
      return "Favourites";
    // case "/reports":
    // case "/reports/jobs":
    // case "/reports/leads":
    // case "/reports/sales":
    // case "/reports/items":
    //   return "Reports";
    default:
      return "";
  }
};

export default function Root() {
  const { pathname } = useLocation();
  const sectionTitle = getSectionName(pathname);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Outlet />
    </div>
  )
}
