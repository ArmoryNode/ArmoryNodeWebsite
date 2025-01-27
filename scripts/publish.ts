import * as fs from "jsr:@std/fs";
import { compileAll } from "./build.ts";

/**
 * Removes the publish directory (dist) if it exists.
 * Silently fails if the directory doesn't exist.
 */
export async function removePublishDirectory() {
  try {
    await Deno.remove("./dist", { recursive: true });
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
}

/**
 * Publishes the website files to the dist directory.
 */
export async function publish() {
  console.log("🏗️  Running build step...");
  await compileAll();

  console.log("🚀 Publishing files to `dist/`...");

  await removePublishDirectory();
  await fs.copy("./static", "./dist"); // Copy static files to dist
  await fs.copy("./wrangler.toml", "./dist/wrangler.toml");
}

// Only run if the script is run directly, not imported as a module
if (import.meta.main) {
  await publish();
  console.log("✅ Publish complete!");
}
