import { getEnvironment } from 'tests/util';
import { faker } from '@faker-js/faker';
import { RandomDataGenerator } from 'tests/util/common';

const ENV = getEnvironment();

export const testData = {
  invalidUsername: 'invaliduser@example.com',
  invalidPassword: 'invalidpassword',
  employees: {
    basicDetails: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: RandomDataGenerator.generateRandomEmail(),
      contactNumber: RandomDataGenerator.generateRandomPhoneNumber(),
      password: 'TestPassword@123',
      confirmPassword: 'TestPassword@123'
    },
    addressDetails: {
      streetAddress: faker.location.streetAddress(),
      city: faker.location.city(),
      zipCode: RandomDataGenerator.generateRandomUSZipCode()
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
  clients: {
    basicDetails: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: RandomDataGenerator.generateRandomEmail(),
      phone: RandomDataGenerator.generateRandomPhoneNumber(),
      companyName: faker.company.name(),
    },
    addressDetails: {
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      zipCode: RandomDataGenerator.generateRandomUSZipCode(),
    },
  },
};
