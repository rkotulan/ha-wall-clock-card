export type WidgetSettingsTab = 'content' | 'appearance' | 'behavior';

const BUILT_IN_EDITOR_SECTIONS: Record<string, readonly WidgetSettingsTab[]> = {
    clock: ['content'],
    date: ['content'],
    sensors: ['content'],
    weather: ['content', 'appearance', 'behavior'],
    transportation: ['content', 'appearance', 'behavior'],
    'action-bar': ['content', 'behavior'],
    calendar: ['content', 'appearance', 'behavior'],
    separator: ['appearance'],
    'ha-card': ['content', 'appearance'],
};

/** Tabs in which a widget's feature editor contributes settings. */
export function widgetEditorSections(widgetType: string): readonly WidgetSettingsTab[] {
    return BUILT_IN_EDITOR_SECTIONS[widgetType] ?? ['content'];
}

export function widgetHasEditorSection(widgetType: string, tab: WidgetSettingsTab): boolean {
    return widgetEditorSections(widgetType).includes(tab);
}
