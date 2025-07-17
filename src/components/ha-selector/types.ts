// https://github.com/elenagalun/front/blob/dev/src/data/selector.ts#L346
export type Selector =
    // | ActionSelector
    // | AddonSelector
    // | AreaSelector
    // | AreaFilterSelector
    // | AttributeSelector
    | BooleanSelector
    | ButtonToggleSelector
    | ColorRGBSelector
    | ColorHexSelector
    // | ColorTempSelector
    // | ConditionSelector
    // | ConversationAgentSelector
    // | ConfigEntrySelector
    // | ConstantSelector
    // | CountrySelector
    // | DateSelector
    // | DateTimeSelector
    // | DeviceSelector
    // | FloorSelector
    // | LegacyDeviceSelector
    // | DurationSelector
    | EntitySelector
    // | LegacyEntitySelector
    // | FileSelector
    // | IconSelector
    // | LabelSelector
    // | ImageSelector
    // | BackgroundSelector
    // | LanguageSelector
    // | LocationSelector
    // | MediaSelector
    // | NavigationSelector
    | NumberSelector
    // | ObjectSelector
    // | AssistPipelineSelector
    // | QRCodeSelector
    | SelectSelector
    | SelectorSelector
    // | StateSelector
    // | StatisticSelector
    | StringSelector
    // | STTSelector
    | TargetSelector
    // | TemplateSelector
    // | ThemeSelector
    // | TimeSelector
    // | TriggerSelector
    // | TTSSelector
    // | TTSVoiceSelector
    // | UiActionSelector
    // | UiColorSelector
    // | UiStateContentSelector
    // | BackupLocationSelector;
    ;

export interface ColorRGBSelector {
    color_rgb: {} | null;
}

// Define the ColorHexSelector type
export interface ColorHexSelector {
    color_hex: string;
}

export interface SelectOption {
    value: any;
    label: string;
    disabled?: boolean;
}

export interface SelectSelector {
    select: {
        multiple?: boolean;
        custom_value?: boolean;
        mode?: "list" | "dropdown";
        options: readonly string[] | readonly SelectOption[];
        translation_key?: string;
        sort?: boolean;
        reorder?: boolean;
    } | null;
}

export interface SelectorSelector {
    selector: {} | null;
}

export interface StringSelector {
    text: {
        multiline?: boolean;
        type?:
            | "number"
            | "text"
            | "search"
            | "tel"
            | "url"
            | "email"
            | "password"
            | "date"
            | "month"
            | "week"
            | "time"
            | "datetime-local"
            | "color";
        prefix?: string;
        suffix?: string;
        autocomplete?: string;
        multiple?: true;
    } | null;
}

export interface NumberSelector {
    number: {
        min?: number;
        max?: number;
        step?: number | "any";
        mode?: "box" | "slider";
        unit_of_measurement?: string;
        slider_ticks?: boolean;
    } | null;
}

interface DeviceSelectorFilter {
    integration?: string;
    manufacturer?: string;
    model?: string;
}

interface EntitySelectorFilter {
    integration?: string;
    domain?: string | readonly string[];
    device_class?: string | readonly string[];
    supported_features?: number | [number];
}

export interface TargetSelector {
    target: {
        entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
        device?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
    } | null;
}

export interface EntitySelector {
    entity: {
        multiple?: boolean;
        include_entities?: string[];
        exclude_entities?: string[];
        filter?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    } | null;
}

export interface BooleanSelector {
    boolean: {} | null;
}

export interface ButtonToggleSelector {
    button_toggle: {
        options: readonly string[] | readonly SelectOption[];
        translation_key?: string;
        sort?: boolean;
    } | null;
}

export enum LabelPosition {
    Left = "left",
    Top = "top",
    Hidden = "hidden"
}
