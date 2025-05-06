import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn, waitFor } from '@storybook/test';
import SearchBar from './SearchBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const meta: Meta<typeof SearchBar> = { 
  title: 'Components/Users/SearchBar', 
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'searched' },
    onReset: { action: 'reset' }, 
  },

  args: {
    onSearch: fn(),
    onReset: fn(),
  },

  decorators: [
     (Story) => (
       <ThemeProvider theme={theme}>
         <CssBaseline />
         <Story />
       </ThemeProvider>
     ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
  
    const nameInput = await canvas.findByLabelText(/^사용자명$/i);
    await userEvent.type(nameInput, 'Test Search Name', { delay: 50 });
  
    const statusSelect = await canvas.findByLabelText(/^활성상태$/i); 
    await userEvent.selectOptions(statusSelect, 'true');
  
    const searchButton = await canvas.findByRole('button', { name: /^조회$/i });
    await userEvent.click(searchButton);
  
    await expect(args.onSearch).toHaveBeenCalledTimes(1);
    await expect(args.onSearch).toHaveBeenCalledWith({
      id: undefined,
      name: 'Test Search Name',
      email: undefined,
      active: true,
    });
  
    const resetButton = await canvas.findByRole('button', { name: /^초기화$/i });
    await userEvent.click(resetButton);
  
    await expect(args.onReset).toHaveBeenCalledTimes(1);
 
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
    });
  }
};


export const InContainer: Story = {
    args: {
      onSearch: fn(),
      onReset: fn(),
    },
    render: (args) => (
      <Box sx={{ border: '1px dashed grey', p: 2, maxWidth: '800px' }}>
        <SearchBar {...args} />
      </Box>
    )
  };
  