async function cleanDirectories(directories: string[]) {
    for (const dir of directories) {
        for await (const item of Deno.readDir(`./static/${dir}`)) {
            const filePath = `./static/${dir}/${item.name}`;
            await Deno.remove(filePath);
        }
    }
}

async function removeDirectories(directories: string[]) {
    for (const dir of directories) {
        await Deno.remove(dir, { recursive: true });
    }
}

try {
    console.log("🧹 Cleaning generated files...")

    await cleanDirectories(["css", "js"]);
    await removeDirectories(["dist"]);
    
    console.log("✅ Clean complete!");
} catch (error) {
    if (!(error instanceof Deno.errors.NotFound))
        throw error;
}