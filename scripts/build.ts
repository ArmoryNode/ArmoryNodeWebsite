import { compileToString as ElmCompile } from "https://deno.land/x/deno_elm_compiler@0.1.0/compiler.ts";
import { minify } from "npm:terser";
import * as sass from "npm:sass";

/**
 * Creates the directories for CSS and JS if they don't already exist.
 */
async function createDirectories() {
    await Deno.mkdir("./static/css").catch(error => {
        if (error instanceof Deno.errors.AlreadyExists)
            return;
        throw error;
    });
    await Deno.mkdir("./static/js").catch(error => {
        if (error instanceof Deno.errors.AlreadyExists)
            return;
        throw error;
    });
}

/**
 * Compiles Elm code, minifies it, and writes it to the static/js directory.
 */
async function compileAndMinifyElm() {
    try {
        const compiledJs = await ElmCompile("./src/Main.elm", { mode: "optimize" });
        const minifiedJs = await minify(compiledJs, { ecma: 2016 });
        await Deno.writeTextFile("./static/js/main.min.js", minifiedJs.code ?? "");
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            if (error.message.includes("Failed to spawn 'elm': entity not found")) {
                throw "Elm is not installed. Please install Elm from https://guide.elm-lang.org/install/";
            }
        }

        throw error;
    }
}

/**
 * Compiles SASS files and writes it to the static/css directory.
 */
async function compileSass() {
    const compiledCss = sass.compile("./src/assets/styles/main.scss", {
        style: "compressed",
        sourceMap: false
    });
    await Deno.writeTextFile("./static/css/main.min.css", compiledCss.css);
}

/**
 * Compiles all assets.
 */
export async function compileAll() {
    await createDirectories();

    console.log("🎨 Compiling Sass...");
    await compileSass();

    console.log("🌳 Compiling Elm...");
    await compileAndMinifyElm();
}


// Only run if the script is run directly, not imported as a module
if (import.meta.main) {
    await compileAll();
    console.log("✅ Build complete!");
}
