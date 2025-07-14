/**
 * Tests for the lokalify.ts module
 * 
 * This file contains tests for the date and time formatting functions in lokalify.ts.
 */

// Import only the formatting functions we need to test
import { 
  formatDate, 
  formatTime, 
  formatDateTime, 
  ExtendedDateTimeFormatOptions
} from '../src/utils/localize/lokalify';

// Helper function to create a fixed date for testing
function createTestDate(): Date {
  // Create a fixed date: January 15, 2023, 14:30:45
  return new Date(2023, 0, 15, 14, 30, 45);
}

// Test formatDate function
describe('formatDate function', () => {
  // Test with different locales
  describe('with different locales', () => {
    const date = createTestDate();
    const options: ExtendedDateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };

    test('should format date correctly in English', () => {
      const enResult = formatDate(date, 'en', options);
      expect(enResult).toContain('Sunday');
      expect(enResult).toContain('January');
      expect(enResult).toContain('15');
      expect(enResult).toContain('2023');
    });

    test('should format date correctly in Czech', () => {
      const csResult = formatDate(date, 'cs', options);
      expect(csResult).toContain('neděle');
      // In Czech, the month name can be in the genitive case (ledna instead of leden)
      expect(csResult.includes('leden') || csResult.includes('ledna')).toBeTruthy();
      expect(csResult).toContain('15');
      expect(csResult).toContain('2023');
    });
  });

  // Test with different format options
  describe('with different format options', () => {
    const date = createTestDate();

    test('should format with only weekday', () => {
      const weekdayResult = formatDate(date, 'en', { weekday: 'short' });
      expect(weekdayResult).toContain('Sun');
    });

    test('should format with only month and day', () => {
      const monthDayResult = formatDate(date, 'en', { month: 'short', day: 'numeric' });
      expect(monthDayResult).toContain('Jan');
      expect(monthDayResult).toContain('15');
    });

    test('should format with 2-digit day', () => {
      const dayTwoDigitResult = formatDate(date, 'en', { day: '2-digit' });
      expect(dayTwoDigitResult).toContain('15');
    });
  });

  // Test hidden options
  describe('with hidden options', () => {
    const date = createTestDate();

    test('should hide weekday when specified', () => {
      const weekdayHiddenResult = formatDate(date, 'en', { 
        weekday: 'hidden', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      expect(weekdayHiddenResult).not.toContain('Sunday');
    });

    test('should return empty string when all components are hidden', () => {
      const allHiddenResult = formatDate(date, 'en', { 
        weekday: 'hidden', 
        year: 'hidden', 
        month: 'hidden', 
        day: 'hidden' 
      });
      expect(allHiddenResult).toBe('');
    });
  });

  // Test special handling for month: 'short'
  describe('with month: short', () => {
    const date = createTestDate();

    test('should format month as short name with 2-digit day', () => {
      const monthShortResult = formatDate(date, 'en', { 
        month: 'short', 
        day: '2-digit' 
      });
      expect(monthShortResult).toContain('Jan');
      expect(monthShortResult).toContain('15');
    });
  });
});

// Test formatTime function
describe('formatTime function', () => {
  // Test with different locales
  describe('with different locales', () => {
    const date = createTestDate();
    const options: ExtendedDateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false
    };

    test('should format time correctly in English', () => {
      const enResult = formatTime(date, 'en', options);
      expect(enResult).toContain('14');
      expect(enResult).toContain('30');
      expect(enResult).toContain('45');
    });

    test('should format time correctly in Czech', () => {
      const csResult = formatTime(date, 'cs', options);
      expect(csResult).toContain('14');
      expect(csResult).toContain('30');
      expect(csResult).toContain('45');
    });
  });

  // Test with different format options
  describe('with different format options', () => {
    const date = createTestDate();

    test('should format with hour12: true', () => {
      const hour12Result = formatTime(date, 'en', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
      });
      expect(hour12Result).toContain('2');
      expect(hour12Result).toContain('30');
      expect(hour12Result.toLowerCase()).toContain('pm');
    });

    test('should format with hour12: false', () => {
      const hour24Result = formatTime(date, 'en', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: false 
      });
      expect(hour24Result).toContain('14');
      expect(hour24Result).toContain('30');
    });

    test('should format with seconds', () => {
      const withSecondsResult = formatTime(date, 'en', { 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: false 
      });
      expect(withSecondsResult).toContain('14');
      expect(withSecondsResult).toContain('30');
      expect(withSecondsResult).toContain('45');
    });
  });

  // Test hidden options
  describe('with hidden options', () => {
    const date = createTestDate();

    test('should hide seconds when specified', () => {
      const secondsHiddenResult = formatTime(date, 'en', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: 'hidden', 
        hour12: false 
      });
      expect(secondsHiddenResult).not.toContain('45');
    });

    test('should return empty string when all components are undefined or hidden', () => {
      const allHiddenResult = formatTime(date, 'en', { 
        hour: undefined, 
        minute: undefined, 
        second: 'hidden' 
      });
      expect(allHiddenResult).toBe('');
    });
  });
});

// Test formatDateTime function
describe('formatDateTime function', () => {
  // Test with different combinations of date and time
  describe('with different combinations', () => {
    const date = createTestDate();

    test('should format full date and time', () => {
      const fullResult = formatDateTime(date, 'en', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
      expect(fullResult).toContain('Sunday');
      expect(fullResult).toContain('January');
      expect(fullResult).toContain('15');
      expect(fullResult).toContain('2023');
      expect(fullResult).toContain('14');
      expect(fullResult).toContain('30');
    });

    test('should format with some components hidden', () => {
      const partialResult = formatDateTime(date, 'en', { 
        weekday: 'hidden', 
        year: 'hidden',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: 'hidden',
        hour12: false 
      });
      expect(partialResult).not.toContain('Sunday');
      expect(partialResult).not.toContain('2023');
      expect(partialResult).toContain('January');
      expect(partialResult).toContain('15');
      expect(partialResult).toContain('14');
      expect(partialResult).toContain('30');
      expect(partialResult).not.toContain('45');
    });

    test('should return empty string when all components are undefined or hidden', () => {
      const allHiddenResult = formatDateTime(date, 'en', { 
        weekday: 'hidden', 
        year: 'hidden', 
        month: 'hidden', 
        day: 'hidden',
        hour: undefined, 
        minute: undefined, 
        second: 'hidden' 
      });
      expect(allHiddenResult).toBe('');
    });
  });
});
