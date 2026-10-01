import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const outputFile = path.resolve("dist/public/index.html");
const rootPlaceholder = '<div id="root"></div>';
const document = readFileSync(outputFile, "utf8");

if (!document.includes(rootPlaceholder)) {
  throw new Error(`Could not find the expected React root in ${outputFile}`);
}

const renderedPage = renderToString(createElement(App));
const prerenderedDocument = document.replace(
  rootPlaceholder,
  `<div id="root">${renderedPage}</div>`
);
writeFileSync(outputFile, prerenderedDocument, "utf8");
console.log(
  `Pre-rendered ${renderedPage.length.toLocaleString()} characters into ${outputFile}`
);
