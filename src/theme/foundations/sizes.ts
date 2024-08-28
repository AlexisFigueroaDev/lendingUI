import { ICustomTheme } from 'native-base';

/**
 *  Scale sizes based on NativeBase's theme
 */
export const scaleSizes = {
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '16': 64,
  '20': 80,
  '24': 96,
  '32': 128,
  '40': 160,
  '48': 192,
  '56': 224,
  '64': 256,
  '72': 288,
  '80': 320,
  '96': 384,
};

type SizesToExcludeFromTheme =
  | '0'
  | '3xs'
  | '2xs'
  | '2xl'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

type ThemeNumericSizes<
  T extends ICustomTheme['sizes'] = ICustomTheme['sizes'],
> = Exclude<
  {
    [K in keyof T]: T[K] extends number ? K : never;
  }[keyof T],
  SizesToExcludeFromTheme
>;

export type InheritNumericSizes = ThemeNumericSizes;

export type NumericScaleSizes = keyof typeof scaleSizes;
