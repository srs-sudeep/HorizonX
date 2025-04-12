import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Shape {
    borderRadiusLarge: number;
    borderRadiusXLarge: number;
  }
  
  interface PaletteOptions {
    gradient?: string;
    border?: {
      subtle: string;
    };
  }
  
  interface Palette {
    gradient: string;
    border: {
      subtle: string;
    };
  }
}