# HA Selector Components Documentation

## Overview

This document provides developer documentation for two custom selector components used in the Wall Clock Card:

1. **ha-row-selector**: A component that wraps any selector with a label in a row layout
2. **ha-selector-color_hex**: A component for selecting colors in hexadecimal format

These components extend the Home Assistant selector system to provide additional functionality and improved user experience.

## ha-row-selector

The `ha-row-selector` component is a wrapper that adds a label to any selector component and organizes them in a row layout. It provides flexible positioning options for the label and handles value changes.

### Interface

```typescript
@customElement("ha-row-selector")
export class HaRowSelector extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;
  @property({attribute: false}) public selector!: Selector;
  @property() public value?: string;
  @property() public label?: string;
  @property() public helper?: string;
  @property({type: Boolean, reflect: true}) public disabled = false;
  @property({type: Boolean}) public required = true;
  @property() public propertyName?: string;
  @property({attribute: false}) public transformData?: (value: any) => any;
  @property({attribute: false}) public labelPosition: LabelPosition = LabelPosition.Left;
  @property({attribute: false}) public actionIcon?: string;
  @property({attribute: false}) public actionTooltip?: string;
}
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hass` | `HomeAssistant` | required | The Home Assistant instance |
| `selector` | `Selector` | required | The selector configuration to use |
| `value` | `string` | `undefined` | The current value of the selector |
| `label` | `string` | `undefined` | The label text to display |
| `helper` | `string` | `undefined` | Helper text to display below the selector |
| `disabled` | `boolean` | `false` | Whether the selector is disabled |
| `required` | `boolean` | `true` | Whether the selector is required |
| `propertyName` | `string` | `undefined` | Name of the property to update when value changes |
| `transformData` | `(value: any) => any` | `undefined` | Function to transform the value before emitting the event |
| `labelPosition` | `LabelPosition` | `LabelPosition.Left` | Position of the label relative to the selector |
| `actionIcon` | `string` | `undefined` | Icon path for the action button. If provided, an action button will be displayed |
| `actionTooltip` | `string` | `undefined` | Tooltip text for the action button |

### Label Positions

The `LabelPosition` enum defines the possible positions for the label:

```typescript
export enum LabelPosition {
  Left = "left",   // Label on the left side of the selector
  Top = "top",     // Label above the selector
  Hidden = "hidden" // Label is not displayed
}
```

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `value-changed` | `{ value: any, propertyName?: string }` | Fired when the value changes |
| `action-click` | `{}` | Fired when the action button is clicked |

### Usage Example

```html
<ha-row-selector
  .hass=${this.hass}
  .selector=${{ select: { options: ["Option 1", "Option 2"] } }}
  .value=${this.value}
  .label=${"Select an option"}
  .helper=${"Choose from the available options"}
  .labelPosition=${LabelPosition.Left}
  @value-changed=${this._handleValueChanged}
></ha-row-selector>
```

### Handling Value Changes

```typescript
// Example event handler in a component using ha-row-selector
function _handleValueChanged(ev: CustomEvent): void {
  const { value, propertyName } = ev.detail;

  if (propertyName) {
    // Update a specific property
    this[propertyName] = value;
  } else {
    // Update the main value
    this.value = value;
  }
}
```

### CSS Customization

The component provides CSS variables for customization:

```css
ha-row-selector {
  --row-spacing: 12px; /* Spacing between rows */
  --label-width: 30%; /* Width of the label when in left position */
}
```

## ha-selector-color_hex

The `ha-selector-color_hex` component provides a color picker that returns colors in hexadecimal format. It wraps a text field with type "color" and validates the hex color format.

### Interface

```typescript
@customElement("ha-selector-color_hex")
export class HaColorHexSelector extends LitElement {
  @property({attribute: false}) public hass!: HomeAssistant;
  @property({attribute: false}) public selector!: ColorHexSelector;
  @property() public value?: string;
  @property() public label?: string;
  @property() public helper?: string;
  @property({type: Boolean, reflect: true}) public disabled = false;
  @property({type: Boolean}) public required = true;
}
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hass` | `HomeAssistant` | required | The Home Assistant instance |
| `selector` | `ColorHexSelector` | required | The selector configuration |
| `value` | `string` | `undefined` | The current color value in hex format (e.g., "#FF5733") |
| `label` | `string` | `undefined` | The label text to display |
| `helper` | `string` | `undefined` | Helper text to display below the selector |
| `disabled` | `boolean` | `false` | Whether the selector is disabled |
| `required` | `boolean` | `true` | Whether the selector is required |

