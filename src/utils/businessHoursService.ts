/**
 * Service for managing business hours
 */
export type BusinessHours = {
  day: string;
  hours: string;
};

export default class BusinessHoursService {
  private businessHours: BusinessHours[] = [
    { day: 'Monday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Saturday', hours: 'Closed' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  // Enhanced caching system
  private holidayCache: Map<string, boolean> = new Map();
  private messageCache: { message: string; timestamp: number } = {
    message: '',
    timestamp: 0,
  };

  // Cache holiday dates for the current year
  private cachedHolidays: { year: number; dates: Set<string> } = {
    year: 0,
    dates: new Set(),
  };

  constructor() {
    // Initialize the holiday cache for the current year
    this.cacheHolidaysForYear(new Date().getFullYear());
  }

  /**
   * Cache all holidays for a specific year to avoid recalculating
   */
  private cacheHolidaysForYear(year: number): void {
    if (this.cachedHolidays.year === year) return; // Already cached

    const holidays = new Set<string>();

    // Add all holiday dates to the cache
    [
      new Date(year, 0, 1), // New Year's Day (Jan 1)
      this.getMLKDay(year), // Martin Luther King Jr. Day
      this.getPresidentsDay(year), // Presidents' Day
      this.getMemorialDay(year), // Memorial Day
      new Date(year, 5, 19), // Juneteenth National Independence Day
      new Date(year, 6, 4), // Independence Day
      this.getLaborDay(year), // Labor Day
      this.getColumbusDay(year), // Columbus Day
      new Date(year, 10, 11), // Veterans Day
      this.getThanksgivingDay(year), // Thanksgiving
      new Date(year, 11, 24), // Christmas Eve
      new Date(year, 11, 25), // Christmas Day
    ].forEach((date) => {
      holidays.add(date.toDateString());
    });

    // Update the cache
    this.cachedHolidays = { year, dates: holidays };
  }

  getBusinessHours(): BusinessHours[] {
    return this.businessHours;
  }

  /**
   * Returns a status message based on current time and business hours
   * Uses caching for better performance
   */
  getHoursMessage(): string {
    // Check if we have a cached message that's less than 1 minute old
    const now = Date.now();
    if (
      this.messageCache.message &&
      now - this.messageCache.timestamp < 60000
    ) {
      return this.messageCache.message;
    }

    const date = new Date();
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Make sure holidays for the current year are cached
    const currentYear = date.getFullYear();
    if (this.cachedHolidays.year !== currentYear) {
      this.cacheHolidaysForYear(currentYear);
    }

    // Check if today is a holiday - use the cached holidays for fast lookup
    if (this.isHoliday(date)) {
      const message = 'Closed for Holiday - Opens tomorrow at 8AM';
      this.messageCache = { message, timestamp: now };
      return message;
    }

    // Optimized day checks - using fewer calculations
    let message: string;

    switch (day) {
      case 0: // Sunday
        message = 'Closed - Opens Monday at 8AM';
        break;

      case 6: // Saturday
        message = 'Closed - Opens Monday at 8AM';
        break;

      default: {
        // Weekdays (Monday to Friday)
        // Check if we're about to close (within 15 minutes of closing)
        const closingHour = 17; // 5PM every weekday

        if (hours === closingHour - 1 && minutes >= 45) {
          message = `Closing soon at ${closingHour - 12}PM`;
        } else if (hours >= 8 && hours < closingHour) {
          message = `Open today until ${closingHour - 12}PM`;
        } else if (hours < 8) {
          message = 'Opening today at 8AM';
        } else {
          if (day === 5) {
            // Friday
            message = 'Closed - Opens Monday at 8AM';
          } else {
            message = 'Closed - Opens tomorrow at 8AM';
          }
        }
        break;
      }
    }

    // Update cache
    this.messageCache = { message, timestamp: now };
    return message;
  }

  /**
   * Checks if a specific date is a holiday - with efficient caching
   */
  private isHoliday(date: Date): boolean {
    const dateString = date.toDateString();

    // Check cache first
    if (this.holidayCache.has(dateString)) {
      return this.holidayCache.get(dateString) || false;
    }

    // Check against cached holiday dates for the year
    const isHoliday = this.cachedHolidays.dates.has(dateString);

    // Update the instance cache
    this.holidayCache.set(dateString, isHoliday);

    return isHoliday;
  }

  // Helper function to calculate Martin Luther King Jr. Day (3rd Monday in January)
  private getMLKDay(year: number): Date {
    return this.getNthDayOfMonth(year, 0, 1, 3); // 3rd Monday in January
  }

  // Helper function to calculate Presidents' Day (3rd Monday in February)
  private getPresidentsDay(year: number): Date {
    return this.getNthDayOfMonth(year, 1, 1, 3); // 3rd Monday in February
  }

  // Helper function to calculate Memorial Day (last Monday in May)
  private getMemorialDay(year: number): Date {
    const lastDayOfMay = new Date(year, 5, 0).getDate();
    const date = new Date(year, 4, lastDayOfMay);

    // Go backwards to find the last Monday
    while (date.getDay() !== 1) {
      date.setDate(date.getDate() - 1);
    }

    return date;
  }

  // Helper function to calculate Labor Day (1st Monday in September)
  private getLaborDay(year: number): Date {
    return this.getNthDayOfMonth(year, 8, 1, 1); // 1st Monday in September
  }

  // Helper function to calculate Columbus Day (2nd Monday in October)
  private getColumbusDay(year: number): Date {
    return this.getNthDayOfMonth(year, 9, 1, 2); // 2nd Monday in October
  }

  // Helper function to calculate Thanksgiving Day (4th Thursday in November)
  private getThanksgivingDay(year: number): Date {
    return this.getNthDayOfMonth(year, 10, 4, 4); // 4th Thursday in November
  }

  /**
   * Gets the nth occurrence of a specific day in a month
   * @param year - The year
   * @param month - The month (0-11)
   * @param dayOfWeek - The day of week (0-6, 0 = Sunday)
   * @param n - The occurrence (1st, 2nd, 3rd, etc.)
   * @returns The date object
   */
  private getNthDayOfMonth(
    year: number,
    month: number,
    dayOfWeek: number,
    n: number
  ): Date {
    // Start with the first day of the month
    const date = new Date(year, month, 1);

    // Find the first occurrence of the specified day
    const firstDayOfWeek = date.getDay();
    const daysUntilFirst = (dayOfWeek - firstDayOfWeek + 7) % 7;
    date.setDate(1 + daysUntilFirst);

    // Add weeks to get to the nth occurrence
    date.setDate(date.getDate() + (n - 1) * 7);

    return date;
  }

  /**
   * Get current business status as an object with status and message
   */
  getCurrentStatus(): { isOpen: boolean; message: string } {
    const message = this.getHoursMessage();
    const isOpen = message.startsWith('Open');

    return {
      isOpen,
      message,
    };
  }

  /**
   * Get formatted business hours for display
   */
  getFormattedBusinessHours(): BusinessHours[] {
    return this.businessHours;
  }
}

// Export a singleton instance
export const businessHoursService = new BusinessHoursService();
