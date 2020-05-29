import { parse } from "cookie";
import { NextPageContext } from "next";
import { NavObject, Theme } from "./Interfaces";

export const DOCS_DEV = process.env.NEXT_PUBLIC_CRAFTTWEAKER_DOCS_DEV === "true";

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

export const walkYaml = function (doc: object[], done: NavObject[]) {

  done = done || [];

  for (let docKey in doc) {
    if (!doc.hasOwnProperty(docKey)) {
      // whatever webstorm
      continue;
    }
    let val: any = doc[docKey];
    if (typeof val === "object") {
      done = walkYaml(val, done);
    } else {
      done.push({ key: docKey, value: val });
    }
  }
  return done;
};

