/**
 * Logger module for wall-clock-card
 * Provides a centralized, configurable logging system
 */

// Log levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

// Logger configuration
export interface LoggerConfig {
  level: LogLevel;
  prefix?: string;
  enableTimestamps?: boolean;
  enableSourceTracking?: boolean;
  logToConsole?: boolean;
  logToStorage?: boolean;
  maxStoredLogs?: number;
}

// Default configuration
const DEFAULT_CONFIG: LoggerConfig = {
  level: LogLevel.INFO,
  prefix: '',
  enableTimestamps: false,
  enableSourceTracking: false,
  logToConsole: true,
  logToStorage: false,
  maxStoredLogs: 100
};

// Global configuration
let globalConfig: LoggerConfig = { ...DEFAULT_CONFIG };

// Storage for logs if enabled
const storedLogs: string[] = [];

/**
 * Configure the global logger settings
 * @param config Logger configuration
 */
export function configureLogger(config: Partial<LoggerConfig>): void {
  globalConfig = { ...DEFAULT_CONFIG, ...config };
}

/**
 * Get the current logger configuration
 * @returns Current logger configuration
 */
export function getLoggerConfig(): LoggerConfig {
  return { ...globalConfig };
}

/**
 * Get stored logs
 * @returns Array of stored log messages
 */
export function getStoredLogs(): string[] {
  return [...storedLogs];
}

/**
 * Clear stored logs
 */
export function clearStoredLogs(): void {
  storedLogs.length = 0;
}

/**
 * Format a log message with optional timestamp and source
 * @param level Log level
 * @param source Source of the log
 * @param message Log message
 * @returns Formatted log message
 */
function formatLogMessage(level: LogLevel, source: string, message: string): string {
  const { prefix, enableTimestamps, enableSourceTracking } = globalConfig;

  let formattedMessage = '';

  // Add timestamp if enabled
  if (enableTimestamps) {
    const timestamp = new Date().toISOString();
    formattedMessage += `[${timestamp}] `;
  }

  // Add log level
  const levelStr = LogLevel[level];
  formattedMessage += `[${levelStr}] `;

  // Add prefix if provided
  if (prefix) {
    formattedMessage += `[${prefix}] `;
  }

  // Add source if provided and source tracking is enabled
  if (source && enableSourceTracking) {
    formattedMessage += `[${source}] `;
  }

  // Add message
  formattedMessage += message;

  return formattedMessage;
}

/**
 * Log a message to console and/or storage
 * @param level Log level
 * @param source Source of the log
 * @param message Log message
 * @param args Additional arguments
 */
function log(level: LogLevel, source: string, message: string, ...args: any[]): void {
  // Skip if log level is below configured level
  if (level < globalConfig.level) {
    return;
  }

  const formattedMessage = formatLogMessage(level, source, message);

  // Log to console if enabled
  if (globalConfig.logToConsole) {
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage, ...args);
        break;
      case LogLevel.INFO:
        console.log(formattedMessage, ...args);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, ...args);
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, ...args);
        break;
    }
  }

  // Store log if enabled
  if (globalConfig.logToStorage) {
    // Add args to the message if they exist
    let fullMessage = formattedMessage;
    if (args.length > 0) {
      try {
        fullMessage += ' ' + args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
      } catch (e) {
        fullMessage += ' [Arguments could not be stringified]';
      }
    }

    storedLogs.push(fullMessage);

    // Trim logs if they exceed the maximum
    const maxLogs = globalConfig.maxStoredLogs ?? 100;
    if (storedLogs.length > maxLogs) {
      storedLogs.splice(0, storedLogs.length - maxLogs);
    }
  }
}

/**
 * Create a logger instance for a specific source
 * @param source Source identifier for the logger
 * @returns Logger instance
 */
export function createLogger(source: string) {
  return {
    debug: (message: string, ...args: any[]) => log(LogLevel.DEBUG, source, message, ...args),
    info: (message: string, ...args: any[]) => log(LogLevel.INFO, source, message, ...args),
    warn: (message: string, ...args: any[]) => log(LogLevel.WARN, source, message, ...args),
    error: (message: string, ...args: any[]) => log(LogLevel.ERROR, source, message, ...args),

    // Allow changing the source for this logger instance
    withSource: (newSource: string) => createLogger(newSource)
  };
}

// Create a default logger
export const logger = createLogger('wall-clock');
