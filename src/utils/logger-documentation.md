# Logger Module Documentation

## Overview

The logger module provides a centralized, configurable logging system for the wall-clock-card project. It replaces the scattered `console.log`, `console.warn`, and `console.error` calls throughout the codebase with a structured logging approach that offers more flexibility, consistency, and features.

## Benefits

### 1. Consistent Formatting

The logger ensures that all log messages follow a consistent format, making them easier to read and filter. Each log message includes:
- Optional timestamp
- Log level (DEBUG, INFO, WARN, ERROR)
- Optional prefix
- Source identifier
- Message content

### 2. Configurable Log Levels

The logger supports different log levels (DEBUG, INFO, WARN, ERROR, NONE), allowing you to control the verbosity of the logs. This is particularly useful for:
- Showing detailed logs during development
- Reducing log output in production
- Focusing on specific types of messages

### 3. Component-Specific Loggers

Each component can create its own logger instance with a specific source identifier. This makes it easy to:
- Identify which component generated a log message
- Filter logs by component
- Configure logging behavior per component

### 4. Log Storage

The logger can optionally store log messages in memory, allowing you to:
- Retrieve logs programmatically
- Display logs in the UI for debugging
- Analyze logs without needing to open the browser console

### 5. Improved Error Handling

The logger provides better support for logging errors, including:
- Proper formatting of error objects
- Consistent error reporting across the application
- Ability to include additional context with errors

## Usage

### Basic Usage

```typescript
import { logger } from './utils/logger';

// Log messages at different levels
logger.debug('Detailed information for debugging');
logger.info('General information about application operation');
logger.warn('Warning about potential issues');
logger.error('Error information', new Error('Something went wrong'));
```

### Component-Specific Logger

```typescript
import { createLogger } from './utils/logger';

// Create a logger for a specific component
const logger = createLogger('background-image-manager');

logger.info('Initializing with image source ID: picsum');
logger.warn('No image URL returned from source');
```

### Configuring the Logger

```typescript
import { configureLogger, LogLevel } from './utils/logger';

// Configure global logger settings
configureLogger({
  level: LogLevel.DEBUG,        // Show all log levels
  prefix: 'wall-clock',         // Add a prefix to all messages
  enableTimestamps: true,       // Add timestamps to messages
  enableSourceTracking: true,   // Show source component
  logToConsole: true,           // Output to console
  logToStorage: true,           // Store logs in memory
  maxStoredLogs: 1000           // Maximum number of stored logs
});
```

### Retrieving Stored Logs

```typescript
import { getStoredLogs, clearStoredLogs } from './utils/logger';

// Get all stored logs
const logs = getStoredLogs();

// Display logs in UI or process them
displayLogs(logs);

// Clear stored logs when no longer needed
clearStoredLogs();
```

## Migration Guide

### Before

```typescript
console.log('[background-image-manager] Initializing with image source ID: picsum');
console.warn('[background-image-manager] No image URL returned from source');
console.error('[background-image-manager] Error getting next image URL:', error);
```

### After

```typescript
import { createLogger } from './utils/logger';

const logger = createLogger('background-image-manager');

logger.info('Initializing with image source ID: picsum');
logger.warn('No image URL returned from source');
logger.error('Error getting next image URL:', error);
```

## Best Practices

1. **Create Component-Specific Loggers**: Each class or module should create its own logger with a specific source identifier.

2. **Use Appropriate Log Levels**:
   - `debug`: Detailed information for debugging purposes
   - `info`: General information about application operation
   - `warn`: Warning about potential issues that don't prevent operation
   - `error`: Error information that affects application functionality

3. **Include Context**: Provide enough context in log messages to understand what happened without needing to look at the code.

4. **Log Objects Carefully**: When logging objects, consider what information is useful and what might be too verbose.

5. **Configure for Environment**: Use different log configurations for development and production environments.

## Implementation Details

The logger module is implemented in `src/utils/logger.ts` and consists of:

- `LogLevel` enum: Defines the available log levels
- `LoggerConfig` interface: Defines the configuration options
- `configureLogger` function: Configures the global logger settings
- `createLogger` function: Creates a logger instance for a specific source
- `getStoredLogs` and `clearStoredLogs` functions: Manage stored logs
- Default `logger` instance: Ready-to-use logger with default settings

See the [logger.ts](./logger.ts) file for the complete implementation details.