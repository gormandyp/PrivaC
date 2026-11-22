// The README sends people to the published Chrome Web Store listing.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const readme = fs.readFileSync(path.join(__dirname, "..", "README.md"), "utf8");
// A listing address ends in the extension's 32-letter id (letters a to p).
const STORE_LINK = /https:\/\/chromewebstore\.google\.com\/detail\/[a-z0-9-]+\/[a-p]{32}/;
const ALL_STORE_LINKS = new RegExp(STORE_LINK.source, "g");

test("README links to PrivaC's Chrome Web Store listing near the top and in Install", () => {
  const links = readme.match(ALL_STORE_LINKS) || [];
  assert.ok(links.length >= 2, "expected the store link at the top and in the Install section");
  const top = readme.slice(0, readme.indexOf("## For judges"));
  assert.match(top, STORE_LINK);
  const install = readme.slice(readme.indexOf("## Install"), readme.indexOf("## Privacy"));
  assert.match(install, STORE_LINK);
});

test("README has no leftover store-link placeholder", () => {
  assert.doesNotMatch(readme, /STORE[_ ]LINK/);
});
