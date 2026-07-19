# Using Webpack Bundle Analyzer

This project includes webpack-bundle-analyzer to help visualize and analyze the bundle size. This tool is useful for identifying large dependencies and optimizing the bundle size.

## Running the Analyzer

To run the webpack-bundle-analyzer, use the following command:

```bash
npm run analyze
```

This will build the project and open a browser window with a visual representation of the bundle size.

## Interpreting the Results

The analyzer provides a treemap visualization where:
- Each rectangle represents a module
- The size of the rectangle represents the size of the module
- The color represents the type of module (e.g., your code, node_modules, etc.)

## Common Optimization Strategies

Based on the analyzer results, you can implement the following optimizations:

1. **Code Splitting**: Lazy load components that aren't needed immediately
   ```typescript
   // Instead of:
   import { HeavyComponent } from './heavy-component';
   
   // Use:
   const HeavyComponent = () => import('./heavy-component');
   ```

2. **Tree Shaking**: Import only what you need
   ```typescript
   // Instead of:
   import * as utils from './utils';
   
   // Use:
   import { specificFunction } from './utils';
   ```

3. **Minification**: Ensure your webpack configuration has proper minification settings

4. **Remove Unused Dependencies**: Identify and remove unused dependencies from your project

## Addressing the Current Bundle Size Issue

As of 3.0.0-beta1 the bundle is ~301 KiB (the zone layout editor bundles SortableJS,
~40 KiB minified — an accepted trade-off for touch-capable drag & drop). The
recommended webpack limit is 244 KiB. The primary candidates for optimization are:

1. **Editor Component**: The `wall-clock-card-editor.ts` file is very large (2192 lines) and is only needed when editing the card in the Lovelace UI, not during normal operation.

2. **ha-selector Components**: These components are likely only needed for the editor interface.

Use the webpack-bundle-analyzer to confirm these findings and implement the suggested optimizations.