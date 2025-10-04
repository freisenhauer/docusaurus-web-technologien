// Kopiert die Browser-UMD von TypeScript in /static/vendor
const fs = require("fs");
const path = require("path");

const src = require.resolve("typescript/lib/typescript.js"); // UMD-Browser-Build
const destDir = path.join(__dirname, "..", "static", "vendor");
const dest = path.join(destDir, "typescript.js");

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log("[postinstall] Copied TypeScript UMD to", dest);
