import { Theme } from './symbols';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background': '#f4f4f5',
    '--on-background': '#000',
    '--primary': '#1976d2',
    '--on-primary': '#000',
    '--border-shadow':'rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px',
    '--inset-shadow':'inset 30px 30px 60px #d2d2d3,inset -30px -30px 60px #ffffff'
  }
};
