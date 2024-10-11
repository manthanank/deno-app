import { Context } from "https://deno.land/x/oak/mod.ts";

let todos: Array<{ id: string, text: string }> = [];

export const getTodos = (ctx: Context) => {
  ctx.response.body = { todos };
};

export const createTodo = async (ctx: Context) => {
  const { value } = await ctx.request.body();
  const newTodo = { id: new Date().toISOString(), text: value.text };
  todos.push(newTodo);
  ctx.response.body = { message: "Created todo!", todo: newTodo };
};

export const updateTodo = async (ctx: Context) => {
  const id = ctx.params.id;
  const { value } = await ctx.request.body();
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].text = value.text;
    ctx.response.body = { message: "Updated todo!" };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo not found!" };
  }
};

export const deleteTodo = (ctx: Context) => {
  const id = ctx.params.id;
  todos = todos.filter(todo => todo.id !== id);
  ctx.response.body = { message: "Deleted todo!" };
};