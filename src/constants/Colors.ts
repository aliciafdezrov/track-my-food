/**
 * Sistema de tokens de color para la aplicación
 * Los colores están organizados por categorías y soportan modo claro y oscuro
 */

// Colores base
const primary = {
  light: '#0a7ea4',
  dark: '#0a7ea4',
};

const secondary = {
  light: '#5856D6',
  dark: '#5856D6',
};

const accent = {
  light: '#007AFF',
  dark: '#007AFF',
};

// Colores de texto
const text = {
  light: '#11181C',
  dark: '#ECEDEE',
};

const textSecondary = {
  light: '#687076',
  dark: '#9BA1A6',
};

// Colores de fondo
const background = {
  light: '#FFFFFF',
  dark: '#151718',
};

const backgroundSecondary = {
  light: '#F8F9FA',
  dark: '#1C1F20',
};

// Colores de estado
const success = {
  light: '#2E7D32',
  dark: '#4CAF50',
};

const error = {
  light: '#D32F2F',
  dark: '#EF5350',
};

const warning = {
  light: '#ED6C02',
  dark: '#FFA726',
};

const info = {
  light: '#0288D1',
  dark: '#29B6F6',
};

// Colores de UI
const border = {
  light: '#E1E3E5',
  dark: '#2D2F30',
};

const divider = {
  light: '#E1E3E5',
  dark: '#2D2F30',
};

const overlay = {
  light: 'rgba(0, 0, 0, 0.5)',
  dark: 'rgba(0, 0, 0, 0.7)',
};

// Exportar todos los colores organizados por tema
export const Colors = {
  light: {
    // Colores base
    primary: primary.light,
    secondary: secondary.light,
    accent: accent.light,

    // Colores de texto
    text: text.light,
    textSecondary: textSecondary.light,

    // Colores de fondo
    background: background.light,
    backgroundSecondary: backgroundSecondary.light,

    // Colores de estado
    success: success.light,
    error: error.light,
    warning: warning.light,
    info: info.light,

    // Colores de UI
    border: border.light,
    divider: divider.light,
    overlay: overlay.light,

    // Colores específicos de la app
    tint: primary.light,
    icon: textSecondary.light,
    tabIconDefault: textSecondary.light,
    tabIconSelected: primary.light,
  },
  dark: {
    // Colores base
    primary: primary.dark,
    secondary: secondary.dark,
    accent: accent.dark,

    // Colores de texto
    text: text.dark,
    textSecondary: textSecondary.dark,

    // Colores de fondo
    background: background.dark,
    backgroundSecondary: backgroundSecondary.dark,

    // Colores de estado
    success: success.dark,
    error: error.dark,
    warning: warning.dark,
    info: info.dark,

    // Colores de UI
    border: border.dark,
    divider: divider.dark,
    overlay: overlay.dark,

    // Colores específicos de la app
    tint: primary.dark,
    icon: textSecondary.dark,
    tabIconDefault: textSecondary.dark,
    tabIconSelected: primary.dark,
  },
};
