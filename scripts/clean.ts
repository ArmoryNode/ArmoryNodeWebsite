import { removePublishDirectory } from "./publish.ts";

async function cleanDirectories(directories: string[]) {
  try {
    for (const dir of directories) {
      for await (const item of Deno.readDir(`./static/${dir}`)) {
        const filePath = `./static/${dir}/${item.name}`;
        await Deno.remove(filePath);
      }
    }
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
}

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