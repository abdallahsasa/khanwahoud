import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/**/*.{js,ts,jsx,tsx,blade.php}', './pages/**/*.{js,ts,jsx,tsx,blade.php}', './components/**/*.{js,ts,jsx,tsx,blade.php}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fdf4f2',
                    100: '#fbe8e4',
                    200: '#f7d1c9',
                    300: '#f1b0a2',
                    400: '#e88471',
                    500: '#dc5c45',
                    600: '#c94530',
                    700: '#A63A2D',
                    800: '#8c3327',
                    900: '#752e24',
                    950: '#3f150f',
                },
                secondary: {
                    50: '#f8f7f4',
                    100: '#efeae1',
                    200: '#e1d5c3',
                    300: '#D4C4AB',
                    400: '#c7b193',
                    500: '#b89c7a',
                    600: '#a68861',
                    700: '#8b6e4e',
                    800: '#725a42',
                    900: '#5e4a38',
                    950: '#322618',
                },
                accent: {
                    50: '#f6f6f6',
                    100: '#e7e7e7',
                    200: '#d1d1d1',
                    300: '#b0b0b0',
                    400: '#888888',
                    500: '#6d6d6d',
                    600: '#5d5d5d',
                    700: '#4f4f4f',
                    800: '#454545',
                    900: '#3d3d3d',
                    950: '#262626',
                },
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'Thmanyah Serif Display', 'El Messiri', ...fontFamily.serif],
                sans: ['Montserrat', 'Israr-Syria', 'Noto Kufi Arabic', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
