import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React, { useEffect } from "react";
import { FastAverageColor } from 'fast-average-color';
import { MdFavorite, MdMoreHoriz, MdOutlineVolumeDown, MdOutlineVolumeMute, MdOutlineVolumeUp, MdPause, MdPlayArrow, MdRepeat, MdShuffle, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { songs } from "../constants/songs";
import { SongType } from "../types/songs";

type ColumnKey = "#" | "title" | "album" | "duration" | "actions";
export interface ColumnType {
  uid: string;
  name: string;
  maxWidth?: string
  minWidth?: string
  width?: string
}

export const columns: ColumnType[] = [
  { name: "#", uid: "#", width: "30px" },
  { name: "TITLE", uid: "title" },
  { name: "ALBUM", uid: "album", maxWidth: "180px" },
  { name: "DURATION", uid: "duration" },
  { name: "ACTIONS", uid: "actions", width: "80px" },
];

export default function Favourites() {
  const [currentSongIndex, setCurrentSongIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isShuffling, setIsShuffling] = React.useState(false);
  const [isRepeating, setIsRepeating] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [averageColor, setAverageColor] = React.useState('#ffffff');
  const [darkenHexColor, setDarkenHexColor] = React.useState('#ffffff');
  const fac = new FastAverageColor();

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = songs[currentSongIndex].avatar;

    img.onload = () => {
      const color = fac.getColor(img);
      setAverageColor(color.hex);
    };
    let darkenColor = (hex: string, amount: number = 0.9): string => {
      const parsed = hex.startsWith("#") ? hex.slice(1) : hex;
      const num = parseInt(parsed, 16);

      let r = (num >> 16) & 255;
      let g = (num >> 8) & 255;
      let b = num & 255;

      r = Math.max(0, Math.floor(r * (1 - amount)));
      g = Math.max(0, Math.floor(g * (1 - amount)));
      b = Math.max(0, Math.floor(b * (1 - amount)));

      return `rgb(${r}, ${g}, ${b})`;
    };
    setDarkenHexColor(darkenColor)
  }, [currentSongIndex]);

  const renderCell = React.useCallback((song: SongType, columnKey: ColumnKey) => {
    const cellValue = song[columnKey as keyof typeof song];

    switch (columnKey) {
      case "#":
        return (
          <p className="font-semibold text-sm capitalize">{song.id}</p>
        );
      case "title":
        return (
          <div className="flex flex-row gap-3">
            <div className="relative overflow-hidden rounded-md shadow-sm group">
              <img
                alt={song.title}
                className="w-12 h-12 rounded-md"
                src={song.avatar}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="p-3 rounded-full shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-in-out">
                  <MdPlayArrow className="text-white w-8 h-8" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm font-medium">{song.title}</p>
              <p className="text-xs font-semibold text-zinc-500">{song.artist}</p>
            </div>
          </div>
        );
      case "album":
        return (
          <div className="flex flex-col">
            <p className="font-medium text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "duration":
        return (
          <p className="font-semibold text-sm capitalize">{cellValue}</p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              <MdFavorite className="text-danger-500 w-6 h-6" />
            </div>
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              <MdMoreHoriz className="text-zinc-100 w-6 h-6" />
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      td: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
    }),
    [],
  );

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const playSongAtIndex = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 100); // slight delay to ensure audio updates
  };

  const handleNext = () => {
    if (isShuffling) {
      let randomIndex = currentSongIndex;
      while (randomIndex === currentSongIndex && songs.length > 1) {
        randomIndex = Math.floor(Math.random() * songs.length);
      }
      playSongAtIndex(randomIndex);
    } else {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      playSongAtIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(prevIndex);
  };

  const handleEnded = () => {
    if (isRepeating) {
      audioRef.current?.play();
    } else {
      handleNext();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <main className="w-full relative h-[100dvh] sm:h-full overflow-y-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0 h-[600px] sm:h-[380px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(16,41,45,0.95), rgba(16,41,45,0.4))`,
          backgroundSize: 'contain',
          backgroundPosition: '80% top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="relative h-full">
        <div className="relative w-full overflow-y-auto h-full md:h-[90.7%] lg:h-[88.5%] pb-[80px]">
          <div className="flex flex-col items-center sm:flex-row gap-6 pt-8 px-8 md:px-8 sm:items-end">
            <img
              src="https://upload.wikimedia.org/wikipedia/pt/0/07/Stay_-_The_Kid_Laroi_e_Justin_Bieber.png"
              className="w-[250px] h-[250px] sm:w-[200px] sm:h-[200px] md:w-[280px] md:h-[280px] rounded-md bg-default-300" />
            <div className="flex flex-col gap-4 sm:gap-6 w-full mb-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold text-primary500">PRIVATE PLAYLIST</h1>
                <h1 className="text-4xl md:text-5xl font-bold">Favourites</h1>
                <h1 className="text-base font-medium text-zinc-400 text-truncate">Justin Bieber, The Kid Laroi, Adele and more</h1>
              </div>
              <Button
                startContent={<MdShuffle className="w-5 h-5" />}
                className="w-fit bg-primary600 "
                size="md"
                radius="full"
                color="danger"
                onPress={() => { handleNext(); setIsShuffling(true) }}>
                <p className="text-base font-semibold">Shuffle</p>
              </Button>
            </div>
          </div>
          <div
            className=" z-10 w-full flex flex-col gap-12 pt-4 p-8 pb-6 sm:pt-8 sm:p-4 sm:pb-8 md:pt-16 md:p-8 md:pb-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(9,9,11,0.005) 0%, rgba(9,9,11,0.7) 5%, rgba(9,9,11,1) 9%)',
            }}
          >
            {/* Desktop - Table */}
            <div className="hidden md:block">
              <Table
                removeWrapper
                selectionMode="single"
                aria-label="Favourites Songs"
                classNames={classNames}
                onRowAction={(key) => {
                  const songIndex = songs.findIndex((song) => song.id === Number(key));
                  if (songIndex !== -1) playSongAtIndex(songIndex);
                }}>
                <TableHeader columns={columns} className="bg-transparent">
                  {(column) => (
                    <TableColumn
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                      key={column.uid}
                      align={column.uid === "actions" ? "end" : "start"}>
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={songs}>
                  {(item) => (
                    <TableRow key={item.id} className="group">
                      {(columnKey) => <TableCell>{renderCell(item, columnKey as ColumnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Mobile View: List */}
            <div className="md:hidden w-full flex flex-col gap-4">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex justify-between items-center p-3 bg-zinc-900 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
                  onClick={() => playSongAtIndex(index)}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">{song.title}</p>
                    <p className="text-xs text-zinc-500">{song.artist}</p>
                  </div>
                  <MdMoreHoriz className="text-zinc-300 w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Desktop Footer */}
        <footer className="hidden md:flex flex-row gap-4 justify-between absolute bottom-0 left-0 w-full z-50 py-3 px-4  bg-zinc-800">
          <div className="flex flex-row gap-3 w-[15%] lg:w-1/5">
            <img
              alt={songs[currentSongIndex].title}
              className="w-[4.6rem] h-[4.6rem] rounded-md"
              src={songs[currentSongIndex].avatar}
            />
            <div className="flex flex-col gap-2 justify-center w-full">
              <p className="text-[0.95rem] leading-none font-medium">{songs[currentSongIndex].title}</p>
              <p className="text-[0.8rem] leading-none font-semibold text-zinc-500 truncate">{songs[currentSongIndex].artist}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/3 lg:w-2/4 items-center">
            <div className="relative flex items-center gap-4">
              <div onClick={() => setIsShuffling(!isShuffling)} className="transition-transform duration-100 hover:scale-110 cursor-pointer">
                <MdShuffle className={`w-6 h-6 ${isShuffling ? "text-pink-500" : "text-zinc-100"}`} />
              </div>
              <div onClick={handlePrev} className="transition-transform duration-100 hover:scale-110 cursor-pointer">
                <MdSkipPrevious className="text-zinc-100 w-6 h-6" />
              </div>
              <div onClick={togglePlayPause} className="p-2 bg-white rounded-full shadow-md transform hover:scale-105 cursor-pointer transition-transform duration-100 ease-in-out">
                {isPlaying ? (
                  <MdPause className="text-black w-7 h-7" /> // change to MdPause if available
                ) : (
                  <MdPlayArrow className="text-black w-7 h-7" />
                )}
              </div>
              <div onClick={handleNext} className="transition-transform duration-100 hover:scale-110 cursor-pointer">
                <MdSkipNext className="text-zinc-100 w-6 h-6" />
              </div>
              <div onClick={() => setIsRepeating(!isRepeating)} className="transition-transform duration-100 hover:scale-110 cursor-pointer">
                <MdRepeat className={`w-6 h-6 ${isRepeating ? "text-pink-500" : "text-zinc-100"}`} />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center w-full">
              <p className="text-sm font-medium text-zinc-300">{formatTime(currentTime)}</p>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  const time = parseFloat(e.target.value);
                  setCurrentTime(time);
                  if (audioRef.current) audioRef.current.currentTime = time;
                }}
                className="w-full accent-primary500"
              />
              <p className="text-sm font-medium text-zinc-300">{formatTime(duration)}</p>
            </div>
          </div>
          <div className="relative flex items-center w-[15%] lg:w-1/5 gap-3 justify-end">
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              <MdFavorite className="text-danger-500 w-6 h-6" />
            </div>
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              {volume === 0 ? (
                <MdOutlineVolumeMute className="text-zinc-100 w-7 h-7" />
              ) : volume < 1 ? (
                <MdOutlineVolumeDown className="text-zinc-100 w-7 h-7" />
              ) : (
                <MdOutlineVolumeUp className="text-zinc-100 w-7 h-7" />
              )}
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => {
                const vol = parseFloat(e.target.value);
                setVolume(vol);
                if (audioRef.current) audioRef.current.volume = vol;
              }}
              className="w-24 accent-primary500"
            />
          </div>
        </footer>
        {/* Mobile Footer */}
        <footer
          className="md:hidden absolute bottom-0 left-0 z-40  items-center justify-between w-full px-4 py-3 pb-4 sm:pb-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, ${averageColor}, ${darkenHexColor})`, // Apply average color here
          }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={songs[currentSongIndex].avatar}
                alt={songs[currentSongIndex].title}
                className="w-12 h-12 rounded-md"
              />
              <div className="flex flex-col overflow-hidden">
                <p className="text-sm font-medium truncate">{songs[currentSongIndex].title}</p>
                <p className="text-xs text-zinc-400 truncate">{songs[currentSongIndex].artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
                <MdFavorite className="text-danger-500 w-6 h-6" />
              </div>
              <div
                onClick={togglePlayPause}
                className="p-2 bg-white rounded-full shadow-md hover:scale-105 transition-transform duration-100 cursor-pointer"
              >
                {isPlaying ? (
                  <MdPause className="text-black w-5 h-5" />
                ) : (
                  <MdPlayArrow className="text-black w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].url}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={handleEnded}
      />
    </main >
  )
}
