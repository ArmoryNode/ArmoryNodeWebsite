import { compileToString as ElmCompile } from "https://deno.land/x/deno_elm_compiler@0.1.0/compiler.ts";
import { minify } from "npm:terser";
import * as sass from "npm:sass";

const maxRetries = 3;

async function compileAndMinifyElm(retries: number = 0) {
    try {
        const compiledJs = await ElmCompile("./src/Main.elm", { mode: "optimize" });
        const minifiedJs = await minify(compiledJs);
        await Deno.writeTextFile("./static/js/main.min.js", minifiedJs.code ?? "");
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            if (error.message.includes("Failed to spawn 'elm': entity not found")) {
                throw "Elm is not installed. Please install Elm from https://guide.elm-lang.org/install/";
            }

            Deno.mkdir("./static/js", { recursive: true });

            if (retries < maxRetries) {
                compileAndMinifyElm(retries + 1);
            } else {
                console.error("Failed to compile Elm after 3 retries");
            }
        }

        throw error;
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
            }
        }

        throw error;
    }
}

// Only run if the script is run directly, not imported as a module
if (import.meta.main) {
    await compile();
}

export async function compile() {
    try {
        console.log("🎨 Compiling Sass...");
        await compileSass();
    
        console.log("🌳 Compiling Elm...");
        await compileAndMinifyElm();
    
        console.log("✅ Done!");
    } catch (error) {
        console.log(error);
        Deno.exit(1);
    }
}