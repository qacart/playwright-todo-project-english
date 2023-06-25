import { test, expect } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';
import NewTodoPage from '../pages/NewTodoPage';

test('should be able to add a new todo', async ({ page, request, context }) => {
	const user = new User();
	const signupPage = new SignupPage();
	await signupPage.signupUsingAPI(request, user, context);
	const newTodoPage = new NewTodoPage();
	await newTodoPage.load(page);
	await newTodoPage.addTodo(page, 'Learn Playwright!');
	const todoPage = new TodoPage();
	const todoItem = await todoPage.getTodoItem(page);
	expect(await todoItem.innerText()).toEqual('Learn Playwright!');
});

test('should be able to delete a todo', async ({ page, request, context }) => {
	const user = new User();
	const signupPage = new SignupPage();
	await signupPage.signupUsingAPI(request, user, context);

	const newTodoPage = new NewTodoPage();
	await newTodoPage.addTodoUsingApi(request, user);

	const todoPage = new TodoPage();
	await todoPage.load(page);
	await todoPage.deleteTodo(page);
	const noTodosMessage = await todoPage.getNoTodosMessage(page);
	await expect(noTodosMessage).toBeVisible();
});
