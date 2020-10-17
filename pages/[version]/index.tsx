import { NextPageContext } from "next";

export default function Index() {

  return <>
  </>
}

export async function getServerSideProps(context: NextPageContext) {
  if (context.res) {
    context.res.writeHead(302, {
      Location: "/",
      'Content-Type': 'text/html; charset=utf-8',
    })
    context.res.end();
  }
  return {
    props: { none: "" }
  }

}