"use client";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";

const Header = () => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-gray-900 to-blue-600 rounded-md filter blur-3xl opacity-50 -z-50" />

        <Image
          src="/logo.png"
          alt="Trello logo"
          width={400}
          height={100}
          className="w-72 md:w-62 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* search box */}
          <form className="flex items-center space-x-5 bg-gray-800/50 border border-gray-400 rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2 bg-transparent text-gray-200"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Aran smithee" round color="black" size="50" />
          {/* Avatar */}
        </div>
      </div>

      <div></div>
    </header>
  );
};

export default Header;
