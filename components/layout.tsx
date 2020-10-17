import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import Header from "./header";
import { LayoutProps } from "../utils/Interfaces";
import { initGA, pageView } from "../utils/Analytics";
import { createContext } from "preact";

export const ThemeContext = createContext({
  pageTheme: "light",
  hljsStyle: "default",
  setTheme: (pageTheme: string, style: string) => {
  }
});

function Layout({ theme, current, showingNav, setShowingNav, children }: LayoutProps) {
  const [themeState, setTheme] = useState({
    pageTheme: theme.pageTheme,
    hljsStyle: theme.hljsStyle,
  });
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    pageView();
  }, [current]);
  return (
    <ThemeContext.Provider value = {{
      pageTheme: themeState.pageTheme,
      hljsStyle: themeState.hljsStyle,
      setTheme: (pageTheme, style) => {
        setTheme({ pageTheme: pageTheme, hljsStyle: style });
        axios.post("/api/set_theme", { pageTheme: pageTheme, hljsStyle: style }).then(() => {
        }).catch(reason => {
          console.log(reason);
        })
      }
    }}>
      <div className = {`${themeState.pageTheme === "dark" ? `mode-dark` : `mode-light`}`}>
        <div className = "flex flex-col min-h-screen bg-gray-100 dark:bg-dark-900">

          <Header showingNav = {showingNav} setShowingNav = {setShowingNav}/>
          <main className = "flex-grow ">
            {children}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Layout;
