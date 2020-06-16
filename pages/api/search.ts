import fs from 'fs-extra';
import path from 'path';
import lunr from 'lunr';
import url from 'url';
import { NextApiRequest, NextApiResponse } from "next";

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  let version: string = req.query["v"] as string;
  let lang: string = req.query["lang"] as string;
  let query: string = req.query["q"] as string;
  let limit: number = req.query["limit"] as unknown as number;
  if (!version || !lang || !query) {
    res.status(400).send({
      message: "Requires version (v), language (lang) and query (q), limit (limit) (optional)",
      example: "?v=1.12&lang=en&q=item&limit=5",
      given: {
        version: `${version}`,
        lang: `${lang}`,
        query: `${query}`,
        limit: `${limit}`
      }
    });
    return;
  }
  if (!limit || limit === 0) {
    limit = 5;
  }
  if (query.length < 3) {
    res.status(400).send({ error: "Minimum search query is 3 characters!" });
    return;
  }

  let docsDir = path.join(process.cwd(), "docs");

  let validVersions = fs.readdirSync(docsDir);
  if (validVersions.indexOf(version) === -1) {
    res.status(400).send({ error: `No version found for: '${version}'` });
    return;
  }
  let versionDir = path.join(docsDir, version);
  let validLangs = fs.readdirSync(versionDir);
  if (validLangs.indexOf(lang) === -1) {
    res.status(400).send({ error: `No language found for: '${lang}'` });
    return;
  }
  let langDir = path.join(versionDir, lang);


  let searchIndex = path.join(langDir, "search_index.json");
  let data = fs.readJsonSync(searchIndex);
  let documents: any = {};
  let index;
  // check if an index is provided first
  if (data.idx) {
    index = lunr.Index.load(data.idx);
    for (let i = 0; i < data.docs.length; i++) {
      let doc = data.docs[i];
      documents[doc.location] = doc;
    }
  } else {
    index = lunr(function () {
      this.field('title', { boost: 10 });
      this.field('text');
      this.ref('location');
      for (let i = 0; i < data.docs.length; i++) {
        let doc = data.docs[i];
        this.add(doc);
        documents[doc.location] = doc;
      }
    });
  }
  // Makes the search a bit more greedy, may need to adjust number in the future
  if (query.indexOf("^") !== -1) {
    query += "^8"
  }
  let results = index.search(query);
  let returned = [];
  for (let index in results) {
    if (limit > 0 || limit === -1) {
      if (limit !== -1) {
        limit--;
      }
      let doc = documents[results[index].ref];
      doc.location = url.parse(`/${version}/${lang}${doc.location.startsWith(`/`) ? `` : `/`}${doc.location}`).pathname;
      returned.push(doc);
    } else {
      break;
    }
  }

  res.send({ count: returned.length, totalCount: results.length, results: returned });
}