import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { HasVerAndLang, SearchResults } from "../../utils/Interfaces";
import { DOCS_DEV } from "../../utils/Utils";

export default function SearchNav({ version, lang }: HasVerAndLang) {
  const [searchFocused, setSearchFocused] = useState(false);
  const searchBluring = useRef(false);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    count: -1,
    totalCount: 0,
    results: []
  });
  const [searchValue, setSearchValue] = useState("");
  return <div className = "flex-none relative my-auto border-b dark:border-dark-700 inline-block">
    <svg width = "1rem" height = "1rem" xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 20 20" className = {`fill-current svg-icon absolute pointer-events-none ml-2 my-3 transition-opacity duration-300 ease-in-out  ${searchFocused ? `opacity-0` : `opacity-100`} `}>
      <path d = "M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
    </svg>
    <label htmlFor = "search-input" className = "sr-only">Search</label>

    <DebounceInput disabled = {DOCS_DEV} minLength = {3} debounceTimeout = {200} className = "py-2 px-2 w-full bg-transparent" type = "text" placeholder = "Search" id = "search-input" style = {{ textIndent: "1.5rem" }}
                   onFocus = {() => {
                     setSearchFocused(true);
                     searchBluring.current = false;
                   }}
                   onBlur = {() => {
                     searchBluring.current = true;
                     setTimeout(() => {
                       if (searchBluring.current)
                         setSearchFocused(false)
                       searchBluring.current = false;
                     }, 200);
                   }}
                   onChange = {event => {
                     if (event.target.value.length < 3) {
                       setSearchResults({
                         count: -1,
                         totalCount: 0,
                         results: []
                       });
                       return;
                     }

                     axios.get(`/api/search?v=${version}&lang=${lang}&q=${event.target.value}&limit=5`).then(value => {
                       setSearchResults(value.data);
                     }).catch(reason => {
                       console.log(reason);
                     });
                     setSearchValue(event.target.value);
                   }}

    />

    <motion.div
      initial = {{
        height: searchFocused && (searchResults.count === 0 || searchResults.results.length > 0) ? "100%" : 0
      }}
      animate = {{
        height: searchFocused && (searchResults.count === 0 || searchResults.results.length > 0) ? "100%" : 0
      }}
      className = {`overflow-hidden`}
    >
      <div className = {`bg-gray-100 dark:bg-dark-900`}>
        {searchResults.count > 0 ? searchResults.results.map((value, index) =>

          <Link href = {`/[version]/[lang]/[...slug]/`} as = {(value.location.startsWith("/") ? value.location : `/${value.location}`).replace(/\.md/, "")} key = {`${index}`}>

            <a className = {`px-2 block hover:bg-gray-400 dark-hover:bg-dark-700 border-t border-b dark:border-dark-700`}>

              <div className = "py-1 pl-2">
                <h4 className = "my-0 text-base truncate">
                  {value.location.substring(0, value.location.lastIndexOf(".md")).substring(value.location.lastIndexOf("/") + 1)}
                </h4>

                {value.text && <p className = "my-0 text-xs truncate"> {value.text.substring(0, 90)}</p>}
              </div>

            </a>

          </Link>
        ) : searchResults.count === 0 ? <div>
          <div className = {`px-2 block hover:bg-gray-400 dark-hover:bg-dark-700 border-t border-b dark:border-dark-700`}>

            <div className = "py-1 pl-2">
              <h4 className = "my-0 text-base truncate">
                No results Found
              </h4>

            </div>

          </div>
        </div> : <> </>}

        {searchResults && searchResults.totalCount > 5 && <div>
          <Link href = {`/[version]/[lang]/search/`} as = {`/${version}/${lang}/search/?search=${searchValue}`}>

            <a className = {`px-2 block hover:bg-gray-400 dark-hover:bg-dark-700 border-t border-b dark:border-dark-700`}>

              <div className = "py-1 pl-2">
                <h4 className = "my-0 text-base truncate">
                  See more results
                </h4>

              </div>

            </a>

          </Link>
        </div>}
      </div>
    </motion.div>
  </div>
}