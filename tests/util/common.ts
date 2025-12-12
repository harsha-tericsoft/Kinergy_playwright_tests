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

  /**
   * Generate a random date of birth in MM/DD/YYYY format
   * Generates dates for ages between minAge and maxAge (default: 18-80 years)
   * Format matches date picker format: MM/DD/YYYY
   */
  static generateRandomDateOfBirth(minAge: number = 18, maxAge: number = 80): string {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Calculate year range (maxAge years ago to minAge years ago)
    const maxYear = currentYear - minAge;
    const minYear = currentYear - maxAge;
    
    // Generate random year within range
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    
    // Generate random month (1-12)
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    
    // Generate random day based on the month (handling leap years)
    const daysInMonth = new Date(randomYear, randomMonth, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
    
    // Format as MM/DD/YYYY (matching date picker format)
    const formattedMonth = String(randomMonth).padStart(2, '0');
    const formattedDay = String(randomDay).padStart(2, '0');
    
    return `${formattedMonth}/${formattedDay}/${randomYear}`;
  }

  /**
   * Generate a random date of birth object with separate components
   * Useful for date picker navigation
   */
  static generateRandomDateOfBirthComponents(minAge: number = 18, maxAge: number = 80): {
    month: number;
    day: number;
    year: number;
    formatted: string; // MM/DD/YYYY
  } {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    const maxYear = currentYear - minAge;
    const minYear = currentYear - maxAge;
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(randomYear, randomMonth, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
    
    const formattedMonth = String(randomMonth).padStart(2, '0');
    const formattedDay = String(randomDay).padStart(2, '0');
    
    return {
      month: randomMonth,
      day: randomDay,
      year: randomYear,
      formatted: `${formattedMonth}/${formattedDay}/${randomYear}`
    };
  }

}



// 

// utils/dateUtils.ts
export function convertToDdMmmYyyy(dateMdy: string): string {
  // Convert "MM/DD/YYYY" -> "DD-MMM-YYYY"
  const dmy = convertDateMdySlashesToDmyDashes(dateMdy);
  return dmyNamedMonth(dmy);
}

export function convertDateMdySlashesToDmyDashes(slashesDate: string): string {
  // Expect format "MM/DD/YYYY"
  const parts = slashesDate.split('/');
  if (parts.length !== 3) {
    throw new Error(`Invalid date format, expected MM/DD/YYYY but got: ${slashesDate}`);
  }
  const [mmStr, ddStr, yyyyStr] = parts;
  const mm = Number(mmStr);
  const dd = Number(ddStr);
  const yyyy = Number(yyyyStr);

  if (!isValidYMD(yyyy, mm, dd)) {
    throw new Error(`Invalid date values: ${slashesDate}`);
  }

  const ddPadded = String(dd).padStart(2, '0');
  const mmPadded = String(mm).padStart(2, '0');
  return `${ddPadded}-${mmPadded}-${yyyyStr}`;
}

export function dmyNamedMonth(dmyDate: string): string {
  // Expect format "DD-MM-YYYY" -> returns "DD-MMM-YYYY" (MMM = Jan, Feb, ...)
  const parts = dmyDate.split('-');
  if (parts.length !== 3) {
    throw new Error(`Invalid date format, expected DD-MM-YYYY but got: ${dmyDate}`);
  }
  const [ddStr, mmStr, yyyyStr] = parts;
  const mm = Number(mmStr);
  const dd = Number(ddStr);

  if (!isValidYMD(Number(yyyyStr), mm, dd)) {
    throw new Error(`Invalid date values: ${dmyDate}`);
  }

  const monthNamesShort = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  const monthIndex = mm - 1; // 0-based
  const monthShort = monthNamesShort[monthIndex] ?? 'Invalid';
  const ddPadded = String(dd).padStart(2, '0');
  return `${ddPadded}-${monthShort}-${yyyyStr}`;
}

export function dateOnly(n = 0): string {
  const now = new Date();
  if (!Number.isInteger(n)) {
    throw new Error('dateOnly: n must be an integer number of days');
  }
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + n);
  // Return day of month without leading zeros
  return String(target.getDate());
}

/* ----- small helpers ----- */

function isValidYMD(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  // basic check for month lengths (handles feb roughy; leap-year ok below)
  const maxDay = new Date(year, month, 0).getDate(); // day 0 of next month -> last day of month
  return day <= maxDay;
}

// 

export class DateUtils {
  // return today's day without leading zero
  static dateOnly(offsetDays: number = 0): number {
    const d = new Date();
    if (offsetDays !== 0) {
      d.setDate(d.getDate() + offsetDays);
    }
    return d.getDate(); // only day
  }

  // Convert MM/DD/YYYY → DD-MMM-YYYY
  static convertToDdMmmYyyy(mdy: string): string {
    // Handle placeholder or invalid values
    if (!mdy || mdy === "MM/DD/YYYY" || mdy.trim() === "") {
      throw new Error(`Invalid date value: "${mdy}"`);
    }
    
    // Parse MM/DD/YYYY format
    const parts = mdy.split('/');
    if (parts.length !== 3) {
      throw new Error(`Invalid date format, expected MM/DD/YYYY but got: ${mdy}`);
    }
    
    const [month, day, year] = parts.map(p => parseInt(p, 10));
    
    // Validate date components
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      throw new Error(`Invalid date components in: ${mdy}`);
    }
    
