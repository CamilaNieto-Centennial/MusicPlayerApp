import { MdFavoriteBorder, MdFavorite, MdOutlineNotifications, MdNotifications } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { McSearchbar } from "./McSearchbar/McSearchbar";
import profile from "../../assets/profile.jpeg";
import { useState } from "react";

export const McNavbar = () => {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleNavigation = (route: string) => {
    // setIsOpen(false);
    navigate(route);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-6 w-full px-8 py-4">
        <div className="flex flex-row gap-4">
          <p onClick={() => handleNavigation("/music")} className="cursor-pointer text-zinc-100 font-medium hover:text-primary500 hover:font-semibold hover:scale-105 transition-all duration-150">MUSIC</p>
          <p onClick={() => handleNavigation("/podcasts")} className="cursor-pointer text-zinc-100 font-medium hover:text-primary500 hover:font-semibold hover:scale-105 transition-all duration-150">PODCAST</p>
          <p onClick={() => handleNavigation("/live")} className="cursor-pointer text-zinc-100 font-medium hover:text-primary500  hover:font-semibold hover:scale-105 transition-all duration-150">LIVE</p>
        </div>
        <McSearchbar />
        <div className="flex flex-row items-center gap-5">
          <div
            onMouseEnter={() => setHoveredIcon("fav")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handleNavigation("/favourites")}
            className="transition-transform duration-100 hover:scale-110 cursor-pointer"
          >
            {hoveredIcon === "fav" ? (
              <MdFavorite className="text-danger-500 w-7 h-7" />
            ) : (
              <MdFavoriteBorder className="text-zinc-100 w-7 h-7" />
            )}
          </div>
          <div
            onMouseEnter={() => setHoveredIcon("bell")}
            onMouseLeave={() => setHoveredIcon(null)}
            className="transition-transform duration-100 hover:scale-110 cursor-pointer"
          >
            {hoveredIcon === "bell" ? (
              <MdNotifications className="text-amber-500 w-7 h-7" />
            ) : (
              <MdOutlineNotifications className="text-zinc-100 w-7 h-7" />
            )}
          </div>
          <img
            alt="icon"
            className="w-9 h-9 rounded-full"
            src={profile}
          />
        </div>
      </div>
    </>
  )
}