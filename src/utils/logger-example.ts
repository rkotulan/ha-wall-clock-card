/**
 * Example of how to use the logger in a component
 * This file demonstrates the usage of the logger module in the BackgroundImageManager
 */

import { createLogger, configureLogger, LogLevel } from './logger';

// Example 1: Basic usage with the default logger
import { logger } from './logger';

function basicExample() {
  // Use the default logger
  logger.info('This is an info message');
  logger.warn('This is a warning message');
  logger.error('This is an error message', new Error('Example error'));
  
  // Debug messages are not shown by default (level is INFO)
  logger.debug('This debug message will not be shown with default settings');
}

// Example 2: Creating a component-specific logger
function componentExample() {
  // Create a logger for a specific component
  const backgroundLogger = createLogger('background-image-manager');
  
  backgroundLogger.info('Initializing with image source ID: picsum');
  backgroundLogger.warn('No image URL returned from source');
  backgroundLogger.error('Error getting next image URL:', new Error('Failed to fetch'));
  
  // You can also create a new logger with a different source
  const imageSourceLogger = backgroundLogger.withSource('picsum-source');
  imageSourceLogger.info('Generated Picsum image URL: https://picsum.photos/1920/1080');
}

// Example 3: Configuring the logger
function configurationExample() {
  // Configure the global logger settings
  configureLogger({
    level: LogLevel.DEBUG,  // Show all log levels including debug
    prefix: 'wall-clock',   // Add a prefix to all log messages
    enableTimestamps: true, // Add timestamps to log messages
    enableSourceTracking: true, // Show the source of each log message
    logToStorage: true      // Store logs in memory for later retrieval
  });
  
  // Now debug messages will be shown
  logger.debug('This debug message will now be shown');
  
  // Create a component logger with the new configuration
  const componentLogger = createLogger('unsplash-source');
  componentLogger.info('Using collection IDs: 123, 456, 789');
  
  // The log message will now include timestamp, level, prefix, and source:
  // [2023-04-15T12:34:56.789Z] [INFO] [wall-clock] [unsplash-source] Using collection IDs: 123, 456, 789
}

// Example 4: Migrating from console.log to the logger
function migrationExample() {
  // Before:
  console.log('[background-image-manager] Initializing with image source ID: picsum');
  console.warn('[background-image-manager] No image URL returned from source');
  console.error('[background-image-manager] Error getting next image URL:', new Error('Failed to fetch'));
  
  // After:
  const logger = createLogger('background-image-manager');
  logger.info('Initializing with image source ID: picsum');
  logger.warn('No image URL returned from source');
  logger.error('Error getting next image URL:', new Error('Failed to fetch'));
}

// Example 5: Using the logger in a class
class ExampleComponent {
  private logger = createLogger('example-component');
  
  constructor() {
    this.logger.info('Component initialized');
  }
  
  doSomething() {
    try {
      // Some operation
      this.logger.info('Operation completed successfully');
    } catch (error) {
      this.logger.error('Operation failed:', error);
    }
  }
}

export {
  basicExample,
  componentExample,
  configurationExample,
  migrationExample,
  ExampleComponent
};