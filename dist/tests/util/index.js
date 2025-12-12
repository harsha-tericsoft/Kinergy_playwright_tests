"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentBasePathForAPI = exports.getEnvironmentBasePath = exports.getEnvironmentUserDetails = exports.getEnvironment = exports.Environment = exports.Roles = void 0;
const ts_pattern_1 = require("ts-pattern");
var Roles;
(function (Roles) {
    Roles["Admin"] = "admin";
    Roles["Provider"] = "provider";
})(Roles || (exports.Roles = Roles = {}));
var Environment;
(function (Environment) {
    Environment["Dev"] = "dev";
    Environment["Test"] = "test";
})(Environment || (exports.Environment = Environment = {}));
const getEnvironment = () => {
    return Environment.Test;
};
exports.getEnvironment = getEnvironment;
const getEnvironmentUserDetails = (role) => {
    const environment = (0, exports.getEnvironment)();
    let username;
    let password;
    if (role === Roles.Admin) {
        username = "harsha.p@tericsoft.com";
        password = "Pass@12345";
    }
    else if (role === Roles.Provider) {
        username = "harsha.tericsoft+1@gmail.com";
        password = "12345678";
    }
    else {
        throw new Error(`Invalid role provided: ${role}`);
    }
    if (!username || !password) {
        throw new Error(`Missing credentials for environment: ${environment}, role: ${role}`);
    }
    return { username, password };
};
exports.getEnvironmentUserDetails = getEnvironmentUserDetails;
const getEnvironmentBasePath = () => {
    const environment = (0, exports.getEnvironment)();
    return (0, ts_pattern_1.match)(environment)
        .with(Environment.Dev, () => "https://dev.admin.zoella.health")
        .with(Environment.Test, () => "https://test.admin.zoella.health")
        .otherwise(() => {
        throw new Error(`Unsupported environment: ${environment}`);
    });
};
exports.getEnvironmentBasePath = getEnvironmentBasePath;
const getEnvironmentBasePathForAPI = () => {
    const environment = (0, exports.getEnvironment)();
    switch (environment) {
        case Environment.Dev:
            return "https://portal.api.zoella.health/dev/admin";
        case Environment.Test:
            return "https://portal.api.zoella.health/test/admin";
        default:
            throw new Error(`Unsupported API environment: ${environment}`);
    }
};
exports.getEnvironmentBasePathForAPI = getEnvironmentBasePathForAPI;
//# sourceMappingURL=index.js.map