import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body["hljsStyle"] || !req.body["pageTheme"]) {
    res.writeHead(400).end(`Bad request! hljsStyle: ${req.body["hljsStyle"]} pageTheme: ${req.body["pageTheme"]}`);
    return;
  }
  let expiresAt: Date = new Date(9999, 12, 31, 23, 59, 59);
  let options: CookieSerializeOptions = { path: '/', expires: expiresAt };
  res.setHeader('Set-Cookie', [serialize('hljsStyle', req.body["hljsStyle"], options), serialize('pageTheme', req.body["pageTheme"], options)]);
  res.end();
};