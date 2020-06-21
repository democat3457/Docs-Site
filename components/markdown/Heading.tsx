import React, { ReactNode } from "react";
import { HeadingProps } from "../../utils/Interfaces";

function makeHeader(level: number, id: string, child: ReactNode[]) {

  switch (level) {
    case 1:
      return <h1 id = {id}>
        {child}
      </h1>
    case 2:
      return <h2 id = {id}>
        {child}
      </h2>
    case 3:
      return <h3 id = {id}>
        {child}
      </h3>
    case 4:
      return <h4 id = {id}>
        {child}
      </h4>
    case 5:
      return <h5 id = {id}>
        {child}
      </h5>
    case 6:
      return <h6 id = {id}>
        {child}
      </h6>
  }
}

export default function Heading({ level, children }: HeadingProps) {
  let child: any = children[0];
  let id = child.props.value.toLowerCase().replace(/[^a-zA-Z0-9_-]/gmi, "-");

  return <a href = {`#${id}`} className={`block`}>
    {makeHeader(level, id, child)}
  </a>

}