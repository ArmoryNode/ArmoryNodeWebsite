import * as fs from "jsr:@std/fs";
import { compile } from "./build.ts";

async function deleteExistingDist() {
    try {
        await Deno.remove("./dist", { recursive: true });
    } catch (error) {
        if (!(error instanceof Deno.errors.NotFound))
            throw error;
    }
}

/// Builds and publishes necessary files to `dist/` for deployment.
async function publish() {
    console.log("🏗️  Running build step...");
    await compile();

    console.log("🚀 Publishing files to `dist/`...");

    await deleteExistingDist();
    await fs.copy("./static", "./dist/static", { overwrite: true });
    await fs.copy("./wrangler.toml", "./dist/wrangler.toml", { overwrite: true });
    await fs.copy("./_headers", "./dist/_headers");

    console.log("✅ Publish complete!");
}

await publish();