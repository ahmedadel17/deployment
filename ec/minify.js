const { execSync } = require("child_process");
const glob = require("glob");

function minifyFiles(pattern, type = "js") {
  const files = glob.sync(pattern);

  if (!files.length) {
    console.log(`No files found for: ${pattern}`);
    return;
  }

  files.forEach((file) => {
    if (type === "js" && file.endsWith(".min.js")) return;
    if (type === "css" && file.endsWith(".min.css")) return;

    let outFile;
    let cmd;

    if (type === "js") {
      outFile = file.replace(/\.js$/, ".min.js");
      cmd = `npx terser "${file}" -c drop_console=true -m -o "${outFile}"`;
      console.log(`👉 Minifying JS: ${file} → ${outFile}`);
    } else if (type === "css") {
      outFile = file.replace(/\.css$/, ".min.css");
      cmd = `npx csso "${file}" --output "${outFile}"`;
      console.log(`👉 Minifying CSS: ${file} → ${outFile}`);
    }

    try {
      execSync(cmd);
    } catch (error) {
      console.error(`❌ Error minifying ${file}:`, error.message);
    }
  });
}

// JS files
minifyFiles("assets/js/*.js");

// CSS files
minifyFiles("assets/css/*.css", "css");