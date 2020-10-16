import React, { useContext } from "react";
import { ThemeContext } from "./layout";
import NavFolder from "./NavFolder";
import NavItem from "./NavItem";
import OutLinks from "./nav/OutLinks";
import VerLangs from "./nav/VerLangs";
import ThemeOptions from "./nav/ThemeOptions";
import SearchNav from "./nav/SearchNav";
import SimpleBar from "simplebar-react";
import { SideNavProps } from "../utils/Interfaces";

export default function SideNav({ version, lang, navs, current, verlang, stub = false, showingNav }: SideNavProps) {


  const theme = useContext(ThemeContext);

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
                navs && Object.keys(navs).map((key: any) => {
                  if (typeof navs[key] === "string") {
                    let path = navs[key].replace(/\.md/, "");
                    return <NavItem version = {version ? version : ``} lang = {lang ? lang : ``} nav = {key} path = {path} selected = {current ? path === current.value : false} key = {`/${version}/${lang}/${path}`} level = {0}/>
                  } else {
                    return <NavFolder theme={theme} version = {version ? version : ``} lang = {lang ? lang : ``} name = {key} nav = {navs[key]} current = {current} key = {key} level = {0} parentExpanded = {true}/>
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



