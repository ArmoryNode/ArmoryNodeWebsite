import { removePublishDirectory } from "./publish.ts";

/**
 * Removes all files in the specified directories.
 */
async function cleanDirectories(directories: string[]) {
  try {
    for (const dir of directories) {
      for await (const item of Deno.readDir(`./static/${dir}`)) {
        const filePath = `./static/${dir}/${item.name}`;
        await Deno.remove(filePath);
      }
    }
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound))
      throw error;
  }
}

/**
 * Cleans all generated files and removes the publish (dist) directory.
 */
export async function clean() {
  console.log("🧹 Cleaning generated files...");

  await cleanDirectories(["css", "js"]);
  await removePublishDirectory();
}

// Only run if the script is run directly, not imported as a module
if (import.meta.main) {
    await clean();
    console.log("✅ Clean complete!");
}
