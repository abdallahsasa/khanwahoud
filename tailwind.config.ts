import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./resources/**/*.{js,ts,jsx,tsx,blade.php}', './pages/**/*.{js,ts,jsx,tsx,blade.php}', './components/**/*.{js,ts,jsx,tsx,blade.php}'],
    theme: {
        extend: {
            spacing: {
                '26': '6.5rem',
            },
            colors: {
                primary: {
                    50: '#fef3f1',
                    100: '#fde6e2',
                    200: '#fcc9c0',
                    300: '#f9a393',
                    400: '#f47257',
                    500: '#e94d2e',
                    600: '#c93a1e',
                    700: '#771709',
                    800: '#54000E',
                    900: '#450010',
                    950: '#280008',
                },
                secondary: {
                    50: '#FFFFF5',
                    100: '#fdfbf3',
                    200: '#f5f0e1',
                    300: '#EAE2CC',
                    400: '#d4c9a8',
                    500: '#bfb08a',
                    600: '#a6946a',
                    700: '#8b7752',
                    800: '#725f42',
                    900: '#5e4d38',
                    950: '#33291c',
                },
                accent: {
                    50: '#f2f7f5',
                    100: '#dff0ea',
                    200: '#c0e0d5',
                    300: '#93cab8',
                    400: '#60ad96',
                    500: '#3e917a',
                    600: '#2d7562',
                    700: '#265e50',
                    800: '#214b41',
                    900: '#00281D',
                    950: '#000000',
                },
            },
            fontFamily: {
                serif: ['Philosopher', 'Cormorant Garamond', 'Thmanyah Serif Display', 'El Messiri', ...fontFamily.serif],
                sans: ['Logam', 'Montserrat', 'Israr-Syria', 'Noto Kufi Arabic', ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
