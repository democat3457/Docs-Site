import React from "react";
import Page, { getServerSideProps as gssp } from "./[...slug]";
import { NextPageContext } from "next";

export default Page;

export async function getServerSideProps(context: NextPageContext) {
  // Hopefully this works fine
  return await gssp(context);
}