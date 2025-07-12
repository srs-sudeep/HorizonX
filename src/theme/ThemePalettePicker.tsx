import React from 'react';
import { useTheme } from './ThemeProvider';
import { ColorTheme, ThemeMode } from './types';
import { Popover, PopoverContent, PopoverTrigger, Button } from '@/components';
import { Palette } from 'lucide-react';

const COLOR_THEMES: { value: ColorTheme; label: string; color: string }[] = [
  { value: 'blue', label: 'Blue', color: '#3b82f6' },
  { value: 'green', label: 'Green', color: '#22c55e' },
  { value: 'red', label: 'Red', color: '#ef4444' },
  { value: 'purple', label: 'Purple', color: '#a78bfa' },
  { value: 'orange', label: 'Orange', color: '#f59e42' },
  { value: 'teal', label: 'Teal', color: '#14b8a6' },
  { value: 'pink', label: 'Pink', color: '#ec4899' },
  { value: 'indigo', label: 'Indigo', color: '#6366f1' },
];

const MODES: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <span>☀️</span> },
  { value: 'dark', label: 'Dark', icon: <span>🌙</span> },
];

export const ThemePalettePicker: React.FC = () => {
  const { color, mode, setColor, setMode } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Choose theme" className="relative">
          <Palette className="h-5 w-5" />
          <span
            className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white"
            style={{ background: COLOR_THEMES.find(t => t.value === color)?.color || '#3b82f6' }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-4 flex flex-col items-center gap-3" align="end">
        <div className="font-semibold mb-1 text-sm">Choose Theme</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {COLOR_THEMES.map(theme => (
            <button
              key={theme.value}
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                color === theme.value ? 'border-primary ring-2 ring-primary' : 'border-muted'
              }`}
              style={{ background: theme.color }}
              aria-label={theme.label}
              title={theme.label}
              onClick={() => setColor(theme.value)}
            >
              {color === theme.value && <span className="text-xs text-white font-bold">✓</span>}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2 items-center">
          <span className="text-xs font-medium">Mode:</span>
          {MODES.map(m => (
            <button
              key={m.value}
              className={`px-2 py-1 rounded text-xs font-medium transition-all border ${
                mode === m.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted text-muted-foreground border-muted'
              }`}
              onClick={() => setMode(m.value)}
              aria-label={m.label}
            >
              {m.icon}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemePalettePicker;
