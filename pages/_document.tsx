import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang = {"en"}>

        <Head>
          <script data-ad-client = "ca-pub-7211841189345460" async src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

        </Head>
        <body>
        <script dangerouslySetInnerHTML = {{
          __html: `(function () {let storageKey = "darkMode";let classNameDark = "mode-dark";let classNameLight = "mode-light";function setClassOnDocumentBody(darkMode) {document.body.classList.add(darkMode ? classNameDark : classNameLight);document.body.classList.remove(darkMode ? classNameLight : classNameDark);}let preferDarkQuery = "(prefers-color-scheme: dark)";let mql = window.matchMedia(preferDarkQuery);let supportsColorSchemeQuery = mql.media === preferDarkQuery;let localStorageTheme = null;try {localStorageTheme = localStorage.getItem(storageKey);} catch (err) {}let localStorageExists = localStorageTheme !== null;if (localStorageExists) {localStorageTheme = JSON.parse(localStorageTheme);}if (localStorageExists) {setClassOnDocumentBody(localStorageTheme);} else if (supportsColorSchemeQuery) {setClassOnDocumentBody(mql.matches);localStorage.setItem(storageKey, mql.matches);} else {var isDarkMode = document.body.classList.contains(classNameDark);localStorage.setItem(storageKey, JSON.stringify(isDarkMode));}})();`
        }}/>
        <Main/>

        <NextScript/>
        </body>

      </Html>
    )
  }
}

export default MyDocument