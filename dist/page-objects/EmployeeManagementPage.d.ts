import { Page } from "@playwright/test";
export declare class EmployeePage {
    private readonly page;
    private readonly teamMembersMenu;
    private readonly employeeListTitle;
    private readonly searchEmployeeInput;
    private readonly addEmployeeButton;
    private readonly addEmployeePageTitle;
    private readonly firstNameInput;
    private readonly lastNameInput;
    private readonly emailInput;
    private readonly contactNumberInput;
    private readonly genderDropdown;
    private readonly roleDropdown;
    private readonly passwordInput;
    private readonly confirmPasswordInput;
    private readonly streetAddressInput;
    private readonly cityInput;
    private readonly stateDropdown;
    private readonly zipCodeInput;
    private readonly cancelButton;
    private readonly createButton;
    constructor(page: Page);
    navigateToTeamMembersPage(): Promise<void>;
    verifyEmployeeListPage(): Promise<void>;
    navigateToEmployeePage(basePath: string): Promise<void>;
    searchEmployee(searchTerm: string): Promise<void>;
    selectGender(gender: string): Promise<void>;
    selectRole(role: string): Promise<void>;
    selectState(state: string): Promise<void>;
    clickAddEmployee(): Promise<void>;
    verifyAddEmployeePage(): Promise<void>;
    fillBasicInformation(data: {
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        password: string;
        confirmPassword: string;
    }): Promise<void>;
    fillAddressInformation(data: {
        streetAddress: string;
        city: string;
        zipCode: string;
    }): Promise<void>;
    createEmployeeBtn(): Promise<void>;
    verifyEmployeeInTable(employeeData: {
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        contactNumber: string;
    }): Promise<void>;
    waitForEmployeeEmailToAppearInTable(email: string): Promise<void>;
    cancelEmployeeCreation(): Promise<void>;
}
