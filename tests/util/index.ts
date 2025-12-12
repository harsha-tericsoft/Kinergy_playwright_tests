// import { match } from "ts-pattern";

// export const getEnvironmentUserDetails = (
//   role: Roles
// ): {
//   username: string;
//   password: string;
// } => {
//   const environment = getEnvironment();
//   const formattedRole = role.replace(/-/g, "_");
//   // const usernameKey = `${environment.toUpperCase()}_${formattedRole.toUpperCase()}_USERNAME`;
//   // const passwordKey = `${environment.toUpperCase()}_${formattedRole.toUpperCase()}_PASSWORD`;

//   let username: string;
//   let password: string;

//   if (role === Roles.Admin) {
//     // username = process.env[usernameKey];
//     // password = process.env[passwordKey];
//     username = "harsha.p@tericsoft.com";
//     password = "Pass@12345";
//   } else if (role === Roles.Provider) {
//     username = "harsha.tericsoft+1@gmail.com";
//     password = "12345678";
//   } else {
//     throw new Error(`Invalid role provided: ${role}`);
//   }

//   // Handle missing credentials
//   if (!username || !password) {
//     throw new Error(`Missing credentials' for environment: ${environment}, role: ${role}. Keys looked for: ${username}, ${password}`
// );
//   }
//   return { username, password };
// };

// export enum Environment {
//   Dev = "dev",
//   Test = "test",
// }

// export enum Roles {
//   Admin = "admin",
//   Provider = "provider",
// }

// // Dynamically fetch environment from `process.env` with default fallback
// export const getEnvironment = (): Environment => {
//   const env = process.env.ENV?.toLowerCase();
//   return env === "test" ? Environment.Test : Environment.Dev;
// };

// export const getEnvironmentBasePath = (): string => {
//   const environment = getEnvironment();
//   return match(environment)
//     .with(Environment.Dev, () => "https://dev.admin.zoella.health/")
//     .with(Environment.Test, () => "https://test.admin.zoella.health/")
//     .otherwise(() => {
//       throw new Error(`Unsupported environment: ${environment}`);
//     });
// };

// export const getEnvironmentBasePathForAPI = (): string => {
//   const environment = getEnvironment();
//   switch (environment) {
//     case Environment.Dev:
//       return "https://portal.api.zoella.health/dev/admin";
//     case Environment.Test:
//       return "https://portal.api.zoella.health/test/admin";
//     default:
//       throw new Error(`Unsupported API environment: ${environment}`);
//   }
// };

// // export const addEmployeePage = '/employee/list';

import { match } from "ts-pattern";

/**
 * User roles in the system
 */
export enum Roles {
  Admin = "admin",
  Provider = "provider",
}

/**
 * Supported environments
 */
export enum Environment {
  Dev = "dev",
  Test = "test",
}

/**
 * Returns the current environment.
 * You can later change this to read from process.env.ENV if needed.
 */
export const getEnvironment = (): Environment => {
  // Hardcoded to "dev" for now — change if needed
  return Environment.Test;
};

/**
 * Returns login credentials for each role.
 * These are currently hardcoded for simplicity.
 */
export const getEnvironmentUserDetails = (
  role: Roles
): { username: string; password: string } => {
  const environment = getEnvironment();

  let username: string;
  let password: string;

  if (role === Roles.Admin) {
    username = "harsha.p@tericsoft.com";
    password = "Pass@12345";
  } else if (role === Roles.Provider) {
    username = "harsha.tericsoft+1@gmail.com";
    password = "12345678";
  } else {
    throw new Error(`Invalid role provided: ${role}`);
  }

  // Safety check
  if (!username || !password) {
    throw new Error(
      `Missing credentials for environment: ${environment}, role: ${role}`
    );
  }

  return { username, password };
};

/**
 * Returns the base path (frontend URL) based on environment.
 */
export const getEnvironmentBasePath = (): string => {
  const environment = getEnvironment();

  return match(environment)
    .with(Environment.Dev, () => "https://dev.admin.zoella.health")
    .with(Environment.Test, () => "https://test.admin.zoella.health")
    .otherwise(() => {
      throw new Error(`Unsupported environment: ${environment}`);
    });
};

/**
 * Returns the base API URL based on environment.
 */
export const getEnvironmentBasePathForAPI = (): string => {
  const environment = getEnvironment();

  switch (environment) {
    case Environment.Dev:
      return "https://portal.api.zoella.health/dev/admin";
    case Environment.Test:
      return "https://portal.api.zoella.health/test/admin";
    default:
      throw new Error(`Unsupported API environment: ${environment}`);
  }
};