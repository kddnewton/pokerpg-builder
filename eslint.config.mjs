import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // Configuration for TypeScript and React files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'import': importPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx', '.d.ts'],
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ESLint recommended rules are included via js.configs.recommended

      // TypeScript ESLint rules
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs['recommended-requiring-type-checking'].rules,

      // React rules
      ...reactPlugin.configs.recommended.rules,

      // JSX A11y rules
      ...jsxA11yPlugin.configs.recommended.rules,

      // Import rules
      ...importPlugin.configs.recommended.rules,

      // Custom rule overrides
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      'bin/',
      'docs/',
    ],
  },
];
