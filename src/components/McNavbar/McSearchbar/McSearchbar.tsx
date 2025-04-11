import { HiOutlineSearch } from "react-icons/hi";
import { ChangeEvent } from "react";

interface McSearchbarType {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const McSearchbar = ({ className, onChange }: McSearchbarType) => {
  return (
    <div className={`flex items-center bg-transparent text-base w-full max-w-[38rem] h-11 border border-zinc-600 bg-zinc-800 rounded-lg transition-colors duration-150 hover:bg-zinc-700 hover:border-zinc-500 cursor-text ${className}`}>
      <HiOutlineSearch className="mx-3" size="22" />
      <input className="bg-transparent w-full h-full mr-2 ring-0 outline-none" onChange={onChange} placeholder="Type here to search" type="text" />
    </div>
  )
}
