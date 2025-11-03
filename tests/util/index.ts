import { match } from "ts-pattern";

export const getEnvironmentUserDetails = (
  role: Roles
): {
  username: string;
  password: string;
} => {
  const environment = getEnvironment();
  const formattedRole = role.replace(/-/g, "_");
  const usernameKey = `${environment.toUpperCase()}_${formattedRole.toUpperCase()}_USERNAME`;
  const passwordKey = `${environment.toUpperCase()}_${formattedRole.toUpperCase()}_PASSWORD`;

  let username: string;
  let password: string;

  if (role === Roles.AMF) {
    username = process.env[usernameKey];
    password = process.env[passwordKey];
  } else if (role === Roles.AMS) {
    username = process.env[usernameKey];
    password = process.env[passwordKey];
  } else if (role === Roles.SuperAdmin) {
    username = process.env[usernameKey];
    password = process.env[passwordKey];
  } else {
    throw new Error(`Invalid role provided: ${role}`);
  }

  // Handle missing credentials
  if (!username || !password) {
    throw new Error(
      `Missing credentials for environment: ${environment}, role: ${role}. Keys looked for: ${usernameKey}, ${passwordKey}`
    );
  }

  return { username, password };
};

export enum Environment {
  Dev = "dev",
  Test = "test",
}

export enum Roles {
  AMF = "amf",
  AMS = "ams",
  SuperAdmin = "super-admin",
}

// Dynamically fetch environment from `process.env` with default fallback
export const getEnvironment = (): Environment => {
  const env = process.env.ENV?.toLowerCase();
  return env === "test" ? Environment.Test : Environment.Dev;
};

export const getEnvironmentBasePath = (): string => {
  const environment = getEnvironment();
  return match(environment)
    .with(Environment.Dev, () => "https://admin.dev.vitawerks.com")
    .with(Environment.Test, () => "https://admin.test.vitawerks.com")
    .otherwise(() => {
      throw new Error(`Unsupported environment: ${environment}`);
    });
};

export const getEnvironmentBasePathForAPI = (): string => {
  const environment = getEnvironment();
  switch (environment) {
    case Environment.Dev:
      return "https://dev.api.vitawerks.com";
    case Environment.Test:
      return "https://test.api.vitawerks.com";
    default:
      throw new Error(`Unsupported API environment: ${environment}`);
  }
};

export const addEmployeePage = '/employee/list';
