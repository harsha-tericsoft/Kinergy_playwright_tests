export declare enum Roles {
    Admin = "admin",
    Provider = "provider"
}
export declare enum Environment {
    Dev = "dev",
    Test = "test"
}
export declare const getEnvironment: () => Environment;
export declare const getEnvironmentUserDetails: (role: Roles) => {
    username: string;
    password: string;
};
export declare const getEnvironmentBasePath: () => string;
export declare const getEnvironmentBasePathForAPI: () => string;
