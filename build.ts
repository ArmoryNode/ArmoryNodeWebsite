import { compile as ElmCompile } from "https://deno.land/x/deno_elm_compiler@0.1.0/compiler.ts";
import { minify } from "npm:terser";
import * as sass from "npm:sass";

const maxRetries = 3;

await compileSass();
await compileAndMinifyElm();

async function compileAndMinifyElm(retries: number = 0) {
    try {
        await ElmCompile("./src/Main.elm", {
            output: "./static/js/main.js"
        });

        const js = await Deno.readTextFile("./static/js/main.js");
        const minifiedJs = await minify(js);
        await Deno.writeTextFile("./static/js/main.min.js", minifiedJs.code ?? ""); 
        await Deno.remove("./static/js/main.js"); // cleanup
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            Deno.mkdir("./static/js", { recursive: true });

            if (retries < maxRetries) {
                compileAndMinifyElm(retries + 1);
            } else {
                console.error("Failed to minify js after 3 retries");
                console.error(error);
                return;
            }
        } else {
            throw error;
        }
    }
}

async function compileSass(retries: number = 0) {
    try {
        const compiledCss = sass.compile("./src/assets/styles/main.scss", {
            style: "compressed",
            sourceMap: false
        });
        await Deno.writeTextFile("./static/css/main.min.css", compiledCss.css);
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            Deno.mkdir("./static/css", { recursive: true });

            if (retries < maxRetries) {
                compileSass(retries + 1);
            } else {
                console.error("Failed to compile Sass after 3 retries");
                console.error(error);
                return;
            }
        } else {
            throw error;
        }
    }
}