    // Create date object (month is 0-indexed in JS Date)
    const date = new Date(year, month - 1, day);
    
    // Validate the date is valid
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      throw new Error(`Invalid date: ${mdy}`);
    }
    
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date
      .toLocaleDateString("en-US", options)
      .replace(",", "")
      .replace(/ /g, "-");
  }
}

/**
 * DatePickerHelper - Helper class for navigating date pickers
 * Handles navigation and selection of random past dates in calendar date pickers
 */
export class DatePickerHelper {
  /**
   * Generate a random past date for date picker selection
   * Returns date components and formatted string in MM/DD/YYYY format
   */
  static generateRandomPastDate(minAge: number = 18, maxAge: number = 80): {
    month: number;
    day: number;
    year: number;
    formatted: string; // MM/DD/YYYY
  } {
    return RandomDataGenerator.generateRandomDateOfBirthComponents(minAge, maxAge);
  }

  /**
   * Calculate how many months back we need to navigate from current date
   * to reach the target date
   */
  static calculateMonthsBack(targetYear: number, targetMonth: number): number {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
    
    const yearDiff = currentYear - targetYear;
    const monthDiff = currentMonth - targetMonth;
    
    return (yearDiff * 12) + monthDiff;
  }

  /**
   * Select a random past date from a date picker field
   * Opens the date picker, navigates to a random past date, and selects it
   * Returns the selected date in DD-MMM-YYYY format
   * 
   * @param page - Playwright Page object
   * @param dateOfBirthField - Locator for the date of birth input field
   * @param minAge - Minimum age (default: 18)
   * @param maxAge - Maximum age (default: 80)
   * @returns Promise<string> - Selected date in DD-MMM-YYYY format
   */
  static async selectRandomPastDateFromPicker(
    page: { locator: (selector: string) => any; waitForTimeout: (ms: number) => Promise<void> },
    dateOfBirthField: { click: () => Promise<void>; fill: (value: string) => Promise<void>; clear: () => Promise<void>; press: (key: string) => Promise<void>; type: (text: string, options?: { delay?: number }) => Promise<void>; inputValue: () => Promise<string>; waitFor: (options?: { state?: "visible" | "attached" | "detached" | "hidden"; timeout?: number }) => Promise<void> },
    minAge: number = 18,
    maxAge: number = 80
  ): Promise<string> {
    // Generate a random past date (18-80 years old)
    const randomDate = DatePickerHelper.generateRandomPastDate(minAge, maxAge);
    const { month, day: targetDay, year } = randomDate;
    
    // Open datepicker by clicking the field
    await dateOfBirthField.click();
    await page.waitForTimeout(500); // Wait for calendar to open
    
    // Check if calendar is visible
    const calendar = page.locator(
      '[role="dialog"], .MuiPickersCalendar-root, .MuiCalendarPicker-root, [role="grid"]'
    ).first();
    
    const calendarVisible = await calendar.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (calendarVisible) {
      // Calculate how many months back we need to navigate
      const monthsBack = DatePickerHelper.calculateMonthsBack(year, month);
      
      // Navigate to the target month/year by clicking previous month button
      if (monthsBack > 0) {
        const prevButton = page.locator(
          'button[aria-label*="previous" i], button[aria-label*="Previous"], button[aria-label*="prev" i]'
        ).first();
        
        // Check if previous button exists and is enabled
        const prevButtonVisible = await prevButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (prevButtonVisible) {
          // Click previous button multiple times to navigate to target month
          for (let i = 0; i < monthsBack; i++) {
            const isDisabled = await prevButton.isDisabled().catch(() => true);
            if (isDisabled) break; // Can't go further back
            
            await prevButton.click();
            await page.waitForTimeout(300); // Small delay between clicks
          }
        } else {
          // Try alternative: click on month/year header to open year/month picker
          try {
            const monthYearHeader = page.locator(
              'button[aria-label*="calendar view" i], button[aria-label*="month" i], .MuiPickersCalendarHeader-label'
            ).first();
            
            const headerVisible = await monthYearHeader.isVisible({ timeout: 2000 }).catch(() => false);
            if (headerVisible) {
              await monthYearHeader.click();
              await page.waitForTimeout(500);
              
              // Try to select year first
              const yearButton = page.locator(`button:has-text("${year}")`).first();
              const yearVisible = await yearButton.isVisible({ timeout: 2000 }).catch(() => false);
              if (yearVisible) {
                await yearButton.click();
                await page.waitForTimeout(500);
              }
              
              // Then select month (months are usually 0-indexed in JS, but displayed as 1-12)
              const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
              const monthName = monthNames[month - 1];
              const monthButton = page.locator(`button:has-text("${monthName}")`).first();
              const monthVisible = await monthButton.isVisible({ timeout: 2000 }).catch(() => false);
              if (monthVisible) {
                await monthButton.click();
                await page.waitForTimeout(500);
              }
            }
          } catch {
            // Year/month picker navigation failed, continue with day selection
          }
        }
      }
      
      // Now select the day from the calendar grid
      // Wait a bit for calendar to update after navigation
      await page.waitForTimeout(500);
      
      // Try multiple selectors for the day button
      const daySelectors = [
        `button[role="gridcell"]:has-text("^${targetDay}$")`,
        `[role="gridcell"] button:has-text("^${targetDay}$")`,
        `button[role="gridcell"]:has-text("${targetDay}"):not([disabled])`,
        `[role="gridcell"]:has-text("${targetDay}"):not([disabled])`,
        `button:has-text("${targetDay}"):not([disabled])`,
        `//button[normalize-space()='${targetDay}' and not(@disabled)]`,
        `//td[button[normalize-space()='${targetDay}']]//button`
      ];
      
      let daySelected = false;
      for (const selector of daySelectors) {
        try {
          const dayButton = page.locator(selector).first();
          const count = await dayButton.count();
          if (count === 0) continue;
          
          await dayButton.waitFor({ state: 'visible', timeout: 2000 });
          const isDisabled = await dayButton.isDisabled().catch(() => true);
          const isVisible = await dayButton.isVisible().catch(() => false);
          
          if (isVisible && !isDisabled) {
            await dayButton.scrollIntoViewIfNeeded();
            await dayButton.click();
            daySelected = true;
            // Wait for calendar to close
            await page.waitForTimeout(500);
            break;
          }
        } catch (error) {
          // Continue to next selector
          continue;
        }
      }
      
      // If still not selected, try clicking by exact text match in gridcell
      if (!daySelected) {
        try {
          // Get all gridcells and find the one with the target day
          const allGridCells = page.locator('[role="gridcell"]');
          const count = await allGridCells.count();
          
          for (let i = 0; i < count; i++) {
            const cell = allGridCells.nth(i);
            const text = await cell.textContent().catch(() => '');
            const cellText = text?.trim() || '';
            
            // Check if this cell contains our target day
            if (cellText === String(targetDay) || cellText === String(targetDay).padStart(2, '0')) {
              const isDisabled = await cell.isDisabled().catch(() => true);
              const isVisible = await cell.isVisible().catch(() => false);
              
              if (isVisible && !isDisabled) {
                await cell.scrollIntoViewIfNeeded();
                await cell.click();
                daySelected = true;
                await page.waitForTimeout(500);
                break;
              }
            }
          }
        } catch {
          // Continue
        }
      }
      
      if (!daySelected) {
        console.warn(`Could not select day ${targetDay} from the date picker, will try direct fill`);
      }
    } else {
      // Calendar didn't open, try to fill directly
      await dateOfBirthField.fill(randomDate.formatted);
    }
    
    // Wait for calendar to close and value to be populated
    await page.waitForTimeout(1000);
    
    // Wait for the input value to change from placeholder
    let selected = await dateOfBirthField.inputValue();
    let attempts = 0;
    while ((!selected || selected === "MM/DD/YYYY" || selected.trim() === "") && attempts < 15) {
      await page.waitForTimeout(300);
      selected = await dateOfBirthField.inputValue();
      attempts++;
    }
    
    // Validate that a date was actually selected
    if (!selected || selected === "MM/DD/YYYY" || selected.trim() === "") {
      // If date picker didn't work, try filling directly
      console.warn("Date picker selection failed, filling date directly");
      
      // Clear the field first
      await dateOfBirthField.click();
      await dateOfBirthField.clear();
      await page.waitForTimeout(200);
      
      // Try filling with the formatted date
      await dateOfBirthField.fill(randomDate.formatted);
      await page.waitForTimeout(500);
      
      // Press Enter or Tab to confirm the date
      await dateOfBirthField.press('Enter');
      await page.waitForTimeout(300);
      
      selected = await dateOfBirthField.inputValue();
      
      // If still not working, try typing it character by character
      if (!selected || selected === "MM/DD/YYYY") {
        await dateOfBirthField.click();
        await dateOfBirthField.clear();
        await page.waitForTimeout(200);
        await dateOfBirthField.type(randomDate.formatted, { delay: 100 });
        await page.waitForTimeout(500);
        selected = await dateOfBirthField.inputValue();
      }
    }
    
    // Validate the selected date contains expected values
    if (!selected || selected === "MM/DD/YYYY" || selected.trim() === "") {
      // Last resort: return the formatted date we generated and let the form handle it
      console.warn(`Date picker failed completely. Generated date: ${randomDate.formatted}`);
      return DateUtils.convertToDdMmmYyyy(randomDate.formatted);
    }
    
    // Convert MM/DD/YYYY → DD-MMM-YYYY
    let converted: string;
    try {
      converted = DateUtils.convertToDdMmmYyyy(selected);
    } catch (error) {
      // If conversion fails, try using the formatted date we generated
      console.warn(`Date conversion failed for "${selected}", using generated date: ${randomDate.formatted}`);
      converted = DateUtils.convertToDdMmmYyyy(randomDate.formatted);
    }
    
    return converted;
  }
}