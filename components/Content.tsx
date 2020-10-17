import React from "react";
import ReactMarkdown from "react-markdown";
import Clink from "./markdown/Clink";
import CodeBlock from "./markdown/CodeBlock";
import InlineCode from "./markdown/InlineCode";
import Table from "./markdown/Table";
import TableCell from "./markdown/TableCell";
import Heading from "./markdown/Heading";
import { ContentProps } from "../utils/Interfaces";

export default function Content({ version, lang, page }: ContentProps) {


  function transform(url: string, image: boolean) {
    if (!url) {
      return ``;
    }
    if (url.startsWith("http")) {
      return url;
    }
    if (url.startsWith("#")) {
      return url;
    }
    if (!url.startsWith("/")) {
      return `../${url}`;
    }

    let newUrl = url.startsWith("/") ? url : `/${url}`;
    if (!image) {
      if (!newUrl.endsWith("/")) {
        newUrl += "/";
      }
    }
    return `/${version}/${lang}${newUrl}`;
  }

  const linkReferenceRenderer: (reference: any) => (string | any) = (reference: any) => {
    if (!reference.href) {
      if (!reference.children.length) {
        return `[][]`;
      }
      return <>[{reference.children}]</>;
    }
    return `[][]`
  };
  return <>
    <div id = "content" className = "markdown pb-3">
      <ReactMarkdown source = {page} escapeHtml = {false} renderers = {{
        code: CodeBlock,
        inlineCode: InlineCode,
        linkReference: linkReferenceRenderer,
        table: Table,
        tableCell: TableCell,
        link: Clink,
        heading: Heading
      }} transformLinkUri = {uri => transform(uri, false)} transformImageUri = {uri => transform(uri, true)}/>
    </div>
  </>
}
