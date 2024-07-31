import { parse } from "url";

function getIdFromUrl(req) {
  const parsedUrl = parse(req.url, true);
  const pathParts = parsedUrl.pathname.split("/");
  return Number(pathParts[pathParts.length - 1]);
}

module.exports = getIdFromUrl;
