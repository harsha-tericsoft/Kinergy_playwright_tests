// import { Page, Locator, expect } from "@playwright/test";

// export class LoginPage {
//   private readonly page: Page;
//   private readonly emailField: Locator;
//   private readonly passwordField: Locator;
//   private readonly loginButton: Locator;
//   private readonly otpfield: Locator;
//   private readonly submitButton: Locator;

//   // private readonly verifyDashboardPage: Locator;
//   // private readonly errorMessage: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.emailField = this.page.getByPlaceholder('Enter Email');
//     this.passwordField = this.page.getByPlaceholder('Enter Password');
//     this.loginButton = this.page.getByRole('button', { name: 'Login' });
//     this.otpfield = this.page.locator("(//input[@type='tel'])[1]");
//     this.submitButton = this.page.getByRole('button', { name: 'Submit' });
//     // this.verifyDashboardPage = this.page.locator("//div[@class='page-title-text']");
//     // // Selector for error message (adjust based on your exact locator)
//     // this.errorMessage = this.page.locator("//div[@class='Toastify']");
//   }

//   async navigateToLogin(basePath: string): Promise<void> {
//     await this.page.goto(`${basePath}/login`);
//   }

//   async login(email: string, password: string): Promise<void> {
//     await this.emailField.fill(email);
//     await this.passwordField.fill(password);
//     await this.loginButton.click({timeout:20000});
//   }}

//   // async verifyLogin(): Promise<void> {
//   //   await expect(this.verifyDashboardPage).toBeVisible({timeout:20000});
//   // }

// //   async verifyErrorMessage(expectedMessage: string): Promise<void> {
// //     await expect(this.errorMessage).toHaveText(expectedMessage);
// //   }
// // }


import { Page, Locator } from "@playwright/test";

/**
 * LoginPage - Page Object Model for Login functionality
 * Follows Single Responsibility Principle - handles only login operations
 */
export class LoginPage {
  protected readonly page: Page;
  
  // Timeout constants - following DRY principle
  private readonly TIMEOUTS = {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
  } as const;

  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly otpFields: Locator;
  private readonly submitButton: Locator;

  private readonly OTP_LENGTH = 6;

  constructor(page: Page) {
    this.page = page;
    this.emailField = this.page.locator("#email_input");
    this.passwordField = this.page.getByPlaceholder("Enter Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.otpFields = this.page.locator("(//input[@type='tel'])");
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(basePath: string): Promise<void> {
    await this.page.goto(`${basePath}/login`, {
      waitUntil: "networkidle",
      timeout: this.TIMEOUTS.LONG,
    });
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Perform login with email and password
   * Handles OTP verification automatically
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click({ timeout: this.TIMEOUTS.MEDIUM });
    
    // Handle OTP verification if present
    await this.handleOTPVerification();
  }

  /**
   * Handle OTP verification
   * Extracted as separate method following Single Responsibility Principle
   */
  private async handleOTPVerification(): Promise<void> {
    try {
      // Wait for OTP fields to appear
      await this.otpFields.first().waitFor({ 
        state: "visible", 
        timeout: this.TIMEOUTS.SHORT 
      });

      // Fill all OTP fields with default value (1)
      for (let i = 1; i <= this.OTP_LENGTH; i++) {
        await this.page.locator(`(//input[@type='tel'])[${i}]`).fill("1");
      }

      await this.submitButton.click();
      await this.page.waitForLoadState("networkidle");
    } catch {
      // OTP fields not found, assuming OTP verification is not required
      // Continue with login flow
    }
  }

  // async enterOtp(): Promise<void> {
  // for (let i = 1; i <= 6; i++) {
  //   await this.page.locator(`(//input[@type='tel'])[${i}]`).fill("1");
  // }
  // await this.submitButton.click();
  // }



  

  // Optional: verify login success (uncomment if needed)
  // async verifyLogin(): Promise<void> {
  //   await expect(this.page.locator("//div[@class='page-title-text']")).toBeVisible({ timeout: 20000 });
  // }

  // async verifyErrorMessage(expectedMessage: string): Promise<void> {
  //   await expect(this.page.locator("//div[@class='Toastify']")).toHaveText(expectedMessage);
  // }
}
