import { MdOutlineHome, MdOutlineCategory, MdQueueMusic, MdPersonOutline, MdFavoriteBorder, MdLogout } from "react-icons/md"
import { useAnimationControls, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import logoName from "../../assets/logo/white_name.png";
import icon from "../../assets/logo/white_icon.png";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react"

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

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open")
    } else {
      containerControls.start("close")
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
    <motion.aside
      animate={containerControls}
      className={`w-64 h-screen bg-zinc-900 text-zinc-100 flex flex-col justify-between px-4 py-6`}
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
  )
}