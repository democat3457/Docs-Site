import fs from 'fs-extra';
import path from 'path'
import React, { useEffect, useState } from "react";
import SimpleBar from 'simplebar-react';
import yaml from 'yaml';
import Layout from "../../../components/layout";
import Link from "next/link";
import { SearchPageQuery, SearchProps, SearchResults } from "../../../utils/Interfaces";
import { NextPageContext } from "next";
import { DOCS_DEV, getTheme } from "../../../utils/Utils";
import SideNav from "../../../components/SideNav";
import { useRouter } from "next/router";
import axios from 'axios';
import dynamic from "next/dynamic";

const DisplayAd = dynamic(() => import('../../..//components/ads/DisplayAd'), { ssr: false })
const Search = ({ theme, version, lang, navs, verlang, search, searchResults }: SearchProps) => {
  const [displayedSearch, setDisplayedSearch] = useState(search);
  const [showingNav, setShowingNav] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setShowingNav(false);
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.dataset.adClient = "ca-pub-7211841189345460";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  return (
    <Layout theme = {theme} showingNav = {showingNav} setShowingNav = {setShowingNav} current = {{ key: "Search", value: "Search" }}>
      <div className = "flex flex-row">
        <SideNav version = {version} lang = {lang} navs = {navs} current = {{
          key: "search",
          value: "search"
        }} verlang = {verlang} stub = {false} showingNav = {showingNav}/>
        <div className = {`w-full md:w-content`}>
          <SimpleBar className = {`mx-auto max-h-with-nav w-full`}>
            <div className = {`grid grid-cols-1 lg:grid-cols-content`}>
              <div className = {`flex flex-col justify-between`}>
                <DisplayAd slot = {`2785889097`} className = {`md:mx-auto`}  current = {{ key: "Search", value: "Search" }}/>
                <DisplayAd slot = {`4624233302`} className = {`md:mx-auto`} mediaQuery = {"(min-width: 768px)"}  current = {{ key: "Search", value: "Search" }}/>
              </div>
              <div className = {`w-11/12 md:w-full pt-4 pb-16 px-4 mx-auto dark:text-dark-100`}>
                <div className = {`w-5/6 mx-auto`}>
                  <label className = "text-4xl" htmlFor = "main-search">Search</label>
                  <input disabled = {DOCS_DEV} id = "main-search" className = "bg-transparent block w-full p-2 border border-gray-400 dark:border-dark-600" onChange = {(event) => {
                    setDisplayedSearch((event.target.value));

                    if (event.target.value.length < 3) {
                      router.push(`/[version]/[lang]/search/`, `/${version}/${lang}/search/`, { shallow: false });
                      return;
                    }
                    router.push(`/[version]/[lang]/search/?search=${event.target.value}`, `/${version}/${lang}/search/?search=${event.target.value}`, { shallow: false });
                  }} value = {displayedSearch}/>


                  <div>
                    {searchResults.count > 0 ? searchResults.results.map((value, index) =>

                      <Link href = {`/[version]/[lang]/[...slug]`} as = {(value.location.startsWith("/") ? value.location : `/${value.location}`).replace(/\.md/, "")} key = {`${index}`}>

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
              <div className = {`flex flex-col justify-between`}>
                <DisplayAd slot = {`6866063899`} className = {`md:mx-auto`}  current = {{ key: "Search", value: "Search" }}/>
                <DisplayAd slot = {`5174542427`} className = {`md:mx-auto`} mediaQuery = {"(min-width: 768px)"}  current = {{ key: "Search", value: "Search" }}/>
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

  let { lang, version, search = "" } = context.query as unknown as SearchPageQuery;

  let docsDir = path.join(process.cwd(), 'docs');
  let versionDir = path.join(docsDir, version);
  let langDir = path.join(versionDir, lang);
  if (context.req && context.res) {
    if (context.req.url && !context.req.url.endsWith("/") && context.req.url.indexOf(`?`) === -1) {
      context.res.writeHead(301, {
        Location: context.req.url + "/" + (search.length ? `?search=${search}` : ``),
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
  let searchResults: SearchResults = {
    count: -1,
    totalCount: 0,
    results: []
  }
  if (search.length >= 3) {
    // Forcing http isn't ideal, but no way to figure the protocol out, and this is just a local connection anyway.
    let response = await axios.get(`http://${context.req?.headers["host"]}/api/search?v=${version}&lang=${lang}&q=${search}&limit=5000`);
    if (response.data)
      searchResults = response.data;
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
      verlang,
      search,
      searchResults
    },
  }
}

export default Search





