import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import todosRoutes from './routes/todos.ts';

const app = new Application();
const router = new Router();

// Middleware for logging
app.use(async (ctx, next) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
});

// Middleware for error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: 'Internal Server Error' };
  }
});

// Simple route for the root path
router.get('/', (ctx) => {
  ctx.response.body = 'Welcome to the API!';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

console.log('API is running on http://localhost:3000');
await app.listen({ port: 3000 });