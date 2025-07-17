import React from 'react';
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, H3, P, Small } from '@/components';
import { Settings, Palette, Type } from 'lucide-react';
import { useTheme } from '@/theme/ThemeProvider';
import { ColorTheme, ThemeMode } from '@/theme/types';
import { useTypographyStore, FONT_FAMILIES, FONT_SIZES, LINE_HEIGHTS } from '@/store';

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

export const SettingsSidebar: React.FC = () => {
  const { color, mode, setColor, setMode } = useTheme();
  const { 
    fontFamily, 
    fontSize, 
    lineHeight, 
    setFontFamily, 
    setFontSize, 
    setLineHeight, 
    resetTypography 
  } = useTypographyStore();
  const selectedFont = FONT_FAMILIES.find(font => font.value === fontFamily);
  const fontSizeClass = `text-${fontSize}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Settings className="h-5 w-5 text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={`w-[400px] sm:w-[540px] ${selectedFont?.class || ''} ${fontSizeClass}`} data-component="settings-sidebar">
        <SheetHeader className="flex items-center justify-between border-b pb-4">
          <SheetTitle className={`text-xl font-semibold ${selectedFont?.class || ''}`}>Settings</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 h-[calc(100vh-120px)] overflow-y-auto pr-2 space-y-6">
          {/* Color Palette Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <H3 className="text-lg font-medium">Color Palette</H3>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <P className="font-medium text-sm">Theme Color</P>
                  <Small className="text-muted-foreground text-xs">
                    {COLOR_THEMES.find(t => t.value === color)?.label}
                  </Small>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_THEMES.map((theme, idx) => (
                    <button
                      key={theme.value}
                      className={`relative w-10 h-10 rounded-md border-2 flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary ${
                        color === theme.value 
                          ? 'border-primary ring-2 ring-primary' 
                          : 'border-muted hover:border-primary/50'
                      } ${(idx === 0 || idx === 4) ? 'ml-2' : ''}`}
                      style={{ background: theme.color }}
                      aria-label={theme.label}
                      title={theme.label}
                      onClick={() => setColor(theme.value)}
                    >
                      {color === theme.value && (
                        <span className="text-white font-bold text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <P className="font-medium text-sm mb-2">Theme Mode</P>
                <div className="flex gap-2">
                  {MODES.map(m => (
                    <button
                      key={m.value}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all border ${
                        mode === m.value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-muted text-muted-foreground border-muted hover:bg-muted/80'
                      }`}
                      onClick={() => setMode(m.value)}
                      aria-label={m.label}
                    >
                      {m.icon}
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography Settings Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                <H3 className="text-lg font-medium">Typography</H3>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetTypography}
                className="text-xs"
              >
                Reset All
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Font Family - Two Perfect Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <P className="font-medium text-sm">Font Family</P>
                  <Small className="text-muted-foreground text-xs">Choose your preferred font</Small>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {FONT_FAMILIES.map(font => (
                    <button
                      key={font.value}
                      onClick={() => setFontFamily(font.value)}
                      className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                        fontFamily === font.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-muted hover:border-primary/30'
                      }`}
                    >
                      <div className="text-center space-y-2">
                        <div className={`text-2xl font-bold ${font.class}`}>
                          {font.preview}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{font.label}</div>
                          <Small className="text-muted-foreground text-xs">{font.description}</Small>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size - Compact Slider-like */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <P className="font-medium text-sm">Font Size</P>
                  <Small className="text-muted-foreground text-xs">{fontSize.toUpperCase()}</Small>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {FONT_SIZES.map(size => (
                    <button
                      key={size.value}
                      onClick={() => setFontSize(size.value)}
                      className={`p-2 rounded-md border transition-all hover:scale-105 ${
                        fontSize === size.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-muted hover:border-primary/30'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-xs font-medium">{size.preview}</div>
                        <Small className="text-muted-foreground text-xs">{size.value}</Small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <P className="font-medium text-sm">Line Height</P>
                <div className="flex gap-2">
                  {LINE_HEIGHTS.map(lineHeightOption => (
                    <button
                      key={lineHeightOption.value}
                      onClick={() => setLineHeight(lineHeightOption.value)}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        lineHeight === lineHeightOption.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-muted hover:border-primary/30'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium">{lineHeightOption.label}</div>
                        <Small className="text-muted-foreground text-xs">{lineHeightOption.description}</Small>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 