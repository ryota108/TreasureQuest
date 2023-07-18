"use client";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import AssignMenu from "./AssignMenu";

const Header = () => {
  const [searchString, setSearchString, assignQuery, setAssignQuery, board] =
    useBoardStore((state) => [
      state.searchString,
      state.setSearchString,
      state.assignQuery,
      state.setAssignQuery,
      state.board,
    ]);

  const [assignList, setAssignList] = useState<string[]>([]);

  useEffect(() => {
    let todoAssign = board.columns
      .get("todo")
      ?.todos.map((todo) => todo.assign);
    let inprogressAssign = board.columns
      .get("Inprogress")
      ?.todos.map((todo) => todo.assign);
    let doneAssign = board.columns
      .get("done")
      ?.todos.map((todo) => todo.assign);
    let newArray: string[] = []; // 型アノテーションを追加
  
    if (typeof todoAssign !== "undefined" && typeof inprogressAssign !== "undefined" && typeof doneAssign !== "undefined") {
      newArray = todoAssign.concat(inprogressAssign).concat(doneAssign) as string[];
    }
    
    const assignSet = Array.from(new Set(newArray));
    setAssignList(assignSet);
  }, [board]);

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
          <AssignMenu assignList={assignList}/>
        </div>
      </div>

      <div></div>
    </header>
  );
};

export default Header;
