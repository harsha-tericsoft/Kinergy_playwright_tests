"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomDataGenerator = void 0;
const epochNow = Date.now().toString();
class RandomDataGenerator {
    static generateRandomString(length) {
        if (length < 1)
            throw new Error("Length must be at least 1");
        const characters = "abcdefghijklmnopqrstuvwxyz";
        const charactersLength = characters.length;
        return ("a" +
            Array.from({ length: length - 1 }, () => characters.charAt(Math.floor(Math.random() * charactersLength))).join(""));
    }
    static generateRandomEmail() {
        const domain = "@tericsofttest.com";
        return this.generateRandomString(10) + epochNow + domain;
    }
    static generateRandomPhoneNumber() {
        const digits = "0123456789";
        let result = "1";
        for (let i = 0; i < 9; i++) {
            result += digits.charAt(Math.floor(Math.random() * digits.length));
        }
        return result;
    }
    static generateRandomUSZipCode() {
        const firstDigit = Math.floor(Math.random() * 9) + 1;
        let remainingDigits = "";
        for (let i = 0; i < 4; i++) {
            remainingDigits += Math.floor(Math.random() * 10);
        }
        return firstDigit + remainingDigits;
    }
}
exports.RandomDataGenerator = RandomDataGenerator;
//# sourceMappingURL=common.js.map