### ColorHexSelector Interface

```typescript
export interface ColorHexSelector {
  color_hex: string;
}
```

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `value-changed` | `{ value: string }` | Fired when the color value changes |

### Validation

The component validates that the color value is in the correct hex format (#RRGGBB). If the value is invalid, the change event is not fired.

### Usage Example

```html
<ha-selector-color_hex
  .hass=${this.hass}
  .selector=${{ color_hex: "" }}
  .value=${this.color}
  .label=${"Choose a color"}
  .helper=${"Select a color for the background"}
  @value-changed=${this._handleColorChanged}
></ha-selector-color_hex>
```

### Handling Value Changes

```typescript
// Example event handler in a component using ha-selector-color_hex
function _handleColorChanged(ev: CustomEvent): void {
  const { value } = ev.detail;
  this.color = value;
}
```

### Using with ha-row-selector

The `ha-selector-color_hex` component can be used with `ha-row-selector` to add a label in a row layout:

```html
<ha-row-selector
  .hass=${this.hass}
  .selector=${{ color_hex: "" }}
  .value=${this.color}
  .label=${"Background Color"}
  .helper=${"Select a color for the background"}
  .labelPosition=${LabelPosition.Left}
  @value-changed=${this._handleColorChanged}
></ha-row-selector>
```

## Integration with Home Assistant Selectors

Both components integrate with the Home Assistant selector system. The `ha-row-selector` can wrap any valid Home Assistant selector, while `ha-selector-color_hex` is a specialized selector for hex color values.

### Available Selector Types

The `Selector` type in the project includes the following selector types:

```typescript
export type Selector =
  | BooleanSelector
  | ButtonToggleSelector
  | ColorRGBSelector
  | ColorHexSelector
  | EntitySelector
  | NumberSelector
  | SelectSelector
  | SelectorSelector
  | StringSelector
  | TargetSelector;
```

## Best Practices

1. **Label Positioning**: Choose the appropriate label position based on the available space and the complexity of the selector.
   - Use `LabelPosition.Left` for simple selectors in forms with sufficient width
   - Use `LabelPosition.Top` for complex selectors or when horizontal space is limited
   - Use `LabelPosition.Hidden` when labels are provided by other means or not needed

2. **Data Transformation**: Use the `transformData` property of `ha-row-selector` to transform data before it's emitted in the value-changed event.

3. **Property Name**: Set the `propertyName` property of `ha-row-selector` when you want to update a specific property in the parent component.

4. **Helper Text**: Provide clear and concise helper text to guide users on how to use the selector.

5. **Validation**: The `ha-selector-color_hex` component validates hex color format automatically. Ensure your application handles invalid values appropriately.

## Examples

### Basic Example with ha-row-selector

```html
<ha-row-selector
  .hass=${this.hass}
  .selector=${{ number: { min: 0, max: 100, step: 1 } }}
  .value=${this.opacity}
  .label=${"Opacity"}
  .helper=${"Set the opacity level (0-100)"}
  .labelPosition=${LabelPosition.Left}
  @value-changed=${this._handleOpacityChanged}
></ha-row-selector>
```

### Example with Action Button

```html
<ha-row-selector
  .hass=${this.hass}
  .selector=${{ select: { options: ["Option 1", "Option 2"] } }}
  .value=${this.selectedOption}
  .label=${"Select an option"}
  .actionIcon=${"M19,13H5V11H19V13Z"}
  .actionTooltip=${"Remove this option"}
  @value-changed=${this._handleOptionChanged}
  @action-click=${this._handleRemoveOption}
></ha-row-selector>
```

```typescript
// Example event handler for the action button
function _handleRemoveOption(ev: CustomEvent): void {
  // Handle the action button click
  this.removeCurrentOption();
}
```

### Using Data Transformation

```html
<ha-row-selector
  .hass=${this.hass}
  .selector=${{ number: { min: 0, max: 1, step: 0.01 } }}
  .value=${this.opacity * 100}
  .label=${"Opacity"}
  .helper=${"Set the opacity level (0-100)"}
  .transformData=${(value) => value / 100}
  @value-changed=${this._handleOpacityChanged}
></ha-row-selector>
```

### Color Selector Example

```html
<ha-selector-color_hex
  .hass=${this.hass}
  .selector=${{ color_hex: "" }}
  .value=${this.textColor}
  .label=${"Text Color"}
  @value-changed=${this._handleTextColorChanged}
></ha-selector-color_hex>
```
