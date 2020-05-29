import Link from "next/link";
import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import Layout from "../components/layout";
import fs from 'fs-extra';
import path from 'path';
import SideNav from "../components/SideNav";
import { NextPageContext } from "next";
import { DOCS_DEV, getTheme } from "../utils/Utils";
import { HasTheme, HasVerLang } from "../utils/Interfaces";

export default function Index({ theme, verlang }: HasTheme & HasVerLang) {

  function getFlag(lang: string) {
    // This handles lang -> flag, not great, but there isn't a proper solution
    if (lang === "en") {
      lang = "gb";
    } else if (lang === "ko") {
      lang = "kr";
    } else if (lang === "zh") {
      lang = "cn"
    } else if (lang === "ja") {
      lang = "jp";
    }
    return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${lang}.svg`
  }

  let [version, setVersion] = useState(Object.keys(verlang).sort((a, b) => b.localeCompare(a))[0]);

  const [showingNav, setShowingNav] = useState(false);
  return (<>
    <Layout theme = {theme} showingNav = {showingNav} setShowingNav = {setShowingNav} current = {{
      key: "CraftTweaker Documentation",
      value: "CraftTweaker Documentation"
    }}>
      <div className = {`flex flex-row`}>
        <SideNav stub = {true} showingNav = {showingNav}/>
        <div className = {`w-full md:w-content`}>
          <SimpleBar className = {`mx-auto max-h-with-nav w-full`}>
            <div className = "container mx-auto text-center mt-1 dark:text-dark-100">
              <div className = {`w-5/6 mx-auto`}>
                <label className = "text-4xl" htmlFor = "main-version-select"> Select Version </label>
                <select id = "main-version-select" className = "bg-transparent block w-full p-2 border border-gray-400 dark:border-dark-600"
                        onChange = {event => {
                          setVersion(event.target.value);
                          event.target.blur();
                        }}>
                  {Object.keys(verlang).sort((a, b) => b.localeCompare(a)).map(version =>
                    <option key = {version} value = {version} className = {`text-black`}>{version}</option>
                  )}
                </select>

                <div className = {`flex flex-row flex-wrap mx-auto justify-center -mx-2 mt-4`}>
                  {verlang[version].map((lang: string) => {
                    return <div key = {`${lang}-${version}`} className = {`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4`}>
                      <div className = {`border bg-gray-400 dark:bg-dark-800 dark:border-dark-700`}>
                        <Link href = {`/[version]/[lang]/[...slug]`} as = {`/${version}/${lang}/index`}>

                          <a> <img className = {`w-full`} src = {getFlag(lang)} alt = {lang}/>
                            <p className = {`text-xl font-semibold mt-2`}>Version: {version}</p>
                            <p className = {`text-xl font-semibold mb-2`}>Language: {lang}</p>
                          </a>

                        </Link>

                      </div>
                    </div>
                  })}

                </div>
              </div>
            </div>
          </SimpleBar>
        </div>
      </div>
    </Layout>
  </>)
}


export async function getServerSideProps(context: NextPageContext) {
  let { pageTheme, hljsStyle } = getTheme(context);
  let verlang: any = {};
  if (DOCS_DEV) {
    verlang["0.00"] = ["en"];

  } else {
    let docsdir = path.join(process.cwd(), 'docs');
    let versionsInfo = fs.readdirSync(docsdir);
    for (let version of versionsInfo) {
      verlang[version] = fs.readdirSync(path.join(docsdir, version));
    }
  }
  return {
    props: {
      theme: {
        pageTheme,
        hljsStyle
      },
      verlang
    },
  }
}