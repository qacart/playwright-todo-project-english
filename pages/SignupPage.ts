import { APIRequestContext, BrowserContext, Page } from '@playwright/test';
import User from '../models/User';
import UserApi from '../apis/UserApi';
import config from '../playwright.config';

export default class SignupPage {
	async load(page: Page) {
		await page.goto('/signup');
	}

	private get firstNameInput() {
		return `[data-testid=first-name]`;
	}

	private get lastNameInput() {
		return `[data-testid=last-name]`;
	}

	private get emailInput() {
		return `[data-testid=email]`;
	}

	private get passwordInput() {
		return `[data-testid=password]`;
	}

	private get confirmPasswordInput() {
		return `[data-testid=confirm-password]`;
	}

	private get submitButton() {
		return `[data-testid=submit]`;
	}

	async signup(page: Page, user: User) {
		await page.type(this.firstNameInput, user.getFirstName());
		await page.type(this.lastNameInput, user.getLastName());
		await page.type(this.emailInput, user.getEmail());
		await page.type(this.passwordInput, user.getPassword());
		await page.type(this.confirmPasswordInput, user.getPassword());
		await page.click(this.submitButton);
	}

	async signupUsingAPI(
		request: APIRequestContext,
		user: User,
		context: BrowserContext
	) {
		const response = await new UserApi().signup(request, user);

		const responseBody = await response.json();
		const access_token = responseBody.access_token;
		const firstName = responseBody.firstName;
		const userID = responseBody.userID;

		await context.addCookies([
			{
				name: 'access_token',
				value: access_token,
				url: config.use?.baseURL,
			},
			{
				name: 'firstName',
				value: firstName,
				url: config.use?.baseURL,
			},
			{
				name: 'userID',
				value: userID,
				url: config.use?.baseURL,
			},
		]);
	}
}
