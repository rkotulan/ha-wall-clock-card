import { createLogger } from '../../utils/logger';

export interface ClockTimerConfig {
    onTick?: () => void; // Callback when timer ticks
}

export class ClockTimer {
    private timeTimer?: number;
    private config: ClockTimerConfig = {};
    private logger = createLogger('clock-timer');
    private isRunning: boolean = false;

    constructor(config: ClockTimerConfig = {}) {
        this.config = config;
    }

    /**
     * Update the configuration
     */
    updateConfig(config: ClockTimerConfig): void {
        this.config = config;
    }

    /**
     * Start the timer
     */
    startTimer(): void {
        if (this.isRunning) {
            this.logger.debug('Timer is already running');
            return;
        }

        // Use a more precise timer mechanism with requestAnimationFrame
        let lastUpdateTime = Date.now();
        let syncWithSystemClock = 0;

        const updateFrame = () => {
            try {
                const now = Date.now();
                const elapsed = now - lastUpdateTime;

                // Update time if at least 1000ms have passed
                if (elapsed >= 1000) {
                    // Call the onTick callback if provided
                    if (this.config.onTick) {
                        this.config.onTick();
                    }

                    lastUpdateTime = now - (elapsed % 1000); // Adjust for any extra time

                    // Sync with system clock every minute to prevent drift
                    syncWithSystemClock++;
                    if (syncWithSystemClock >= 60) {
                        this.logger.debug('Synchronizing with system clock to prevent drift');
                        lastUpdateTime = Date.now();
                        syncWithSystemClock = 0;
                    }
                }

                // Continue the animation loop
                this.timeTimer = window.requestAnimationFrame(updateFrame);
            } catch (error) {
                this.logger.error('Error in animation frame:', error);
                // Attempt recovery
                this.stopTimer();
                this.startTimer();
            }
        };

        // Start the animation loop
        this.timeTimer = window.requestAnimationFrame(updateFrame);
        this.isRunning = true;
        this.logger.debug('Clock timer started with requestAnimationFrame');
    }

    /**
     * Stop the timer
     */
    stopTimer(): void {
        if (this.timeTimer) {
            window.cancelAnimationFrame(this.timeTimer);
            this.timeTimer = undefined;
            this.isRunning = false;
            this.logger.debug('Clock timer stopped');
        }
    }

    /**
     * Check if the timer is running
     */
    isTimerRunning(): boolean {
        return this.isRunning;
    }
}
