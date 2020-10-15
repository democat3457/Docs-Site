import React from "react";
import NavFolder from "./NavFolder";
import NavItem from "./NavItem";
import OutLinks from "./nav/OutLinks";
import VerLangs from "./nav/VerLangs";
import ThemeOptions from "./nav/ThemeOptions";
import SearchNav from "./nav/SearchNav";
import SimpleBar from "simplebar-react";
import { SideNavProps } from "../utils/Interfaces";

export default function SideNav({ version, lang, navs, current, verlang, stub = false, showingNav }: SideNavProps) {


  return (<>
    <div className = {`w-full md:w-72 bg-gray-200 dark:bg-dark-800 dark:text-dark-100 z-10 shadow-lg border-r dark:border-dark-700 h-with-nav break-all absolute md:static left-0 md:left-auto ${showingNav ? `` : `hidden md:block`}`}>
      <SimpleBar className = {`h-with-nav`}>
        <div className = {`h-full flex flex-col`}>
          <OutLinks/>

          <VerLangs verlang = {verlang} lang = {lang ? lang : ``} stub = {stub} version = {version ? version : ``} current = {current ? current : {
            key: "",
            value: ""
          }}/>

          <ThemeOptions/>


          {!stub && <>

            <SearchNav version = {version ? version : ``} lang = {lang ? lang : ``}/>

            <div className = {`flex-grow`}>
              {
                navs && navs.map((keyval: any) => {
                  if (typeof Object.values(keyval)[0] === "string") {
                    let path = (Object.values(keyval)[0] as string).replace(/\.md/, "");
                    return <NavItem version = {version ? version : ``} lang = {lang ? lang : ``} nav = {keyval} path = {path} selected = {current ? path === current.value : false} key = {`/${version}/${lang}/${path}`} level = {0}/>
                  } else {
                    return <NavFolder version = {version ? version : ``} lang = {lang ? lang : ``} name = {Object.keys(keyval)[0]} nav = {Object.values(keyval)[0]} current = {current} key = {Object.keys(keyval)[0]} level = {0} parentExpanded = {true}/>
                  }
                })
              }
            </div>
          </>}

        </div>
      </SimpleBar>
    </div>

  </>)
}



