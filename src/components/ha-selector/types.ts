
// https://github.com/elenagalun/front/blob/dev/src/data/selector.ts#L346
export type Selector =
    // | ActionSelector
    // | AddonSelector
    // | AreaSelector
    // | AreaFilterSelector
    // | AttributeSelector
    // | BooleanSelector
    // | ButtonToggleSelector
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
    // | EntitySelector
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
    // | NumberSelector
    // | ObjectSelector
    // | AssistPipelineSelector
    // | QRCodeSelector
     | SelectSelector
     | SelectorSelector
    // | StateSelector
    // | StatisticSelector
     | StringSelector
    // | STTSelector
    // | TargetSelector
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