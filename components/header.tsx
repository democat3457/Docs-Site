import Link from "next/link";
import React from "react";
import { HeaderProps } from "../utils/Interfaces";


function Header({ showingNav, setShowingNav }: HeaderProps) {
  return (
    <header>
      <nav className = "flex items-center justify-between flex-wrap bg-blue-800 h-16 shadow-lg z-20">
        <Link href = {`/`} as = {`/`}>

          <a className = "flex items-center text-white mr-2 my-2 md:my-0">

            <img className = "h-12 w-12 mx-2" src = "/crafttweaker.svg" alt = "crafttweaker_logo"/>

            <span className = "text-lg tracking-tight">CraftTweaker <br className = "md:hidden"/> Documentation</span>

          </a>

        </Link>
        <div className = "block md:hidden pr-6">
          <button className = "flex items-center px-2 py-1 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white" id = "menu-button" onClick = {() => {
            setShowingNav(!showingNav);
          }}>
            <svg className = "fill-current h-8 w-8" viewBox = "0 0 20 20" xmlns = "http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d = "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
