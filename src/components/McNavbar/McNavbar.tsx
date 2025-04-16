import { MdFavoriteBorder, MdFavorite, MdOutlineNotifications, MdNotifications, MdMenu, MdClose, MdOutlineHome, MdOutlineCategory, MdQueueMusic, MdPersonOutline, MdLogout, MdLibraryMusic, MdGraphicEq, MdLiveTv } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { McSearchbar } from "./McSearchbar/McSearchbar";
import profile from "../../assets/profile.jpeg";
import whiteLogo from "../../assets/logo/white_logo.png";
import { useState } from "react";

const iconStyles =
  `min-w-7 w-7 min-h-7 h-7 text-zinc-100 transition-transform duration-100  hover:scale-110 hover:text-primary500`;

export const McNavbar = () => {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (route: string) => {
    setMobileMenuOpen(false);
    navigate(route);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-6 w-full px-8 py-4">
        {/* Mobile hamburger menu toggle */}
        <div
          className="block sm:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MdMenu className="text-zinc-100 w-7 h-7" />
        </div>

        <img
          alt="logo"
          className="block sm:hidden w-fit h-10"
          src={whiteLogo}
        />

        {/* Navbar menu */}
        <div className="hidden sm:flex flex-row gap-4 w-fit justify-start">
          <p onClick={() => handleNavigation("/music")} className="cursor-pointer text-zinc-100 font-medium hover:text-primary500 hover:font-semibold hover:scale-105 transition-all duration-150">MUSIC</p>
          <p onClick={() => handleNavigation("/podcasts")} className="cursor-pointer text-zinc-100 font-medium hover:text-primary500 hover:font-semibold hover:scale-105 transition-all duration-150">PODCAST</p>
          <p onClick={() => handleNavigation("/live")} className="cursor-pointer text-zinc-100 font-medium hover:text-primary500  hover:font-semibold hover:scale-105 transition-all duration-150">LIVE</p>
        </div>

        {/* Searchbar visible on larger screens */}
        <div className="hidden md:block w-full max-w-[38rem]">
          <McSearchbar />
        </div>

        {/* Profile and notifications */}
        <div className="flex flex-row items-center gap-5 w-fit min-w-[5rem] sm:min-w-[8.5rem]">
          <div
            onMouseEnter={() => setHoveredIcon("fav")}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handleNavigation("/favourites")}
            className="hidden sm:block transition-transform duration-100 hover:scale-110 cursor-pointer"
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

        {/* Mobile menu - Conditional rendering */}
        {isMobileMenuOpen && (
          <div className="sm:hidden fixed top-0 left-0 w-full h-screen bg-zinc-900 bg-opacity-100 flex flex-col pt-16 px-8 py-6 gap-9 z-50 transition-all duration-300 transform opacity-100">
            {/* Close button */}
            <div className="absolute top-4 right-4">
              <MdClose
                className="text-zinc-100 w-8 h-8 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>

            {/* Menu items */}
            <McSearchbar className="w-fit" isSmall isShow={true} />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div onClick={() => handleNavigation("/")} className="flex flex-row gap-4">
                  <MdOutlineHome className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Home</p>
                </div>
                <div onClick={() => handleNavigation("/genres")} className="flex flex-row gap-4">
                  <MdOutlineCategory className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Genres</p>
                </div>
                <div onClick={() => handleNavigation("/albums")} className="flex flex-row gap-4">
                  <MdQueueMusic className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Albums</p>
                </div>
                <div onClick={() => handleNavigation("/artists")} className="flex flex-row gap-4">
                  <MdPersonOutline className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Artists</p>
                </div>
                <div onClick={() => handleNavigation("/favourites")} className="flex flex-row gap-4">
                  <MdFavoriteBorder className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Favourites</p>
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-6">
                <div onClick={() => handleNavigation("/music")} className="flex flex-row gap-4">
                  <MdLibraryMusic className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Music</p>
                </div>
                <div onClick={() => handleNavigation("/podcasts")} className="flex flex-row gap-4">
                  <MdGraphicEq className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Podcast</p>
                </div>
                <div onClick={() => handleNavigation("/live")} className="flex flex-row gap-4">
                  <MdLiveTv className={iconStyles} size={24} />
                  <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-primary500">Live</p>
                </div>
              </div>
              <hr />
              <div onClick={() => handleNavigation("/")} className="flex flex-row gap-4">
                <MdLogout className={iconStyles} size={24} />
                <p className="cursor-pointer text-zinc-100 text-xl font-medium hover:text-danger800">Logout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}