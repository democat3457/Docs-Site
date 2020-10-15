import React, { useContext } from "react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

import {
  a11yDark,
  a11yLight,
  agate,
  androidstudio,
  anOldHope,
  arduinoLight,
  atomOneDark,
  atomOneLight,
  codepenEmbed,
  colorBrewer,
  darcula,
  docco,
  dracula,
  foundation,
  github,
  githubGist,
  gml,
  googlecode,
  hopscotch,
  hybrid,
  irBlack,
  isblEditorDark,
  isblEditorLight,
  magula,
  monoBlue,
  monokai,
  monokaiSublime,
  obsidian,
  ocean,
  purebasic,
  qtcreatorDark,
  qtcreatorLight,
  railscasts,
  rainbow,
  routeros,
  solarizedDark,
  solarizedLight,
  sunburst,
  vs,
  vs2015,
  xcode,
  xt256,
  zenburn
}
// @ts-ignore
  from 'react-syntax-highlighter/dist/cjs/styles/hljs/index';
import SimpleBar from "simplebar-react";
import zenscript from '../zenscript';
import { CodeBlockProps } from "../../utils/Interfaces";
import useDarkMode from "use-dark-mode";

SyntaxHighlighter.registerLanguage('zenscript', zenscript);


export function listStyles(): any {
  return {
    a11yDark, a11yLight, agate, anOldHope,
    androidstudio, arduinoLight, atomOneDark, atomOneLight,
    codepenEmbed, colorBrewer, darcula, docco,
    dracula, foundation, githubGist, github,
    gml, googlecode, hopscotch, hybrid,
    irBlack, isblEditorDark, isblEditorLight,
    magula, monoBlue, monokaiSublime, monokai,
    obsidian, ocean, purebasic, qtcreatorDark,
    qtcreatorLight, railscasts, rainbow, routeros,
    solarizedDark, solarizedLight, sunburst, vs,
    vs2015, xcode, xt256, zenburn
  };
}

function getStyle(name: string): any {
  return listStyles()[name];
}

function CodeBlock({ language, value }: CodeBlockProps) {
  const darkMode = useDarkMode(false, { classNameDark: "mode-dark", classNameLight: "mode-light" });

  return (
    <SimpleBar forceVisible = {"x"} autoHide = {false} direction = {'x'}>
      <SyntaxHighlighter className = {`whitespace-pre-wrap`} language = {language} style = {getStyle(darkMode.value ? `a11yDark` : `a11yLight`)} showLineNumbers = {false}>
        {value}
      </SyntaxHighlighter> </SimpleBar>
  );
}

export default CodeBlock;