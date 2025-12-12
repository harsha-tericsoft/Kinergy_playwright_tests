"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiContext = createApiContext;
const test_1 = require("@playwright/test");
const token_1 = require("./token");
const index_1 = require("./index");
async function createApiContext() {
    const token = await (0, token_1.getValidToken)();
    return test_1.request.newContext({
        baseURL: (0, index_1.getEnvironmentBasePathForAPI)(),
        extraHTTPHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
}
//# sourceMappingURL=apiClient.js.map