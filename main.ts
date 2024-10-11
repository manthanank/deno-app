// main.ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

interface Todo {
  id: string;
  task: string;
}

let todos: Todo[] = [];

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

// Get all todos
router.get("/todos", (ctx) => {
  ctx.response.body = { todos: todos };
});

// Create a new todo
router.post("/todos", async (ctx) => {
  const data = await ctx.request.body.json();
  const newTodo: Todo = {
    id: new Date().toISOString(),
    task: data.task,
  };

  todos.push(newTodo);

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

// Update a todo
router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body.json();
  const todoIndex = todos.findIndex((todo) => todo.id === tid);
  
  if (todoIndex !== -1) {
    todos[todoIndex] = { id: todos[todoIndex].id, task: data.task };
    ctx.response.body = { message: "Updated todo" };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo not found" };
  }
});

// Delete a todo
router.delete("/todos/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  const initialLength = todos.length;
  todos = todos.filter((todo) => todo.id !== tid);
  
  if (todos.length < initialLength) {
    ctx.response.body = { message: "Deleted todo" };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo not found" };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('API is running on http://localhost:3000');
await app.listen({ port: 3000 });
