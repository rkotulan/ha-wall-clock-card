# Wall Clock Card - Developer Guidelines

## Project Overview
Wall Clock Card is a custom card for Home Assistant's Lovelace UI that displays a clock with seconds and date. It features customizable time/date formats, background images, weather forecasts, transportation information, and an action bar.

## Tech Stack
- **TypeScript**: Main programming language
- **Lit**: Web components library for UI
- **Webpack**: Module bundler
- **Jest**: Testing framework
- **Home Assistant Custom Card API**: Integration with Home Assistant

## Project Structure
- **src/**: Source code
  - **core/**: Core components and logic
    - **wall-clock-card.ts**: Main component
    - **types.ts**: Shared types and interfaces
    - **config.ts**: Configuration and default values
  - **components/**: UI components
    - **action-bar/**: Action bar components
    - **background/**: Background image components
    - **bottom-bar/**: Bottom bar components
    - **clock/**: Clock components
    - **sensors/**: Sensor components
    - **ui-elements/**: Shared UI elements
  - **providers/**: Data providers
    - **image/**: Image source providers
    - **weather/**: Weather data providers
    - **transportation/**: Transportation data providers
  - **services/**: Services and APIs
    - **ha-api/**: Home Assistant API communication
    - **localization/**: Translations and localization
    - **messaging/**: Internal component communication
  - **utils/**: Utility functions and helpers
    - **date-time/**: Date and time utilities
    - **dom/**: DOM manipulation utilities
    - **logger/**: Logging utilities
  - **editors/**: Configuration editors
    - **components/**: Editor components
    - **validators/**: Configuration validators
- **dist/**: Compiled output
- **tests/**: Test files
- **docs/**: Documentation

## Development Workflow

### Setup
1. Clone the repository
2. Install dependencies: `npm install`

### Development
1. Start development server: `npm run watch`
2. Make changes to the source code
3. Test your changes in Home Assistant

### Building
1. Build the project: `npm run build`
2. The output will be in the `dist/` directory

### Type Checking
1. Run type checking: `npm run type-check`

## Testing
1. Write tests in the `tests/` directory using Jest
2. Run tests: `npm test`
3. Tests should follow the pattern `*.test.ts`

## Best Practices

### Services
- **ha-api**: Use for all communication with Home Assistant
- **localization**: Use for translations and language-specific formatting
- **messaging**: Use for internal communication between components

### Code Organization
- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for configuration objects
- Follow the component-based architecture
- Place core logic and types in the `core/` directory
- Use the appropriate provider directory for data sources
- Implement services in the `services/` directory
- Keep related functionality together in the directory structure

### TypeScript
- Use strict type checking
- Define interfaces for all data structures
- Use type annotations for function parameters and return values

### Component Development
- Extend LitElement for new components
- Use decorators for properties
- Follow the existing component patterns

### Testing
- Write unit tests for all new functionality
- Test edge cases and error conditions
- Mock external dependencies

### Performance
- Minimize DOM operations
- Use efficient data structures
- Avoid unnecessary re-renders

### Commits and Pull Requests
- Write clear commit messages
- Keep pull requests focused on a single feature or bug fix
- Update documentation when changing functionality
