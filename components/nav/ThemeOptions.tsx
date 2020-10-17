import { motion } from "framer-motion";
import { listStyles } from "../markdown/CodeBlock";
import { ThemeContext } from "../layout";
import React, { useContext, useState } from "react";

export default function ThemeOptions() {
  const [themeOptionsOpen, setThemeOptionsOpen] = useState(false);
  const theme = useContext(ThemeContext);
  let motionOptions = {
    height: themeOptionsOpen ? "100%" : 0
  }
  return <>
    <div className = "flex-none relative my-auto inline-block border-b dark:border-dark-700 py-2 flex flex-row pl-2 text-center cursor-pointer hover:bg-gray-400 dark-hover:bg-dark-600 select-none" onClick = {() => {
      setThemeOptionsOpen(!themeOptionsOpen)
    }}>
            <span className = {`mx-auto`}>
                Theme options
            </span>
    </div>
    <motion.div
      initial = {motionOptions}
      animate = {motionOptions}
      className = {`overflow-hidden`}
    >
      <div className = {`bg-gray-100 dark:bg-dark-900`}>
        <div className = "flex-none relative my-auto inline-block border-b dark:border-dark-700 py-2 flex flex-row px-2">
          <label htmlFor = "theme-select" className = "">Theme:</label>
          <select id = "theme-select" className = {`bg-transparent px-1 flex-grow`} onChange = {event => {
            theme.setTheme(event.target.value, theme.hljsStyle);
          }} defaultValue = {theme.pageTheme}>
            <option value = {`light`} className = {`text-black`}>Light</option>
            <option value = {`dark`} className = {`text-black`}>Dark</option>
          </select>
        </div>
        <div className = "flex-none relative my-auto inline-block border-b dark:border-dark-700 py-2 flex flex-row px-2">
          <label htmlFor = "hljs-style" className = "">Code Theme:</label>
          <select id = "hljs-style" className = {`bg-transparent px-1 flex-grow`} onChange = {event => {
            theme.setTheme(theme.pageTheme, event.target.value);
          }} defaultValue = {theme.hljsStyle}>
            <option value = {`default`} className = {`text-black`}>Default</option>
            {Object.keys(listStyles()).map(value =>
              <option key = {value} value = {value} className = {`text-black`}>{value}</option>)}
          </select>
        </div>
      </div>
    </motion.div>
  </>;
}