import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:@next/next/recommended'),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.extends('plugin:next-intl/recommended'),
  {
    rules: {
      'no-unused-vars': [
        'warn',
        { args: 'after-used', ignoreRestSiblings: true },
      ],
      'no-console': ['warn', { allow: ['error'] }],
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'max-lines': [
        'warn',
        { max: 700, skipBlankLines: true, skipComments: true },
      ],
      'max-depth': ['warn', 4],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

export default eslintConfig;
