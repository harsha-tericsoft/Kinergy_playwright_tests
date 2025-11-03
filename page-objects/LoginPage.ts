import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly verifyDashboardPage: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = this.page.getByPlaceholder("Enter Email ID");
    this.passwordField = this.page.getByPlaceholder("Enter password");
    this.loginButton = this.page.getByRole("button", { name: "LOGIN" });
    this.verifyDashboardPage = this.page.locator("//div[@class='page-title-text']");
    // Selector for error message (adjust based on your exact locator)
    this.errorMessage = this.page.locator("//div[@class='Toastify']");
  }

  async navigateToLogin(basePath: string): Promise<void> {
    await this.page.goto(`${basePath}/login`);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click({timeout:20000});
  }

  async verifyLogin(): Promise<void> {
    await expect(this.verifyDashboardPage).toBeVisible({timeout:20000});
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }
}
