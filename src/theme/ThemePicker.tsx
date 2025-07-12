import React from 'react';
import { useTheme } from './ThemeProvider';
import { ColorTheme, ThemeMode } from './types';

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

const MODES: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export const ThemePicker: React.FC = () => {
  const { color, mode, setColor, setMode } = useTheme();

  return (
    <div className="flex flex-col gap-2 items-center p-4">
      <div className="flex gap-2">
        {COLOR_THEMES.map(theme => (
          <button
            key={theme.value}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
              color === theme.value ? 'border-primary ring-2 ring-primary' : 'border-muted'
            }`}
            style={{ background: theme.color }}
            aria-label={theme.label}
            onClick={() => setColor(theme.value)}
          >
            {color === theme.value && <span className="text-xs text-white font-bold">✓</span>}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {MODES.map(m => (
          <button
            key={m.value}
            className={`px-3 py-1 rounded border text-sm font-medium transition-all ${
              mode === m.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground border-muted'
            }`}
            onClick={() => setMode(m.value)}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemePicker;
