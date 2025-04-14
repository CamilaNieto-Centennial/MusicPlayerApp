import { Outlet } from "react-router-dom";
import { McSidebar, McNavbar } from "../components"

export default function Root() {
  return (
    <div className="flex h-screen overflow-x-hidden overflow-y-hidden">
      <McSidebar />
      <div className="flex flex-col w-full">
        <McNavbar />
        <Outlet />
      </div>
    </div>
  )
}
