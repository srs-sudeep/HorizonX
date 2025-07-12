import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontFamily = 'inter' | 'poppins';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

export interface TypographySettings {
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineHeight: 'tight' | 'normal';
}

interface TypographyStore extends TypographySettings {
  setFontFamily: (fontFamily: FontFamily) => void;
  setFontSize: (fontSize: FontSize) => void;
  setLineHeight: (lineHeight: 'tight' | 'normal') => void;
  resetTypography: () => void;
}

const defaultTypography: TypographySettings = {
  fontFamily: 'inter',
  fontSize: 'base',
  lineHeight: 'normal',
};

export const useTypographyStore = create<TypographyStore>()(
  persist(
    (set) => ({
      ...defaultTypography,
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      resetTypography: () => set(defaultTypography),
    }),
    {
      name: 'typography-settings',
    }
  )
);

// Font family configurations - Two perfect contrasting fonts
export const FONT_FAMILIES: { value: FontFamily; label: string; preview: string; class: string; description: string }[] = [
  { 
    value: 'inter', 
    label: 'Inter', 
    preview: 'Aa', 
    class: 'font-inter',
    description: 'Clean, modern sans-serif'
  },
  { 
    value: 'poppins', 
    label: 'Poppins', 
    preview: 'Aa', 
    class: 'font-poppins',
    description: 'Geometric, friendly sans-serif'
  },
];

// Font size configurations
export const FONT_SIZES: { value: FontSize; label: string; preview: string }[] = [
  { value: 'xs', label: 'Extra Small', preview: '12px' },
  { value: 'sm', label: 'Small', preview: '14px' },
  { value: 'base', label: 'Base', preview: '16px' },
  { value: 'lg', label: 'Large', preview: '18px' },
  { value: 'xl', label: 'Extra Large', preview: '20px' },
  { value: '2xl', label: '2XL', preview: '24px' }
];

// Line height configurations
export const LINE_HEIGHTS: { value: 'tight' | 'normal'; label: string; description: string }[] = [
  { value: 'tight', label: 'Tight', description: 'Compact spacing' },
  { value: 'normal', label: 'Normal', description: 'Standard spacing' },
];

 