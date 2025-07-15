import React, { useEffect } from 'react';
import { useTypographyStore, FONT_FAMILIES } from '@/store';

interface TypographyProviderProps {
  children: React.ReactNode;
}

export const TypographyProvider: React.FC<TypographyProviderProps> = ({ children }) => {
  const { fontFamily, fontSize, lineHeight } = useTypographyStore();

  useEffect(() => {
    // Apply typography settings to the document
    const root = document.documentElement;
    
    // Apply font family
    const selectedFont = FONT_FAMILIES.find(font => font.value === fontFamily);
    if (selectedFont) {
      root.style.setProperty('--typography-font-family', selectedFont.class);
      root.classList.remove(...FONT_FAMILIES.map(font => font.class));
      root.classList.add(selectedFont.class);
      
      // Apply font family to specific components
      const navbar = document.querySelector('[data-component="navbar"]');
      const sidebar = document.querySelector('[data-component="sidebar"]');
      const settingsSidebar = document.querySelector('[data-component="settings-sidebar"]');
      document.body.style.fontFamily = `var(--typography-font-family), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      
      if (navbar) {
        navbar.classList.remove(...FONT_FAMILIES.map(font => font.class));
        navbar.classList.add(selectedFont.class);
      }
      
      if (sidebar) {
        sidebar.classList.remove(...FONT_FAMILIES.map(font => font.class));
        sidebar.classList.add(selectedFont.class);
      }
      
      if (settingsSidebar) {
        settingsSidebar.classList.remove(...FONT_FAMILIES.map(font => font.class));
        settingsSidebar.classList.add(selectedFont.class);
      }

      const notificationCard = document.querySelectorAll('[data-component="notification-card"]');
      notificationCard.forEach(card => {
        card.classList.remove(...FONT_FAMILIES.map(font => font.class));
        card.classList.add(selectedFont.class);
        card.classList.remove(...fontSizeClasses);
        card.classList.add(`text-${fontSize}`);
      });
    }

    // Apply font size with CSS classes for different components
    root.style.setProperty('--font-size', fontSize);
    
    // Remove all font size classes and add the current one
    const fontSizeClasses = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
    root.classList.remove(...fontSizeClasses);
    root.classList.add(`text-${fontSize}`);

    // Apply line height
    root.style.setProperty('--line-height', lineHeight);

    // Apply CSS custom properties for global use
     root.style.setProperty('--typography-font-family', 'Inter');
    root.style.setProperty('--typography-font-size', fontSize);
    root.style.setProperty('--typography-line-height', lineHeight);

    // Apply font size to specific components
    const navbar = document.querySelector('[data-component="navbar"]');
    const sidebar = document.querySelector('[data-component="sidebar"]');
    const settingsSidebar = document.querySelector('[data-component="settings-sidebar"]');
    
    if (navbar) {
      navbar.classList.remove(...fontSizeClasses);
      navbar.classList.add(`text-${fontSize}`);
    }
    
    if (sidebar) {
      sidebar.classList.remove(...fontSizeClasses);
      sidebar.classList.add(`text-${fontSize}`);
    }
    
    if (settingsSidebar) {
      settingsSidebar.classList.remove(...fontSizeClasses);
      settingsSidebar.classList.add(`text-${fontSize}`);
    }

  }, [fontFamily, fontSize, lineHeight]);

  return <>{children}</>;
}; 