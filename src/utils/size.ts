import { Size } from '../core/types';

/**
 * Size definitions for different components
 */
export interface SizeDefinitions {
  // Clock component sizes
  clockSize: {
    large: string;
    medium: string;
    small: string;
  };
  dateSize: {
    large: string;
    medium: string;
    small: string;
  };
  
  // Sensor and weather component sizes
  labelSize: {
    large: string;
    medium: string;
    small: string;
  };
  valueSize: {
    large: string;
    medium: string;
    small: string;
  };
  
  // Action bar component sizes
  iconSize: {
    large: string;
    medium: string;
    small: string;
  };
  buttonSize: {
    large: string;
    medium: string;
    small: string;
  };
  
  // Weather forecast sizes
  forecastTempWidth: {
    large: string;
    medium: string;
    small: string;
  };
}

/**
 * Default size definitions for all components
 */
export const DEFAULT_SIZES: SizeDefinitions = {
  // Clock component sizes
  clockSize: {
    large: '18rem',
    medium: '16rem',
    small: '14rem',
  },
  dateSize: {
    large: '6rem',
    medium: '6rem',
    small: '4rem',
  },
  
  // Sensor and weather component sizes
  labelSize: {
    large: '1.8rem',
    medium: '1.2rem',
    small: '1.0rem',
  },
  valueSize: {
    large: '3rem',
    medium: '2rem',
    small: '1.5rem',
  },
  
  // Action bar component sizes
  iconSize: {
    large: '84px',
    medium: '72px',
    small: '60px',
  },
  buttonSize: {
    large: '168px',
    medium: '144px',
    small: '120px',
  },
  
  // Weather forecast sizes
  forecastTempWidth: {
    large: '120px',
    medium: '80px',
    small: '70px',
  },
};

/**
 * Get the size value based on the current size setting
 * 
 * @param size The current size setting
 * @param customSize The custom size value (if any)
 * @param sizeType The type of size to get (e.g., 'clockSize', 'labelSize')
 * @returns The appropriate size value as a string
 */
export function getSizeValue(
  size: Size | undefined,
  customSize: string | undefined,
  sizeType: keyof SizeDefinitions
): string {
  // If custom size is provided and size is set to Custom, return the custom size
  if (size === Size.Custom && customSize) {
    return customSize;
  }
  
  // Get the size definitions for the requested type
  const sizeDefinitions = DEFAULT_SIZES[sizeType];
  
  // Return the appropriate size based on the size enum
  if (size === Size.Large) {
    return sizeDefinitions.large;
  } else if (size === Size.Small) {
    return sizeDefinitions.small;
  } else {
    // Default to medium size
    return sizeDefinitions.medium;
  }
}

/**
 * Special function for button size calculation which depends on icon size
 * 
 * @param size The current size setting
 * @param iconSize The custom icon size (if any)
 * @returns The appropriate button size value as a string
 */
export function getButtonSizeValue(
  size: Size | undefined,
  iconSize: string | undefined
): string {
  // Special case for custom size with icon size
  if (size === Size.Custom && iconSize) {
    // Parse the icon size to get the numeric value
    const iconSizeValue = parseInt(iconSize);
    if (!isNaN(iconSizeValue)) {
      // Make the button size twice the icon size
      return `${iconSizeValue * 2}px`;
    }
    return DEFAULT_SIZES.buttonSize.medium; // Default if parsing fails
  }
  
  // Use the standard size value function for non-custom sizes
  return getSizeValue(size, undefined, 'buttonSize');
}