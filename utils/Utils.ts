import { parse } from "cookie";
import { NextPageContext } from "next";
import { NavObject, Theme } from "./Interfaces";
import { useEffect, useState } from "preact/hooks";

export const DOCS_DEV = process.env.NEXT_PUBLIC_CRAFTTWEAKER_DOCS_DEV === "true";
export const SITE_DEV = process.env.NEXT_PUBLIC_SITE_DEV === "true";

export function matchesMedia(query: string) {
  const mediaQuery = window.matchMedia(query);
  const getValue = () => {
    return mediaQuery.matches
  };
  const [value, setValue] = useState(getValue);
  useEffect(
    () => {
      const handler = () => setValue(getValue);
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler);
    },
    []
  );

  return value;
}

export function getTheme(context: NextPageContext): Theme {
  let pageTheme = "light";
  let hljsStyle = "default";
  if (context.req) {
    if (context.req.headers.cookie) {
      if (parse(context.req.headers.cookie)["pageTheme"]) {
        pageTheme = parse(context.req.headers.cookie)["pageTheme"];
        if (pageTheme !== "light" && pageTheme !== "dark") {
          pageTheme = "light";
        }
      }
      if (parse(context.req.headers.cookie)["hljsStyle"]) {
        hljsStyle = parse(context.req.headers.cookie)["hljsStyle"];
      }
    }
  }
  return { pageTheme, hljsStyle }
}


export const walkContaining = function (doc: object[], needle: string) {

  for (let docKey in doc) {
    if (!doc.hasOwnProperty(docKey)) {
      // whatever webstorm
      continue;
    }
    let val: any = doc[docKey];
    if (typeof val === "object") {
      if (walkContaining(val, needle)) {
        return true;
      }
    } else {
      if (val === needle) {
        return true;
      }
    }
  }
  return false;
};
export const walk = function (doc: object[], done: NavObject[]) {

  done = done || [];

  for (let docKey in doc) {
    if (!doc.hasOwnProperty(docKey)) {
      // whatever webstorm
      continue;
    }
    let val: any = doc[docKey];
    if (typeof val === "object") {
      done = walk(val, done);
    } else {
      done.push({ key: docKey, value: val });
    }
  }
  return done;
};

