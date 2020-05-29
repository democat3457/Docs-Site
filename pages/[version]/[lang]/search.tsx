import fs from 'fs-extra';
import path from 'path'
import React, { useEffect, useState } from "react";
import SimpleBar from 'simplebar-react';
import yaml from 'yaml';
import Layout from "../../../components/layout";
import axios from "axios";
import Link from "next/link";
import { PageQuery, SearchProps, SearchResults } from "../../../utils/Interfaces";
import { NextPageContext } from "next";
import { DOCS_DEV, getTheme } from "../../../utils/Utils";
import SideNav from "../../../components/SideNav";

const Search = ({ theme, version, lang, navs, verlang }: SearchProps) => {
  const [showingNav, setShowingNav] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    count: -1,
    totalCount: 0,
    results: []
  });
  useEffect(() => {
    setShowingNav(false);
  }, []);
  return (
    <Layout theme = {theme} showingNav = {showingNav} setShowingNav = {setShowingNav} current = {{key: "Search", value: "Search"}}>
      <div className = "flex flex-row">
        <SideNav version = {version} lang = {lang} navs = {navs} current = {{
          key: "search",
          value: "search"
        }} verlang = {verlang} stub = {false} showingNav = {showingNav}/>
        <div className = {`w-full md:w-content`}>
          <SimpleBar className = {`mx-auto max-h-with-nav w-full`}>
            <div className = "container mx-auto text-center mt-1 dark:text-dark-100 py-4">
              <div className = {`w-5/6 mx-auto`}>
                <label className = "text-4xl" htmlFor = "main-search">Search</label>
                <input disabled={DOCS_DEV} id = "main-search" className = "bg-transparent block w-full p-2 border border-gray-400 dark:border-dark-600" onChange = {(event) => {
                  if (event.target.value.length < 3) {
                    setSearchResults({
                      count: -1,
                      totalCount: 0,
                      results: []
                    });
                    return;
                  }
                  axios.get(`/api/search?v=${version}&lang=${lang}&q=${event.target.value}&limit=5000`).then(value => {
                    setSearchResults(value.data);
                  }).catch(reason => {
                    console.log(reason);
                  });
                }}/>


                <div>
                  {searchResults.count > 0 ? searchResults.results.map((value, index) =>

                    <Link href = {`/[version]/[lang]/[...slug]`} as = {value.location.replace(/\.md/, "")} key = {`${index}`}>

                      <a className = {`px-2 block hover:bg-gray-400 dark-hover:bg-dark-700`}>

                        <div className = "py-1 pl-2">
                          <h2 className = "py-2 text-blue-700 dark:text-blue-300">
                            Page: {value.location.substring(0, value.location.lastIndexOf(".md")).substring(value.location.lastIndexOf("/") + 1)}
                          </h2>
                          <h4 className = "mt-0 mb-1 text-base">
                            {value.title && <p>{value.title}</p>}
                          </h4>
                        </div>

                      </a>

                    </Link>
                  ) : (searchResults.count === 0 ? <div>
                    <h4>No results found</h4></div> : <></>)}
                </div>
              </div>
            </div>


          </SimpleBar>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let { pageTheme, hljsStyle } = getTheme(context);

  let { lang, version } = context.query as unknown as PageQuery;

  let docsDir = path.join(process.cwd(), 'docs');
  let versionDir = path.join(docsDir, version);
  let langDir = path.join(versionDir, lang);
  if (context.req && context.res) {
    if (context.req.url && !context.req.url.endsWith("/")) {
      context.res.writeHead(301, {
        Location: context.req.url + "/",
        // Add the content-type for SEO considerations
        'Content-Type': 'text/html; charset=utf-8',
      })
      context.res.end();
      return {
        props: { slug: "search" }
      }
    }
  }
  let mkdocsLocation: string;

  if (DOCS_DEV) {
    mkdocsLocation = path.join(path.join(process.cwd(), '../'), "mkdocs.yml");
  } else {
    mkdocsLocation = path.join(langDir, "mkdocs.yml");
  }

  let mkdocs = fs.readFileSync(mkdocsLocation, "utf8");
  let yml = yaml.parse(mkdocs)["nav"];

  let versionsInfo: string[];
  let verlang: any = {};
  if (DOCS_DEV) {
    verlang["0.00"] = ["en"];
  } else {
    versionsInfo = fs.readdirSync(docsDir);
    for (let version of versionsInfo) {
      verlang[version] = fs.readdirSync(path.join(docsDir, version));
    }
  }

  return {
    props: {
      theme: {
        pageTheme,
        hljsStyle
      },
      version: version,
      lang: lang,
      navs: yml,
      verlang
    },
  }
}

export default Search





