export type SensorColorOperator = '<' | '<=' | '>' | '>=' | '=' | '!=';

export interface SensorColorRule {
    operator: SensorColorOperator;
    value: number;
    /** Any valid CSS color value. */
    color: string;
}

export interface SensorConfig {
    entity: string;
    /** Custom label; unset falls back to the entity's friendly_name, '' hides the label. */
    label?: string;
    /** Custom icon; unset follows Home Assistant's entity/device-class icon. */
    icon?: string;
    /** Decimal places override; unset falls back to HA display precision. */
    precision?: number;
    /** Default CSS color for this sensor item. */
    color?: string;
    /** Ordered numeric-state rules; the first matching rule wins. */
    colorRules?: SensorColorRule[];
    /** Legacy fields retained for configuration compatibility. */
    name?: string;
    unit?: string;
}
