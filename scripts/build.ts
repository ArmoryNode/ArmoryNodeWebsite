import { compileToString as ElmCompile } from "https://deno.land/x/deno_elm_compiler@0.1.0/compiler.ts";
import { minify } from "npm:terser";
import * as sass from "npm:sass";

async function createDirectories() {
    await Deno.mkdir("./static/css", { recursive: true }).catch(error => {
        if (error instanceof Deno.errors.AlreadyExists)
            return;
        throw error;
    });
    await Deno.mkdir("./static/js", { recursive: true }).catch(error => {
        if (error instanceof Deno.errors.AlreadyExists)
            return;
        throw error;
    });
}

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

async function compileSass() {
    const compiledCss = sass.compile("./src/assets/styles/main.scss", {
        style: "compressed",
        sourceMap: false
    });
    await Deno.writeTextFile("./static/css/main.min.css", compiledCss.css, {
        create: true
    });
}

// Only run if the script is run directly, not imported as a module
if (import.meta.main) {
    await compile();
    console.log("✅ Build complete!");
}

export async function compile() {
    await createDirectories();

    console.log("🎨 Compiling Sass...");
    await compileSass();

    console.log("🌳 Compiling Elm...");
    await compileAndMinifyElm();
}
