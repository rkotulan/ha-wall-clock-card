# Logger

The logger in `src/utils/logger/logger.ts` provides global levels and named logger
instances. Card YAML/Designer `logLevel` accepts `debug`, `info`, `warn`, `error` or
`none`; the card applies it through `configureLogger()`.

```typescript
import {createLogger} from './utils/logger';

const logger = createLogger('calendar-controller');
logger.debug('Refreshing events');
logger.info('Events loaded', events.length);
logger.warn('Calendar is unavailable', entityId);
logger.error('Refresh failed', error);
```

Advanced code can configure timestamps, source tracking, console output and bounded
in-memory storage:

```typescript
import {configureLogger, LogLevel} from './utils/logger';

configureLogger({
  level: LogLevel.DEBUG,
  prefix: 'wall-clock',
  enableTimestamps: true,
  enableSourceTracking: true,
  logToConsole: true,
  logToStorage: false,
  maxStoredLogs: 100,
});
```

`getStoredLogs()` returns a copy and `clearStoredLogs()` clears it. Storage is off by
default. Do not log API keys, HA tokens or complete configuration objects that may
contain secrets. Use `debug` for polling/render diagnostics and keep production
defaults at `info` or quieter.
