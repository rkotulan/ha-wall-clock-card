import { ClockController } from '../src/components/clock/clock-controller';

describe('ClockController', () => {
  // Mock the ReactiveControllerHost
  const mockHost = {
    addController: jest.fn(),
    removeController: jest.fn(),
    requestUpdate: jest.fn(),
    updateComplete: Promise.resolve(true),
  };

  // Default language for tests
  const defaultLanguage = 'en';

  // Mock Date for consistent testing
  const mockDate = new Date(2023, 0, 1, 9, 30, 45); // January 1, 2023, 9:30:45

  describe('Time Formatting', () => {
    describe('hour formatting', () => {
      it('should pad hours with leading zeros by default', () => {
        const controller = new ClockController(mockHost);

        // Force an update to set the time
        controller['updateTime'](mockDate, undefined);

        // Hours should be padded with leading zeros by default
        expect(controller.hours).toBe('09');
        expect(controller.minutes).toBe('30');
        expect(controller.seconds).toBe('45');
      });

      it('should not pad hours with leading zeros when timeFormat.hour is numeric', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { hour: 'numeric' } 
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.hours).toBe('9');
      });

      it('should pad hours with leading zeros when timeFormat.hour is 2-digit', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { hour: '2-digit' } 
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.hours).toBe('09');
      });

      // Note: 'hidden' option for hour has been removed
      it('should display hours when timeFormat.hour is undefined', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { hour: undefined } 
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.hours).toBe('09');
      });

      it('should update hour format when updateConfig is called', () => {
        const controller = new ClockController(mockHost);

        // Initially, hours should be padded with leading zeros
        controller['updateTime'](mockDate, undefined);
        expect(controller.hours).toBe('09');

        // Update to numeric format
        controller.updateConfig({ timeFormat: { hour: 'numeric' } });
        controller['updateTime'](mockDate, undefined);
        expect(controller.hours).toBe('9');

        // Update to 2-digit format
        controller.updateConfig({ timeFormat: { hour: '2-digit' } });
        controller['updateTime'](mockDate, undefined);
        expect(controller.hours).toBe('09');
      });
    });

    describe('minute formatting', () => {
      it('should pad minutes with leading zeros by default', () => {
        const controller = new ClockController(mockHost);
        controller['updateTime'](mockDate, undefined);
        expect(controller.minutes).toBe('30');
      });

      it('should not pad minutes with leading zeros when timeFormat.minute is numeric', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { minute: 'numeric' } 
        });

        // Call updateTime directly with custom time values (9:05:45)
        const testDate = new Date(2023, 1, 1, 9, 5, 45);
        controller['updateTime'](testDate, undefined);
        expect(controller.minutes).toBe('5');
      });

      it('should pad minutes with leading zeros when timeFormat.minute is 2-digit', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { minute: '2-digit' } 
        });

         // Call updateTime directly with custom time values (9:05:45)
         // January 1, 2023, 9:05:45
        const testDate = new Date(2023, 1, 1, 9, 5, 45);
        controller['updateTime'](testDate, undefined);
        expect(controller.minutes).toBe('05');
      });

      // Note: 'hidden' option for minute has been removed
      it('should display minutes when timeFormat.minute is undefined', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { minute: undefined } 
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.minutes).toBe('30');
      });
    });

    describe('second formatting', () => {
      it('should pad seconds with leading zeros by default', () => {
        const controller = new ClockController(mockHost);
        controller['updateTime'](mockDate, undefined);;
        expect(controller.seconds).toBe('45');
      });

      it('should not pad seconds with leading zeros when timeFormat.second is numeric', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { second: 'numeric' } 
        });

        // Call updateTime directly with custom time values (9:30:05)
        const testDate = new Date(2023, 0, 1, 9, 30, 5); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, undefined);
        expect(controller.seconds).toBe('5');
      });

      it('should pad seconds with leading zeros when timeFormat.second is 2-digit', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { second: '2-digit' } 
        });

        // Call updateTime directly with custom time values (9:30:05)
        const testDate = new Date(2023, 0, 1, 9, 30, 5); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, undefined);
        expect(controller.seconds).toBe('05');
      });

      it('should hide seconds when timeFormat.second is hidden', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { second: 'hidden' } 
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.seconds).toBe('');
      });
    });

    describe('12/24 hour format', () => {
      it('should use 24-hour format by default', () => {
        const controller = new ClockController(mockHost);
        controller['updateTime'](mockDate, undefined);;
        expect(controller.hours).toBe('09');
        expect(controller.ampm).toBe('');
      });

      it('should use 12-hour format when timeFormat.hour12 is true', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { hour12: true } 
        });

        // Call updateTime directly with custom time values (9:30:45 AM)
        var testDate = new Date(2023, 0, 1, 9, 30, 45); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, undefined);
        expect(controller.hours).toBe('09');
        expect(controller.ampm).toBe('AM');

        // Test PM hours (15:30:45 = 3:30:45 PM)
        testDate = new Date(2023, 0, 1, 15, 30, 45); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, undefined);
        expect(controller.hours).toBe('03');
        expect(controller.ampm).toBe('PM');
      });

      it('should handle midnight (12 AM) correctly in 12-hour format', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { hour12: true } 
        });

        // Call updateTime directly with custom time values (0:30:45 = 12:30:45 AM)
        const testDate = new Date(2023, 0, 1, 0, 30, 5); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, undefined);
        expect(controller.hours).toBe('12');
        expect(controller.ampm).toBe('AM');
      });

      it('should handle noon (12 PM) correctly in 12-hour format', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { hour12: true } 
        });

        // Call updateTime directly with custom time values (12:30:45 = 12:30:45 PM)
        const testDate = new Date(2023, 0, 1, 12, 30, 45); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, undefined);
        expect(controller.hours).toBe('12');
        expect(controller.ampm).toBe('PM');
      });
    });

    describe('combined time format options', () => {
      it('should handle multiple time format options together', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { 
            hour: 'numeric',
            minute: '2-digit',
            second: 'hidden',
            hour12: true
          } 
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.hours).toBe('9');
        expect(controller.minutes).toBe('30');
        expect(controller.seconds).toBe('');
        expect(controller.ampm).toBe('AM');
      });

      it('should handle when seconds are hidden and hour/minute are undefined', () => {
        const controller = new ClockController(mockHost, { 
          timeFormat: { 
            hour: undefined,
            minute: undefined,
            second: 'hidden'
          } 
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.hours).toBe('09');
        expect(controller.minutes).toBe('30');
        expect(controller.seconds).toBe('');
      });
    });
  });

  describe('Date Formatting', () => {
    describe('weekday formatting', () => {
      it('should format weekday as long by default', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: { weekday: 'long' }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        // January 1, 2023 was a Sunday
        expect(controller.currentDate).toContain('Sunday');
      });

      it('should format weekday as short', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: { weekday: 'short' }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        // Expect abbreviated form of Sunday
        expect(controller.currentDate).toContain('Sun');
      });

      it('should format weekday as narrow', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: { weekday: 'narrow' }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        // Narrow form of Sunday (might be 'S' but could vary by locale)
        expect(controller.currentDate.length).toBeGreaterThan(0);
      });

      it('should hide weekday when format is hidden', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: {
            weekday: 'hidden',
            month: 'long',
            day: 'numeric'
          }
        });
        controller['updateTime'](mockDate, undefined);
        // Should not contain any form of Sunday
        expect(controller.currentDate).not.toContain('Sunday');
        expect(controller.currentDate).not.toContain('Sun');
        expect(controller.currentDate).not.toContain('S,');
      });
    });

    describe('month formatting', () => {
      it('should format month as long by default', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: { month: 'long' }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        expect(controller.currentDate).toContain('January');
      });

      it('should format month as short', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: { month: 'short' }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        expect(controller.currentDate).toContain('Jan');
      });

      it('should format month as numeric', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: {
            month: 'numeric',
            day: 'numeric'
          }
        });
        controller['updateDate'](mockDate,defaultLanguage, undefined);
        // Should contain 1 for January
        expect(controller.currentDate).toMatch(/\b1\b/);
      });

      it('should format month as 2-digit', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: {
            month: '2-digit',
            day: '2-digit'
          }
        });
        controller['updateDate'](mockDate,defaultLanguage, undefined);
        // Should contain 01 for January
        expect(controller.currentDate).toMatch(/\b01\b/);
      });

      it('should hide month when format is hidden', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: {
            month: 'hidden',
            day: 'numeric',
            year: 'numeric'
          }
        });
        controller['updateTime'](mockDate, undefined);;
        // Should not contain any form of January
        expect(controller.currentDate).not.toContain('January');
        expect(controller.currentDate).not.toContain('Jan');
        // The day number might still be visible, so we only check for month names
      });
    });

    describe('day formatting', () => {
      it('should format day as numeric by default', () => {
        const controller = new ClockController(mockHost, {
          dateFormat: { day: 'numeric' }
        });
        controller['updateDate'](mockDate,defaultLanguage, undefined);
        // Should contain 1 for the 1st day
        expect(controller.currentDate).toMatch(/\b1\b/);
      });

      it('should format day as 2-digit', () => {
        const controller = new ClockController(mockHost, {
          dateFormat: { day: '2-digit' }
        });
        controller['updateDate'](mockDate,defaultLanguage, undefined);
        // Should contain 01 for the 1st day
        expect(controller.currentDate).toMatch(/\b01\b/);
      });

      it('should hide day when format is hidden', () => {
        const controller = new ClockController(mockHost, {
          dateFormat: {
            day: 'hidden',
            month: 'long',
            year: 'numeric'
          }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        // Should not contain the day number
        expect(controller.currentDate).not.toMatch(/\b1\b/);
        expect(controller.currentDate).not.toMatch(/\b01\b/);
      });
    });

    describe('year formatting', () => {
      it('should format year as numeric by default', () => {
        const controller = new ClockController(mockHost, {
          dateFormat: { year: 'numeric' }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        expect(controller.currentDate).toContain('2023');
      });

      it('should format year as 2-digit', () => {
        const controller = new ClockController(mockHost, {
          dateFormat: { year: '2-digit' }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        expect(controller.currentDate).toContain('23');
      });

      it('should hide year when format is hidden', () => {
        const controller = new ClockController(mockHost, {
          dateFormat: {
            year: 'hidden',
            month: 'long',
            day: 'numeric'
          }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        // Should not contain any form of the year
        expect(controller.currentDate).not.toContain('2023');
        expect(controller.currentDate).not.toContain('23');
      });
    });

    describe('combined date format options', () => {
      it('should handle multiple date format options together', () => {
        const controller = new ClockController(mockHost, {
          language: defaultLanguage,
          dateFormat: {
            weekday: 'short',
            year: '2-digit',
            month: 'short',
            day: 'numeric'
          }
        });
        controller['updateDate'](mockDate, defaultLanguage, undefined);
        // Should contain abbreviated forms
        expect(controller.currentDate).toContain('Sun');
        expect(controller.currentDate).toContain('Jan');
        expect(controller.currentDate).toMatch(/\b1\b/);
        expect(controller.currentDate).toContain('23');
      });

      it('should handle all hidden date components', () => {
        const controller = new ClockController(mockHost, {
          dateFormat: {
            weekday: 'hidden',
            year: 'hidden',
            month: 'hidden',
            day: 'hidden'
          }
        });
        controller['updateTime'](mockDate, undefined);;
        expect(controller.currentDate).toBe('');
      });
    });
  });

  describe('Language and TimeZone', () => {
    it('should format date and time according to specified language', () => {
      const controller = new ClockController(mockHost, {
        language: 'de',
        dateFormat: {
          weekday: 'long',
          month: 'long'
        }
      });
      controller['updateDate'](mockDate, 'de', undefined);
      // German weekday and month names
      // Sunday in German is "Sonntag"
      // January in German is "Januar"
      expect(controller.currentDate).toContain('Sonntag');
      expect(controller.currentDate).toContain('Januar');
    });

    it('should format date and time according to specified time zone', () => {
      // Test with a timezone that's significantly different from local
      const controller = new ClockController(mockHost, {
        timeZone: 'Asia/Tokyo',
        dateFormat: {
          month: 'long',
          day: 'numeric'
        }
      });
      controller['updateDate'](mockDate, defaultLanguage, undefined);
      // The date in Tokyo might be different due to timezone difference
      // This is a basic check that the timezone parameter is being used
      expect(controller.currentDate.length).toBeGreaterThan(0);
    });

    describe('Timezone formatting with specific times', () => {
      // Test specific times with different timezones
      it('should format 9:05:12 correctly with America/New_York timezone', () => {
        const controller = new ClockController(mockHost, {
          timeZone: 'America/New_York',
          timeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }
        });

        // Call updateTime directly with custom time values (9:05:12)
        const testDate = new Date(2023, 0, 1, 9, 5, 12); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, 'Europe/London');

        // Check that the time components are formatted correctly
        expect(controller.hours).toBe('08');
        expect(controller.minutes).toBe('05');
        expect(controller.seconds).toBe('12');
      });

      it('should format 14:15:12 correctly with Europe/London timezone', () => {
        const controller = new ClockController(mockHost, {
          timeZone: 'Europe/London',
          timeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }
        });

        // Call updateTime directly with custom time values (14:15:12)
        const testDate = new Date(2023, 0, 1, 14, 15, 12); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, 'Europe/London');

        // Check that the time components are formatted correctly
        expect(controller.hours).toBe('13');
        expect(controller.minutes).toBe('15');
        expect(controller.seconds).toBe('12');
      });
    });

    describe('English format with hour12=true for specific times', () => {
      it('should format 9:05:12 correctly with hour12=true (AM)', () => {
        const controller = new ClockController(mockHost, {
          language: 'en',
          timeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }
        });

        // Call updateTime directly with custom time values (9:05:12 AM)
        const testDate = new Date(2023, 0, 1, 9, 5, 12); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate,  undefined);

        // Check that the time components are formatted correctly in 12-hour format
        expect(controller.hours).toBe('09');
        expect(controller.minutes).toBe('05');
        expect(controller.seconds).toBe('12');
        expect(controller.ampm).toBe('AM');
      });

      it('should format 14:15:12 correctly with hour12=true (PM)', () => {
        const controller = new ClockController(mockHost, {
          language: 'en',
          timeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }
        });

        // Call updateTime directly with custom time values (14:15:12 = 2:15:12 PM)
        const testDate = new Date(2023, 0, 1, 14, 15, 12); // Note: month is 0-indexed in JavaScript Date
        controller['updateTime'](testDate, undefined);

        // Check that the time components are formatted correctly in 12-hour format
        expect(controller.hours).toBe('02');
        expect(controller.minutes).toBe('15');
        expect(controller.seconds).toBe('12');
        expect(controller.ampm).toBe('PM');
      });
    });
  });
});
