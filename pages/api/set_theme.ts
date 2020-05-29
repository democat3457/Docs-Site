import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body["hljsStyle"] || !req.body["pageTheme"]) {
    res.writeHead(400).end(`Bad request! hljsStyle: ${req.body["hljsStyle"]} pageTheme: ${req.body["pageTheme"]}`);
    return;
  }
  res.setHeader('Set-Cookie', [serialize('hljsStyle', req.body["hljsStyle"], { path: '/' }), serialize('pageTheme', req.body["pageTheme"], { path: '/' })]);
  res.end();
};