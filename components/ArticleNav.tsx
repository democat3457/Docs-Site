import React, { useContext } from "react";
import Link from "next/link";
import { ThemeContext } from "./layout";
import { ArticleNavProps } from "../utils/Interfaces";

export default function ArticleNav({ version, lang, previous, next }: ArticleNavProps) {
  const theme = useContext(ThemeContext);

  return <div className = {`flex flex-row ${(previous && next) ? `justify-between` : (!previous && next) ? `justify-end` : `justify-start`} select-none`}>
    {previous ? <div className = {`max-w-48perc`}>

      <Link href = {`/[version]/[lang]/[...slug]`} as = {`/${version}/${lang}/${previous.value}`}>

        <a className = {`flex text-gray-700 dark:text-dark-300`}>
          <div className = {`flex flex-row w-full`}>
            <div className = "flex flex-row inline-block pr-2 mr-0 md:mr-1 border border-gray-500 dark:border-dark-700 bg-white dark:bg-black hover:bg-gray-400 dark-hover:bg-dark-800">
              <img className = "flex-none my-auto inline-block w-4 h-4" src = {`https://blamejared.com/svg${theme.pageTheme === "dark" ? `/dark` : ``}/cheveron-left.svg`} alt = "cheveron-left"/>
              <span className = "flex-shrink">
                                Previous
                            </span>
            </div>
            <span className = {`sr-only md:not-sr-only truncate`}>
                            {previous.key}
                        </span>
          </div>
        </a>

      </Link>

    </div> : <></>} {next ? <div className = {`max-w-48perc`}>

    <Link href = {`/[version]/[lang]/[...slug]`} as = {`/${version}/${lang}/${next.value}`}>

      <a className = {`flex text-gray-700 dark:text-dark-300`}>
        <div className = {`flex flex-row w-full`}>
          <span className = {`sr-only md:not-sr-only truncate`}>{next.key}</span>
          <div className = "flex flex-row inline-block pl-2 ml-0 md:ml-1 border border-gray-500 dark:border-dark-700 bg-white dark:bg-black hover:bg-gray-400 dark-hover:bg-dark-800">
                         <span className = "flex-shrink">
                             Next
                         </span>
            <img className = "flex-none my-auto inline-block w-4 h-4" src = {`https://blamejared.com/svg${theme.pageTheme === "dark" ? `/dark` : ``}/cheveron-right.svg`} alt = "cheveron-right"/>
          </div>
        </div>
      </a>

    </Link>

  </div> : <></>}
  </div>;

}
