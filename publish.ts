import * as fs from "jsr:@std/fs";
import { compile } from "./build.ts";

/// Builds and publishes necessary files to `dist/` for deployment.
async function publish() {
    console.log("🏗️ Running build step...");
    await compile();

    console.log("🚀 Publishing files to `dist/`...");
    await Deno.mkdir("./dist", { recursive: true });
    await fs.copy("./static", "./dist/static", { overwrite: true });
    await fs.copy("./functions", "./dist/functions", { overwrite: true });
    await fs.copy("./wrangler.toml", "./dist/wrangler.toml", { overwrite: true });

    console.log("✅ Publish complete!");
}

await publish();