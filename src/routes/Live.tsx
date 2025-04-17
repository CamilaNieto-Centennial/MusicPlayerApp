import { Link } from "@nextui-org/react";
import { MdOutlineErrorOutline } from "react-icons/md";

export default function Live() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center text-center h-[100dvh] p-8 overflow-y-auto">
      <MdOutlineErrorOutline className="w-64 h-64 text-zinc-600" />
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">No Live Content</h1>
      <p className="text-base text-zinc-400 max-w-md">
        Oops! There's currently no live content available. Please check back later.
      </p>
      <Link href="/">
        <a className="mt-6 px-6 py-2 underline text-white rounded-full hover:text-primary700 transition">
          Return Home
        </a>
      </Link>
    </main>
  )
}
