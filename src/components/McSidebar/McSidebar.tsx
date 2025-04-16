import { MdOutlineHome, MdOutlineCategory, MdQueueMusic, MdPersonOutline, MdFavoriteBorder, MdLogout } from "react-icons/md"
import { useAnimationControls, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import logoName from "../../assets/logo/white_name.png";
import icon from "../../assets/logo/white_icon.png";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react"
import { McSearchbar } from "../McNavbar/McSearchbar/McSearchbar";

const containerVariants = {
  close: {
    transition: {
      damping: 15,
      duration: 0.5,
      type: "spring",
    },
    width: "5rem",
  },
  open: {
    transition: {
      damping: 15,
      duration: 0.5,
      type: "spring",
    },
    width: "14rem",
  },
};

const iconStyles =
  `min-w-7 w-7 min-h-7 h-7 text-zinc-100 transition-transform duration-100  hover:scale-110`;

export const McSidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const [isTemporarilyFixed, setIsTemporarilyFixed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open")
      setIsTemporarilyFixed(true); // Always fixed while open
    } else {
      containerControls.start("close")
      // Delay unfixing sidebar until after the animation finishes (e.g., 500ms)
      setTimeout(() => {
        setIsTemporarilyFixed(false);
      }, 500); // Match this to your animation duration
    }
  }, [containerControls, isOpen]);

  const handleNavigation = (route: string) => {
    // setIsOpen(false);
    navigate(route);
  };

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isTemporarilyFixed && window.innerWidth < 768 && (
        <div
          style={{ width: isOpen ? "5rem" : "5rem", transition: "width 0.5s ease" }}
          className="shrink-0"
          aria-hidden="true"
        />
      )}
      <motion.aside
        animate={containerControls}
        className={`h-screen bg-zinc-900 text-zinc-100 flex flex-col justify-between px-4 py-6
        ${isTemporarilyFixed && window.innerWidth < 768 ? "fixed z-[100] top-0 left-0" : "relative"}
    ${isOpen && window.innerWidth < 768 ? "w-[14rem]" : ""}
      `}
        initial="close"
        variants={containerVariants}
      >
        <div className="flex flex-col gap-6">
          <div className="cursor-pointer flex" onClick={() => handleOpenClose()}>
            <img
              alt="icon"
              className="w-12 h-12"
              src={icon}
            />
            {isOpen ? (
              <img
                alt="logo"
                className="w-fit h-12"
                src={logoName}
              />
            ) : (
              <></>
            )}
          </div>
          <nav className="flex flex-col gap-3">
            <div className="block md:hidden w-full">
              <McSearchbar className="w-fit" isSmall isShow={isOpen} />
            </div>
            <Button
              size="lg"
              radius="sm"
              variant={location.pathname === "/home" ? "solid" : "light"}
              startContent={<MdOutlineHome className={iconStyles} size={24} />}
              className={`${location.pathname === "/home" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
              onPress={() => handleNavigation("/home")}
            >
              {isOpen && (
                <p className="text-zinc-100">Home</p>
              )}
            </Button>
            <Button
              size="lg"
              radius="sm"
              variant={location.pathname === "/genres" ? "solid" : "light"}
              startContent={<MdOutlineCategory className={iconStyles} size={24} />}
              className={`${location.pathname === "/genres" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
              onPress={() => handleNavigation("/genres")}
            >
              {isOpen && (
                <p className="text-zinc-100">Genres</p>
              )}
            </Button>
            <Button
              size="lg"
              radius="sm"
              variant={location.pathname === "/albums" ? "solid" : "light"}
              startContent={<MdQueueMusic className={iconStyles} size={24} />}
              className={`${location.pathname === "/albums" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
              onPress={() => handleNavigation("/albums")}
            >
              {isOpen && (
                <p className="text-zinc-100">Albums</p>
              )}
            </Button>
            <Button
              size="lg"
              radius="sm"
              variant={location.pathname === "/artists" ? "solid" : "light"}
              startContent={<MdPersonOutline className={iconStyles} size={24} />}
              className={`${location.pathname === "/artists" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
              onPress={() => handleNavigation("/artists")}
            >
              {isOpen && (
                <p className="text-zinc-100">Artists</p>
              )}
            </Button>
            <Button
              size="lg"
              radius="sm"
              variant={location.pathname === "/favourites" ? "solid" : "light"}
              startContent={<MdFavoriteBorder className={iconStyles} size={24} />}
              className={`${location.pathname === "/favourites" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
              onPress={() => handleNavigation("/favourites")}
            >
              {isOpen && (
                <p className="text-zinc-100">Favourites</p>
              )}
            </Button>
            <div className="sm:hidden w-full flex flex-col gap-3">
              <Button
                size="lg"
                radius="sm"
                variant={location.pathname === "/music" ? "solid" : "light"}
                startContent={<MdFavoriteBorder className={iconStyles} size={24} />}
                className={`${location.pathname === "/music" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
                onPress={() => handleNavigation("/music")}
              >
                {isOpen && (
                  <p className="text-zinc-100">Music</p>
                )}
              </Button>
              <Button
                size="lg"
                radius="sm"
                variant={location.pathname === "/podcasts" ? "solid" : "light"}
                startContent={<MdFavoriteBorder className={iconStyles} size={24} />}
                className={`${location.pathname === "/podcasts" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
                onPress={() => handleNavigation("/podcasts")}
              >
                {isOpen && (
                  <p className="text-zinc-100">Podcast</p>
                )}
              </Button>
              <Button
                size="lg"
                radius="sm"
                variant={location.pathname === "/live" ? "solid" : "light"}
                startContent={<MdFavoriteBorder className={iconStyles} size={24} />}
                className={`${location.pathname === "/live" ? "bg-primary700" : ""} justify-start min-w-fit px-2`}
                onPress={() => handleNavigation("/live")}
              >
                {isOpen && (
                  <p className="text-zinc-100">Live</p>
                )}
              </Button>
            </div>
          </nav>
        </div>
        <Button
          size="lg"
          radius="sm"
          variant="light"
          startContent={<MdLogout className={iconStyles} size={24} />}
          className={`hover:!bg-danger800 justify-start min-w-fit px-2`}
        >
          {isOpen && (
            <p className="text-zinc-100">Logout</p>
          )}
        </Button>
      </motion.aside>
    </>
  )
}