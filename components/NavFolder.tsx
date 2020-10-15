import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { NavFolderProps } from "../utils/Interfaces";
import { walkYaml } from "../utils/Utils";

function NavFolder({ version, lang, name, current, nav, level, parentExpanded }: NavFolderProps) {

  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    let yml = walkYaml(nav, []);
    for (let ymlKey in yml) {
      if (current.value + ".md" === yml[ymlKey].value) {
        setExpanded(true);
        return;
      }
    }
    setExpanded(false);
  }, [current]);

  if (!parentExpanded) {
    return <> </>
  }
  return <>
    <div>
    <span onClick = {() => {
      setExpanded(!expanded);
    }} className = {`cursor-pointer pr-2 py-1 block hover:bg-gray-400 dark-hover:bg-dark-600 ${expanded ? `nav-open` : `nav-closed`}`} style = {{ paddingLeft: `${level + 1}rem` }}>{name.replace("&#58;", ":")}</span>
      <motion.div
        initial = {{
          height: expanded ? "100%" : 0
        }}
        animate = {{
          height: expanded ? "100%" : 0,
        }}
        className = {`overflow-hidden`}
      >
        <div>
          {Object.values(nav).map((keyval: any) => {
            if (typeof Object.values(keyval)[0] === "string") {
              let path = (Object.values(keyval)[0] as string).replace(/\.md/, "");
              return <NavItem version = {version} lang = {lang} nav = {keyval} path = {path} selected = {path === current.value} key = {`/${version}/${lang}/${path}`} level = {level + 1}/>
            } else {
              return <NavFolder version = {version} lang = {lang} current = {current} name = {Object.keys(keyval)[0]} nav = {Object.values(keyval)[0]} key = {JSON.stringify(Object.keys(keyval))} level = {level + 1} parentExpanded = {expanded}/>
            }
          })}
        </div>
      </motion.div>
    </div>
  </>
}

export default NavFolder;