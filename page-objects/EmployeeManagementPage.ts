import { Page, Locator, expect } from "@playwright/test";
import { addEmployeePage } from "tests/util";
import { log } from "tests/util/logger";

export class EmployeePage {
  private readonly page: Page;

  // Navigation and Header
  private readonly teamMembersMenu: Locator;
  private readonly employeeListTitle: Locator;
  private readonly searchEmployeeInput: Locator;
  private readonly addEmployeeButton: Locator;
  private readonly addEmployeePageTitle: Locator;

  // Basic Information Form
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly contactNumberInput: Locator;
  private readonly genderDropdown: Locator;
  private readonly roleDropdown: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;

  // Address Information Form
  private readonly streetAddressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateDropdown: Locator;
  private readonly zipCodeInput: Locator;

  // Action Buttons
  private readonly cancelButton: Locator;
  private readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation and Header
    this.teamMembersMenu = this.page.getByRole('link', { name: 'Team Members' });
    this.employeeListTitle = this.page.locator('//div[@class="header-title"]');
    this.searchEmployeeInput = this.page.getByPlaceholder('Search Employee');
    this.addEmployeeButton = this.page.getByRole('button', { name: 'Add Employee' });

    this.addEmployeePageTitle = this.page.locator('//div[@class="heading-title"]');

    // Basic Information Form
    this.firstNameInput = this.page.getByPlaceholder('Enter first Name');
    this.lastNameInput = this.page.getByPlaceholder('Enter last Name');
    this.emailInput = this.page.getByPlaceholder('Enter email address');
    this.contactNumberInput = this.page.getByPlaceholder('Enter contact number');
    this.genderDropdown = this.page.locator('//div[@id="mui-component-select-gender"]');
    this.roleDropdown = this.page.locator("//div[@id='mui-component-select-role']");
    this.passwordInput = this.page.locator("//input[@type='password']").first();
    this.confirmPasswordInput = this.page.locator("//input[@type='password']").last();

    // Address Information Form
    this.streetAddressInput = this.page.getByPlaceholder("Enter street address");
    this.cityInput = this.page.getByPlaceholder("Enter city");
    this.stateDropdown = this.page.locator("//div[@id='mui-component-select-address.state']");
    this.zipCodeInput = this.page.getByPlaceholder("Enter zip code");

    // Action Buttons
    this.cancelButton = this.page.getByText('Cancel');
    this.createButton = this.page.getByText('Create');

  }

  // Navigation Methods
  async navigateToTeamMembersPage() {
    await this.teamMembersMenu.click();
  }

  // Employee List Page Methods
  async verifyEmployeeListPage() {
    await expect(this.employeeListTitle).toBeVisible();
    await expect(this.addEmployeeButton).toBeVisible();
  }

  async navigateToEmployeePage(basePath: string) {
    await this.page.goto(`${basePath}${addEmployeePage}`);
  }

  async searchEmployee(searchTerm: string) {
    await this.searchEmployeeInput.fill(searchTerm);
  }

  async selectGender(gender: string) {
    // await this.genderDropdown.click();
    const genderOption = this.page.locator(`[role="listbox"] [role="option"]:has-text("${gender}")`).first();
    await genderOption.waitFor({ state: 'visible' });
    await genderOption.click();
    log.info(`✅ Gender selected: ${gender}`);
  }

  async selectRole(role: string) {
    await this.roleDropdown.click();
    const roleOption = this.page.locator(`[role="listbox"] [role="option"]:has-text("${role}")`).first();
    await roleOption.click();
    log.info(`✅ Role selected: ${role}`);
  }

  async selectState(state: string) {
    await this.stateDropdown.click();
    const stateOption = this.page.locator(`[role="listbox"] [role="option"]:has-text("${state}")`).first();
    await stateOption.click();
    log.info(`✅ State selected: ${state}`);
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
  }

  async verifyAddEmployeePage() {
    await expect(this.addEmployeePageTitle).toBeVisible();
  }

  async fillBasicInformation(data: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.contactNumberInput.fill(data.contactNumber);
    await this.genderDropdown.click();
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async fillAddressInformation(data: {
    streetAddress: string;
    city: string;
    zipCode: string;
  }) {
    await this.streetAddressInput.fill(data.streetAddress);
    await this.cityInput.fill(data.city);
    await this.zipCodeInput.fill(data.zipCode);
  }

  async createEmployeeBtn() {
    await this.createButton.click();
  }

  async verifyEmployeeInTable(employeeData: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    contactNumber: string;
  }) {
    const fullName = `${employeeData.firstName} ${employeeData.lastName}`;

    // Find the employee row by full name (column 1)
    const employeeRow = this.page.locator(`//tr[contains(., '${fullName}')]`);
    await expect(employeeRow).toBeVisible();

    // Verify each column data
    // Column 1: Full Name
    const nameCell = employeeRow.locator('td').nth(0);
    await expect(nameCell).toContainText(fullName);

    // Column 2: Email (check if contains the email - might be truncated)
    const emailCell = employeeRow.locator('td').nth(1);
    await expect(emailCell).toContainText(employeeData.email); // Check email

    // Column 3: Role
    const roleCell = employeeRow.locator('td').nth(2);
    await expect(roleCell).toContainText(employeeData.role);

    // Column 4: Contact Number (format: (XXX) XXX-XXXX)
    const contactCell = employeeRow.locator('td').nth(3);
    // compare the contact number with the formatted contact number
    const digits = employeeData.contactNumber.replace(/\D/g, '');
    const formattedContact = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;

    await expect(contactCell).toContainText(formattedContact);

    log.info(`✅ Employee ${fullName} verified in table with all column data`);
  }

  async waitForEmployeeEmailToAppearInTable(email: string) {
    await this.page.waitForSelector(`//tr[contains(., '${email}')]`, { 
      state: 'visible',
      timeout: 15000 // 15 second timeout
    });
  }

  async cancelEmployeeCreation() {
    await this.cancelButton.click();
  }

}