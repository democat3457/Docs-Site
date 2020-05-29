import React from "react";
import Link from "next/link";
import { CLinkProps } from "../../utils/Interfaces";

export default function Clink({ href, children }: CLinkProps) {
  return (
    <Link href = {`/[version]/[lang]/[...slug]`} as = {href}>

      <a className = {`text-blue-700 dark:text-blue-300 break-all`}>
        {children}
      </a>

    </Link>
  )
}