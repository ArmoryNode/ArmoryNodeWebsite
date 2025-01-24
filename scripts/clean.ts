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

async function removeDirectories(directories: string[]) {
  try {
    for (const dir of directories) {
      await Deno.remove(dir, { recursive: true });
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
  await removeDirectories(["dist"]);
}

// Only run if the script is run directly, not imported as a module
if (import.meta.main) {
    await clean();
    console.log("✅ Clean complete!");
}