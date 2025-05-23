import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials', 
    '@chromatic-com/storybook',
    '@storybook/addon-interactions', 
    'msw-storybook-addon'
  ],

 
  framework: {
    name: '@storybook/nextjs', 
    options: {}, 
  },


  docs: {
    autodocs: 'tag', 
  },


  staticDirs: ['../public'],
};
export default config;
