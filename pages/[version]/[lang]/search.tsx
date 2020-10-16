import fs from 'fs-extra';
import path from 'path'
import React, { useEffect, useRef, useState } from "react";
import SimpleBar from 'simplebar-react';
import yaml from 'yaml';
import Layout from "../../../components/layout";
import Link from "next/link";
import { SearchPageQuery, SearchProps, SearchResults } from "../../../utils/Interfaces";
import { NextPageContext } from "next";
import { DOCS_DEV, getTheme } from "../../../utils/Utils";
import SideNav from "../../../components/SideNav";
import { Router, useRouter } from "next/router";
import axios from 'axios';
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

const DisplayAd = dynamic(() => import('../../..//components/ads/DisplayAd'), { ssr: false })
const Search = ({ version, lang, navs, verlang }: SearchProps) => {

  const [searchResults, setSearchResults] = useState<SearchResults>({
    totalCount: 0,
    results: [],
    count: -1
  });
  const [displayedSearch, setDisplayedSearch] = useState("");
  const [showingNav, setShowingNav] = useState(false);
  const router = useRouter();
  const simpleBarRef = useRef(null);
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    if (params.has("search")) {
      setDisplayedSearch(params.get("search") as string);
      axios.get(`/api/search?v=${version}&lang=${lang}&q=${params.get("search") as string}&limit=5000`).then(value => {
        setSearchResults(value.data);
      }).catch(reason => {
        console.log(reason);
      })
    }
    // Handles reseting simple bar's position
    const handleRouteChange = () => {
      // @ts-ignore
      simpleBarRef.current?.getScrollElement().scrollTo(0, 0);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {

    };
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.dataset.adClient = "ca-pub-7211841189345460";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      Router.events.off("routeChangeComplete", handleRouteChange);
    }

  }, []);
  return (
    <Layout showingNav = {showingNav} setShowingNav = {setShowingNav} current = {{ key: "Search", value: "Search" }}>

      <NextSeo
        title = {`Search - CraftTweaker Documentation`}
        description = {`Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`}
        canonical = {`https://docs.blamejared.com/${version}/${lang}/search/`}
        openGraph = {{
          type: `website`,
          url: `https://docs.blamejared.com/${version}/${lang}/search/`,
          title: `Search - CraftTweaker Documentation`,
          description: `Documentation for the CraftTweaker Minecraft mod, information on how to use the ZenScript language and a central wiki for mods that rely on it.`,
          images: [
            {
              url: `https://docs.blamejared.com/og_image.png`,
              width: 90,
              height: 92,
              alt: `CraftTweaker logo`,
            }
          ],
        }}
        additionalMetaTags = {[{
          property: 'keywords',
          content: `CraftTweaker,CraftTweaker docs,CraftTweaker documentation,CraftTweaker wiki,CraftTweaker mod`
        }, {
          property: 'charset',
          content: `utf-8`
        }]}
      />

      <div className = "flex flex-row">
        <SideNav version = {version} lang = {lang} navs = {navs} current = {{
          key: "search",
          value: "search"
        }} verlang = {verlang} stub = {false} showingNav = {showingNav}/>
        <div className = {`w-full md:w-content`}>
          <SimpleBar className = {`mx-auto max-h-with-nav w-full`} ref = {simpleBarRef}>
            <div className = {`grid grid-cols-1 lg:grid-cols-content`}>
              <div className = {`flex flex-col justify-between`}>
                <DisplayAd slot = {`2785889097`} className = {`md:mx-auto`} current = {{ key: "Search", value: "Search" }}/>
                <DisplayAd slot = {`4624233302`} className = {`md:mx-auto`} mediaQuery = {"(min-width: 768px)"} current = {{
                  key: "Search",
                  value: "Search"
                }}/>
              </div>
              <div className = {`w-11/12 md:w-full pt-4 pb-16 px-4 mx-auto dark:text-dark-100`}>
                <div className = {`w-5/6 mx-auto`}>
                  <label className = "text-4xl" htmlFor = "main-search">Search</label>
                  <input disabled = {DOCS_DEV} id = "main-search" className = "bg-transparent block w-full p-2 border border-gray-400 dark:border-dark-600" onChange = {(event) => {
                    setDisplayedSearch((event.target.value));

                    if (event.target.value.length < 3) {
                      router.push(`/[version]/[lang]/search/`, `/${version}/${lang}/search/`, { shallow: false });
                      setSearchResults({
                        totalCount: 0,
                        results: [],
                        count: -1
                      });
                      return;
                    }
                    router.push(`/[version]/[lang]/search/?search=${event.target.value}`, `/${version}/${lang}/search/?search=${event.target.value}`, { shallow: false });
                    axios.get(`/api/search?v=${version}&lang=${lang}&q=${event.target.value}&limit=5000`).then(value => {
                      setSearchResults(value.data);
                    }).catch(reason => {
                      console.log(reason);
                    })
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
                <DisplayAd slot = {`6866063899`} className = {`md:mx-auto`} current = {{ key: "Search", value: "Search" }}/>
                <DisplayAd slot = {`5174542427`} className = {`md:mx-auto`} mediaQuery = {"(min-width: 768px)"} current = {{
                  key: "Search",
                  value: "Search"
                }}/>
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

  let { lang, version } = context.query as unknown as SearchPageQuery;

  let docsDir = path.join(process.cwd(), 'docs');
  let versionDir = path.join(docsDir, version);
  let langDir = path.join(versionDir, lang);
  let docsJsonLocation: string;

  if (DOCS_DEV) {
    docsJsonLocation = path.join(path.join(process.cwd(), '../'), "docs.json");
  } else {
    docsJsonLocation = path.join(langDir, "docs.json");
  }

  let docsJson = fs.readFileSync(docsJsonLocation, "utf8");
  let docs = JSON.parse(docsJson)["nav"];

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
      navs: docs,
      verlang,
    },
  }
}

export default Search





