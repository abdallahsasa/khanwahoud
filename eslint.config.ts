import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import typescript from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    ...typescript.configs.recommended,
    {
        ...react.configs.flat.recommended,
        ...react.configs.flat['jsx-runtime'], // Required for React 17+
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
            'no-unused-vars': 'warn', // Add warning for unused variables
            'prefer-const': 'off', // Disable the prefer-const rule
            '@typescript-eslint/no-unsafe-assignment': 'off', // Disable 'page' is of type 'unknown' warning
            '@typescript-eslint/no-unsafe-member-access': 'off', // Disable related 'page.default' warnings
            '@typescript-eslint/no-explicit-any': 'off', // Disable var is of type 'unknown' warning
            '@typescript-eslint/no-unused-vars': 'off', // Disable var is declared but never read warning
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        ignores: ['vendor', 'node_modules', 'public', 'bootstrap/ssr', 'tailwind.config.js'],
    },
    prettier, // Turn off all rules that might conflict with Prettier
];
