import { compile } from "./build.ts";

async function runTasks() {
    try {
        // Compile SASS and Elm files
        await compile();

        // Run wrangler
        console.log("🤠 Running Wrangler...");
        const wranglerStep = new Deno.Command("npx", {
            args: ["wrangler", "pages", "dev"],
            stdout: "inherit",
            stderr: "inherit",
        });
        const wranglerTask = wranglerStep.spawn();
        await wranglerTask.status;
    } catch (error) {
        if (error instanceof Deno.errors.NotFound && error.message.includes("Failed to spawn 'wrangler'")) {
            console.error("Wrangler is not installed. Please install Wrangler from https://developers.cloudflare.com/workers/cli-wrangler/install-update");
            Deno.exit(1);
        }
        console.error("Error running tasks:", error);
        Deno.exit(1);
    }
}

await runTasks();