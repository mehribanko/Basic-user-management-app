import React, { JSX } from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});


const withProviders = (Story: React.ComponentType): JSX.Element => {
 
  const StoryComponent = Story as any;
  
  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(
      ThemeProvider,
      { theme },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(CssBaseline, null),
        React.createElement(StoryComponent, null)
      )
    )
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: /^on[A-Z].*/ },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withProviders],
  loaders: [mswLoader],
};

export default preview;