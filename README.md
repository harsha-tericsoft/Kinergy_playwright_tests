# FlexOS Playwright Tests

A comprehensive end-to-end testing suite for the FlexOS application using Playwright.

## 🚀 Features

- **Multi-environment support** (Dev, Test)
- **Multi-role testing** (AMF, AMS, SuperAdmin)
- **API and E2E testing**
- **Authentication state management**
- **Comprehensive test reporting**
- **Page Object Model pattern**

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Vitawerks/flexos_playwright_tests.git
   cd flexos_playwright_tests
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   Create a `.env` file in the project root with your credentials:
   ```env
   # Environment Configuration
   ENV=dev

   # Sample Development Environment Credentials
   DEV_SUPER_ADMIN_USERNAME=your_email@example.com
   DEV_SUPER_ADMIN_PASSWORD=your_password

   # Sample Test Environment Credentials
   TEST_SUPER_ADMIN_USERNAME=your_test_email@example.com
   TEST_SUPER_ADMIN_PASSWORD=your_test_password
   ```

## 🏗️ Project Structure

```
flexos_playwright_tests/
├── tests/
│   ├── e2e/                    # End-to-end tests
│   │   └── login/
│   ├── regression/             # Regression tests
│   ├── api/                    # API tests
│   ├── util/                   # Utility functions
│   ├── data/                   # Test data
│   └── global.setup.ts         # Global setup
├── page-objects/               # Page Object Models
├── playwright.config.ts         # Playwright configuration
├── requirements.ts              # Project requirements
└── .env                        # Environment variables
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test projects
```bash
# Run only E2E tests
npx playwright test --project="e2e login"

# Run only API tests
npx playwright test --project="api tests"

# Run only regression tests
npx playwright test --project="regression super admin"
```

### Run tests in specific environment
```bash
# Set environment variable
set ENV=test  # Windows
export ENV=test  # Linux/Mac

# Run tests
npx playwright test
```

### Run tests with UI
```bash
npx playwright test --ui
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

## 📊 Test Reports

### View HTML report
```bash
npx playwright show-report
```

### Generate blob report
```bash
npx playwright test --reporter=blob
```

## 🔧 Configuration

### Environment URLs

| Environment | Web URL | API URL |
|-------------|---------|---------|
| Dev | https://flexosdev.varshealth.com | https://flexosapi.dev.vitawerks.com |
| Test | https://flexos.test.varshealth.com | https://flexostest.api.vitawerks.com |

### User Roles

- **AMF** - AMF user role
- **AMS** - AMS user role  
- **SuperAdmin** - Super Admin role

## 📝 Test Projects

| Project | Description | Test Pattern |
|---------|-------------|--------------|
| setup | Global authentication setup | `global.setup.ts` |
| api tests | API endpoint tests | `tests/api/**/*.spec.ts` |
| regression AMF | AMF regression tests | `tests/regression/amf*/*.loggedin.spec.ts` |
| regression AMS | AMS regression tests | `tests/regression/ams*/*.loggedin.spec.ts` |
| regression super admin | Super Admin regression tests | `tests/regression/superAdmin*/**/*.loggedin.spec.ts` |
| e2e AMF | AMF E2E tests | `tests/e2e/amf*/*.loggedin.spec.ts` |
| e2e AMS | AMS E2E tests | `tests/e2e/ams*/*.loggedin.spec.ts` |
| e2e super admin | Super Admin E2E tests | `tests/e2e/superAdmin*/**/*.loggedin.spec.ts` |
| e2e login | Login-specific tests | `tests/e2e/login/*.loggedin.spec.ts` |

## 🔐 Authentication

The project uses Playwright's authentication state management:

1. **Global Setup** - Logs in users and stores authentication state
2. **Storage States** - Stored in `playwright/.auth/` directory

### Authentication Flow

1. Run global setup to create authentication states
2. Tests use stored authentication states

## 📁 Key Files

- `playwright.config.ts` - Main configuration
- `tests/global.setup.ts` - Authentication setup
- `tests/util/index.ts` - Environment utilities
- `page-objects/LoginPage.ts` - Login page object
- `requirements.ts` - Project requirements

## 🐛 Debugging

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Show test traces
```bash
npx playwright show-trace
```

### Generate test traces
```bash
npx playwright test --trace on
```

## 📦 Dependencies

### Core Dependencies
- `@playwright/test` - Testing framework
- `dotenv` - Environment variable management
- `ts-pattern` - Pattern matching for environment handling
- `pino` - Logging
- `pino-pretty` - Pretty logging output

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

