import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import todosRoutes from './routes/todos.ts';

const app = new Application();

app.use(async (ctx: Context, next) => {
  // Perform actions before reaching routes (if needed)
  console.log('Middleware Before!');
  // For example, you can access request information like method and URL
  console.log(`Request Method: ${ctx.request.method} - URL: ${ctx.request.url}`);
  await next(); // Continue to the next middleware or route handler
  // Perform actions after reaching routes (if needed)
  console.log('Middleware After!');
});

app.use(async (ctx: Context, next) => {
  ctx.response.body = "Hello World!";
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 3000 });

