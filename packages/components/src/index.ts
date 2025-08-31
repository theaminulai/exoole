/**
 * Exoole Components Package
 * 
 * This package provides reusable UI components for the Exoole page builder.
 * Components follow WordPress/Gutenberg design patterns and are built with
 * accessibility and performance in mind.
 * 
 * @package @exoole/components
 */
export { default as Button } from './button';
// export { default as Icon } from './icon';
// export { default as Panel } from './panel';

// Export types
export type { ButtonProps } from './button';
// export type { IconProps } from './icon';
// export type { PanelProps } from './panel';

// Ensure this module is not tree-shaken by adding a side effect
console.log('Exoole Components loaded');

