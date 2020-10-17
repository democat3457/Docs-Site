import { motion } from "framer-motion";
import { useEffect, useState } from "preact/hooks";
import NavItem from "./NavItem";
import { NavFolderProps } from "../utils/Interfaces";

function NavFolder({ theme, version, lang, name, current, nav, level, parentExpanded, parentNames, parentFolders }: NavFolderProps) {

  let parentCurrent = parentNames.concat(name);
  let isexpanded = true;
  if (parentCurrent.length > parentFolders.length) {
    isexpanded = false;
  } else {
    for (let i = 0; i < parentCurrent.length; i++) {
      let currentValue = parentCurrent[i];
      let folderValue = parentFolders[i];
      if (currentValue !== folderValue) {
        isexpanded = false;
      }
    }
  }

  const [expanded, setExpanded] = useState(isexpanded);
  const [loaded, setLoaded] = useState(false);



  // useEffect(() => {
  //   let parentCurrent = parentNames.concat(name);
  //   let expanded = true;
  //   if (parentCurrent.length > parentFolders.length) {
  //     expanded = false;
  //   } else {
  //     for (let i = 0; i < parentCurrent.length; i++) {
  //       let currentValue = parentCurrent[i];
  //       let folderValue = parentFolders[i];
  //       if (currentValue !== folderValue) {
  //         expanded = false;
  //       }
  //     }
  //   }
  //   setExpanded(expanded);
  //   setLoaded(true);
  // }, [current]);

  if (!parentExpanded) {
    return <> </>
  }
  return <>
    <div>
    <span onClick={() => {
      setExpanded(!expanded);
    }}
          className={`cursor-pointer pr-2 py-1 block hover:bg-gray-400 dark-hover:bg-dark-600 ${expanded ? `${theme.pageTheme === "dark" ? `nav-open-dark` : `nav-open`}` : `${theme.pageTheme === "dark" ? `nav-closed-dark` : `nav-closed`}`}`}
          style={{ paddingLeft: `${level + 1}rem` }}>{name.replace("&#58;", ":")}</span>
      <motion.div
        initial={{
          height: expanded ? "100%" : 0
        }}
        animate={{
          height: expanded ? "100%" : 0,
        }}
        className={`overflow-hidden`}
      >
        <div>
          {
            nav && Object.keys(nav).map((key: any) => {
              if (typeof nav[key] === "string") {
                let path = nav[key].replace(/\.md/, "");
                return <NavItem version={version ? version : ``} lang={lang ? lang : ``} nav={key} path={path}
                                selected={current ? path === current.value : false} key={`/${version}/${lang}/${path}`} level={level + 1}/>
              } else {
                return <NavFolder theme={theme} version={version ? version : ``} lang={lang ? lang : ``} name={key} nav={nav[key]} current={current}
                                  key={key} level={level + 1} parentExpanded={true} parentNames={[...parentNames, name]}
                                  parentFolders={parentFolders}/>
              }
            })
          }
        </div>
      </motion.div>
    </div>
  </>
}

export default NavFolder;