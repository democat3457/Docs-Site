import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./header";
import Head from "next/head";
import { LayoutProps } from "../utils/Interfaces";
import { initGA, pageView } from "../utils/Analytics";

function Layout({ current, showingNav, setShowingNav, children }: LayoutProps) {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    pageView();
  }, [current]);
  return (
    <div>
      <div className = "flex flex-col min-h-screen bg-gray-100 dark:bg-dark-900">

        <Header showingNav = {showingNav} setShowingNav = {setShowingNav}/>
        <main className = "flex-grow ">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
