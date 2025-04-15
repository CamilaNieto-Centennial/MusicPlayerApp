import { Button, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import React from "react";
import { MdFavorite, MdMoreHoriz, MdOutlineVolumeMute, MdPlayArrow, MdRepeat, MdShuffle, MdSkipNext, MdSkipPrevious } from "react-icons/md";

type Song = {
  id: number;
  title: string;
  album: string;
  duration: string;
  avatar: string;
  artist: string;
};
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
  { name: "ALBUM", uid: "album" },
  { name: "DURATION", uid: "duration" },
  { name: "ACTIONS", uid: "actions", width: "80px" },
];

export const songs: Song[] = [
  {
    id: 1,
    title: "Stargazing",
    album: "Stargazing",
    duration: "02:53",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    artist: "Myles Smith",
  },
  {
    id: 2,
    title: "My Head & My Heart",
    album: "Heaven & Hell",
    duration: "03:12",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    artist: "Ava Max",
  },
  {
    id: 3,
    title: "Dizzy",
    album: "Dizzy",
    duration: "02:59",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    artist: "Olly Alexander",
  },
  {
    id: 4,
    title: "Sk8er Boi",
    album: "Let Go",
    duration: "04:02",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    artist: "Avril Lavigne",
  },
  {
    id: 5,
    title: "Do I Wanna Know?",
    album: "AM",
    duration: "03:45",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    artist: "Artic Monkeys",
  },
];

export default function Favourites() {

  const renderCell = React.useCallback((song: Song, columnKey: ColumnKey) => {
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


  return (
    <div className="flex flex-col justify-between h-full">
      <main className="flex flex-col gap-4 p-8 overflow-y-auto">
        <div className="flex flex-row gap-6 items-end">
          <Skeleton className="rounded-md">
            <img className="w-[280px] h-[280px] rounded-md bg-default-300" />
          </Skeleton>
          <div className="flex flex-col gap-6 w-full mb-2">
            <div className="flex flex-col gap-1">
              <h1 className="text-sm font-semibold text-primary500">PRIVATE PLAYLIST</h1>
              <h1 className="text-5xl font-bold">Favourites</h1>
              <h1 className="text-base font-medium text-zinc-600">Name, Name, Name and more</h1>
            </div>
            <Button
              startContent={<MdShuffle className="w-5 h-5" />}
              className="w-fit bg-primary600"
              size="md"
              radius="full"
              color="danger">
              <p className="text-base font-semibold">Shuffle</p>
            </Button>
          </div>
        </div>
        <Table removeWrapper selectionMode="single" aria-label="Favourites Songs" classNames={classNames}>
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


      </main>
      <footer className="flex flex-row justify-between w-full p-3 bg-zinc-800">
        <div className="flex flex-row gap-3">
          <img
            alt={songs[0].title}
            className="w-16 h-16 rounded-md"
            src={songs[0].avatar}
          />
          <div className="flex flex-col gap-1 justify-center">
            <p className="text-sm font-medium">{songs[0].title}</p>
            <p className="text-xs font-semibold text-zinc-500">{songs[0].artist}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-2/4 items-center">
          <div className="relative flex items-center gap-4">
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              <MdShuffle className="text-zinc-100 w-6 h-6" />
            </div>
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              <MdSkipPrevious className="text-zinc-100 w-6 h-6" />
            </div>
            <div className="p-2 bg-white rounded-full shadow-md transform hover:scale-105 cursor-pointer transition-transform duration-100 ease-in-out">
              <MdPlayArrow className="text-black w-8 h-8" />
            </div>
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              <MdSkipNext className="text-zinc-100 w-6 h-6" />
            </div>
            <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
              <MdRepeat className="text-zinc-100 w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center w-full">
            <p className="text-sm font-medium text-zinc-300">00:00</p>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={0}
              className="w-full h-1 rounded-lg bg-zinc-600 accent-white cursor-pointer transition-all duration-200"
            />
            <p className="text-sm font-medium text-zinc-300">{songs[0].duration}</p>
          </div>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
            <MdFavorite className="text-danger-500 w-6 h-6" />
          </div>
          <div className="transition-transform duration-100 hover:scale-110 cursor-pointer">
            <MdOutlineVolumeMute className="text-zinc-100 w-7 h-7" />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={70}
            className="w-24 h-1 rounded-lg bg-zinc-600 accent-white cursor-pointer transition-all duration-200"
          />
        </div>
      </footer>
    </div>
  )
}
