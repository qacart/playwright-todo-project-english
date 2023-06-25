import { APIRequestContext, Page } from '@playwright/test';
import TodoApi from '../apis/TodoApi';
import User from '../models/User';

export default class NewTodoPage {
	private get newTodoInput() {
		return '[data-testid=new-todo]';
	}

	private get newTodoSubmit() {
		return '[data-testid=submit-newTask]';
	}

	async load(page: Page) {
		await page.goto('/todo/new');
	}

	async addTodo(page: Page, task: string) {
		await page.type(this.newTodoInput, task);
		await page.click(this.newTodoSubmit);
	}

	async addTodoUsingApi(request: APIRequestContext, user: User) {
		await new TodoApi().addTodo(request, user);
	}
}
