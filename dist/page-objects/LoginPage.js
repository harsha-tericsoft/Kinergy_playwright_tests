"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    page;
    emailField;
    passwordField;
    loginButton;
    otpfield;
    submitButton;
    constructor(page) {
        this.page = page;
        this.emailField = this.page.locator('#email_input');
        this.passwordField = this.page.getByPlaceholder("Enter Password");
        this.loginButton = this.page.getByRole("button", { name: "Login" });
        this.otpfield = this.page.locator("(//input[@type='tel'])");
        this.submitButton = this.page.getByRole("button", { name: "Submit" });
    }
    async navigateToLogin(basePath) {
        await this.page.goto(`${basePath}/login`);
    }
    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click({ timeout: 20000 });
        for (let i = 1; i <= 6; i++) {
            await this.page.locator(`(//input[@type='tel'])[${i}]`).fill("1");
        }
        await this.submitButton.click();
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map