# Development

## Prerequisites

- Node.js
- npm

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the component
4. The built component will be in the `dist` folder

## Development Commands

- `npm run build` - Build the component
- `npm run watch` - Watch for changes and rebuild automatically
- `npm run type-check` - Run TypeScript type checking without building
- `npm test` - Run Jest tests

## Testing

This project uses Jest for testing. The test files are in the `tests` directory with `.test.ts` extension. The Jest configuration is in `jest.config.js`.

To run the tests:

```bash
npm test
```

The tests cover various aspects of the code, including:
- Date and time formatting functions
- Localization functionality
- Basic component functionality

## TypeScript

This project is written in TypeScript for improved type safety and developer experience. The source code is in the `src` directory with `.ts` extension. The TypeScript configuration is in `tsconfig.json`.