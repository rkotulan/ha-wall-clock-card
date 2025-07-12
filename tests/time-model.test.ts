import { TimeModel, TimeModelConfig } from '../src/components/clock/time-model';

// Mock the formatDate and formatDateTime functions
jest.mock('../src/lokalify', () => {
  const original = jest.requireActual('../src/lokalify');
  return {
    ...original,
    formatDate: jest.fn((_date, _language, options, _timeZone) => {
      if (options.weekday === 'long' && options.month === 'long' && options.day === 'numeric') {
        return 'Monday, January 1';
      }
      return 'formatted date';
    }),
    formatDateTime: jest.fn((_date, _language, options, timeZone) => {
      if (options.hour === 'numeric' && options.minute === 'numeric' && options.second === 'numeric') {
        return timeZone ? '10:30:45' : '12:30:45';
      }
      return 'formatted date time';
    })
  };
});

describe('TimeModel', () => {
  let timeModel: TimeModel;

  beforeEach(() => {
    // Reset the TimeModel instance before each test
    timeModel = new TimeModel();

    // Mock Date methods to return fixed values
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(12);
    jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(30);
    jest.spyOn(Date.prototype, 'getSeconds').mockReturnValue(45);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with default values', () => {
      expect(timeModel.getHours()).toBe('');
      expect(timeModel.getMinutes()).toBe('');
      expect(timeModel.getSeconds()).toBe('');
      expect(timeModel.getAmPm()).toBe('');
      expect(timeModel.getCurrentDate()).toBe('');
    });

    test('should initialize with provided config', () => {
      const config: TimeModelConfig = {
        timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
        dateFormat: { weekday: 'long', month: 'long', day: 'numeric' },
        language: 'en',
        timeZone: 'America/New_York'
      };

      timeModel = new TimeModel(config);
      timeModel.updateTime();

      // Since we're mocking formatDateTime to return '10:30:45' for timeZone
      expect(timeModel.getHours()).toBe('10');
      expect(timeModel.getMinutes()).toBe('30');
      expect(timeModel.getSeconds()).toBe('45');
    });
  });

  describe('updateConfig', () => {
    test('should update the configuration', () => {
      const config: TimeModelConfig = {
        timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
        dateFormat: { weekday: 'long', month: 'long', day: 'numeric' },
        language: 'en',
        timeZone: 'America/New_York'
      };

      timeModel.updateConfig(config);
      expect(timeModel.getHours()).toBe(''); // Still empty until updateTime is called

      timeModel.updateTime();
      expect(timeModel.getHours()).toBe('10'); // Now updated based on the new config
    });
  });

  describe('updateTime', () => {
    test('should update time with default config', () => {
      timeModel.updateTime();

      // With no timeZone, it should use local time (12:30:45)
      expect(timeModel.getHours()).toBe('12');
      expect(timeModel.getMinutes()).toBe('30');
      expect(timeModel.getSeconds()).toBe('45');
      expect(timeModel.getAmPm()).toBe('');
      expect(timeModel.getCurrentDate()).toBe('Monday, January 1');
    });

    test('should update time with time zone', () => {
      const config: TimeModelConfig = {
        timeZone: 'America/New_York'
      };

      timeModel.updateConfig(config);
      timeModel.updateTime();

      // With timeZone, it should use the mocked time (10:30:45)
      expect(timeModel.getHours()).toBe('10');
      expect(timeModel.getMinutes()).toBe('30');
      expect(timeModel.getSeconds()).toBe('45');
    });

    test('should handle 12-hour format', () => {
      const config: TimeModelConfig = {
        timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
      };

      timeModel.updateConfig(config);
      timeModel.updateTime();

      // 12:30:45 in 12-hour format is 12:30:45 PM
      expect(timeModel.getHours()).toBe('12');
      expect(timeModel.getMinutes()).toBe('30');
      expect(timeModel.getSeconds()).toBe('45');
      expect(timeModel.getAmPm()).toBe('PM');
    });

    test('should handle AM hours in 12-hour format', () => {
      // Mock Date to return 10:30:45 AM
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(10);

      const config: TimeModelConfig = {
        timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
      };

      timeModel.updateConfig(config);
      timeModel.updateTime();

      expect(timeModel.getHours()).toBe('10');
      expect(timeModel.getAmPm()).toBe('AM');
    });

    test('should handle midnight in 12-hour format', () => {
      // Mock Date to return 00:30:45 (midnight)
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(0);

      const config: TimeModelConfig = {
        timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
      };

      timeModel.updateConfig(config);
      timeModel.updateTime();

      expect(timeModel.getHours()).toBe('12'); // 0 hours should be displayed as 12 in 12-hour format
      expect(timeModel.getAmPm()).toBe('AM');
    });

    test('should pad hours, minutes, and seconds with leading zeros when format is 2-digit', () => {
      // Mock Date to return 9:5:7
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(9);
      jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(5);
      jest.spyOn(Date.prototype, 'getSeconds').mockReturnValue(7);

      const config: TimeModelConfig = {
        timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit' }
      };

      timeModel.updateConfig(config);
      timeModel.updateTime();

      expect(timeModel.getHours()).toBe('09');
      expect(timeModel.getMinutes()).toBe('05');
      expect(timeModel.getSeconds()).toBe('07');
    });

    test('should not pad hours, minutes, and seconds when format is not 2-digit', () => {
      // Mock Date to return 9:5:7
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(9);
      jest.spyOn(Date.prototype, 'getMinutes').mockReturnValue(5);
      jest.spyOn(Date.prototype, 'getSeconds').mockReturnValue(7);

      const config: TimeModelConfig = {
        timeFormat: { hour: 'numeric', minute: 'numeric', second: 'numeric' }
      };

      timeModel.updateConfig(config);
      timeModel.updateTime();

      expect(timeModel.getHours()).toBe('9');
      expect(timeModel.getMinutes()).toBe('5');
      expect(timeModel.getSeconds()).toBe('7');
    });

    test('should call onTimeUpdate callback if provided', () => {
      const onTimeUpdate = jest.fn();
      const config: TimeModelConfig = {
        onTimeUpdate
      };

      timeModel.updateConfig(config);
      timeModel.updateTime();

      expect(onTimeUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('getters', () => {
    beforeEach(() => {
      // Set up some values
      timeModel.updateConfig({
        timeFormat: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
      });
      timeModel.updateTime();
    });

    test('getHours should return the hours', () => {
      expect(timeModel.getHours()).toBe('12');
    });

    test('getMinutes should return the minutes', () => {
      expect(timeModel.getMinutes()).toBe('30');
    });

    test('getSeconds should return the seconds', () => {
      expect(timeModel.getSeconds()).toBe('45');
    });

    test('getAmPm should return the AM/PM indicator', () => {
      expect(timeModel.getAmPm()).toBe('PM');
    });

    test('getCurrentDate should return the current date', () => {
      expect(timeModel.getCurrentDate()).toBe('Monday, January 1');
    });
  });
});
