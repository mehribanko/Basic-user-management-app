import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'; 

import UserDetailsView from './UserDetailView';
import type { UserDetailData } from '@/types/user/UserTypes'; 

const mockUserDetailActive: UserDetailData = {
    seq_no: '001',
    id: 'user_1',
    name: 'Mehri',
    job_rank: '팀장',
    position: '개발팀 리더',
    email: 'mehri@example.com',
    ip_address: '192.168.1.100',
    active: true,
    join_date: '2024-08-15',
};

const mockUserDetailInactive: UserDetailData = {
    seq_no: '002',
    id: 'user_3',
    name: 'Guli',
    job_rank: '사원',
    position: '주니어 개발자',
    email: 'gulie@example.com',
    ip_address: '10.0.0.55',
    active: false,
    join_date: '2024-01-20',
};

const theme = createTheme();

const meta: Meta<typeof UserDetailsView> = {
  title: 'Components/Users/UserDetailsView',
  component: UserDetailsView,
  parameters: {
    layout: 'padded', 
  },
  tags: ['autodocs'],
  argTypes: {
    user: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1, maxWidth: '600px' }}>
             <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveUser: Story = {
  args: {
    user: mockUserDetailActive,
  },
};

export const InactiveUser: Story = {
  args: {
    user: mockUserDetailInactive,
  },
};

export const MissingData: Story = {
    args: {
        user: {
            ...mockUserDetailActive,
            job_rank: null, 
            position: undefined,
        }
    }
}
