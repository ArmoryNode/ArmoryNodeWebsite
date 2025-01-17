import { Application, send } from "jsr:@oak/oak";

const app = new Application();
const port = 8000;

app.use(async (context) => {
  const filePath = context.request.url.pathname;
  await send(context, filePath, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  });
});

console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });