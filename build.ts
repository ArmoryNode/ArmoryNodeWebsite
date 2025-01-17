import { compile as ElmCompile } from "https://deno.land/x/deno_elm_compiler@0.1.0/compiler.ts";
import { minify } from "npm:terser";
import * as sass from "npm:sass";

// Compile Elm to js
await ElmCompile("./src/Main.elm", {
    output: "./static/js/main.js"
});

// Minify js
const js = await Deno.readTextFile("./static/js/main.js");
const minifiedJs = await minify(js);
await Deno.writeTextFile("./static/js/main.min.js", minifiedJs.code ?? "");

// Compile Sass to css
const compiledCss = sass.compile("./src/assets/styles/main.scss", {
    style: "compressed",
    sourceMap: false
});
await Deno.writeTextFile("./static/css/main.min.css", compiledCss.css);

// Clean up intermediate files
await Deno.remove("./static/js/main.js");