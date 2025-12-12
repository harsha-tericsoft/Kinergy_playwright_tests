"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testData = void 0;
const util_1 = require("tests/util");
const faker_1 = require("@faker-js/faker");
const common_1 = require("tests/util/common");
const ENV = (0, util_1.getEnvironment)();
exports.testData = {
    invalidUsername: 'invaliduser@example.com',
    invalidPassword: 'invalidpassword',
    employees: {
        basicDetails: {
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: common_1.RandomDataGenerator.generateRandomEmail(),
            contactNumber: common_1.RandomDataGenerator.generateRandomPhoneNumber(),
            password: 'TestPassword@123',
            confirmPassword: 'TestPassword@123'
        },
        addressDetails: {
            streetAddress: faker_1.faker.location.streetAddress(),
            city: faker_1.faker.location.city(),
            zipCode: common_1.RandomDataGenerator.generateRandomUSZipCode()
        }
    },
    getRandomGender: () => {
        const genders = ['Male', 'Female', 'Other'];
        return genders[Math.floor(Math.random() * genders.length)];
    },
    getRandomRole: () => {
        const roles = [
            'Account Manager - Facilities',
            'Account Manager - Staff',
            'Human Resource',
            'Operations Manager',
            'Finance',
            'Admin',
            'Recruiter'
        ];
        return roles[Math.floor(Math.random() * roles.length)];
    },
    getRandomState: () => {
        const states = [
            'Alabama',
            'Alaska',
            'Arkansas',
            'California',
            'Arizona',
            'Colorado',
            'New York',
            'New Mexico',
            'Texas',
            'Florida',
            'Georgia',
            'Illinois',
            'Indiana',
            'Iowa',
            'Kansas',
            'Kentucky',
            'Louisiana',
            'Maine',
            'Maryland',
            'Massachusetts',
        ];
        return states[Math.floor(Math.random() * states.length)];
    },
};
//# sourceMappingURL=testData.js.map