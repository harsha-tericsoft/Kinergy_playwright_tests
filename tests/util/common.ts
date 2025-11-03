const epochNow = Date.now().toString();
export class RandomDataGenerator {

  static generateRandomString(length: number): string {
    if (length < 1) throw new Error("Length must be at least 1");

    const characters = "abcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;

    // Ensure the first character is "a" and generate the rest randomly
    return (
      "a" +
      Array.from({ length: length - 1 }, () =>
        characters.charAt(Math.floor(Math.random() * charactersLength))
      ).join("")
    );
  }

  static generateRandomEmail(): string {
    const domain = "@tericsofttest.com";
    return this.generateRandomString(10) + epochNow + domain;
  }

  static generateRandomPhoneNumber(): string {
    const digits = "0123456789";
    let result = "1"; // Always start with 1
    for (let i = 0; i < 9; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
  }

  static generateRandomUSZipCode(): string {
    // Generate first digit (1-9, not 0)
    const firstDigit = Math.floor(Math.random() * 9) + 1;

    // Generate remaining 4 digits (0-9)
    let remainingDigits = "";
    for (let i = 0; i < 4; i++) {
      remainingDigits += Math.floor(Math.random() * 10);
    }

    return firstDigit + remainingDigits;
  }

}
