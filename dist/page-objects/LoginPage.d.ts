import { Page } from "@playwright/test";
export declare class LoginPage {
    private readonly page;
    private readonly emailField;
    private readonly passwordField;
    private readonly loginButton;
    private readonly otpfield;
    private readonly submitButton;
    constructor(page: Page);
    navigateToLogin(basePath: string): Promise<void>;
    login(email: string, password: string): Promise<void>;
}
