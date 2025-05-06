import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import UserEditModal from './UserUpdateModal';
import type { UserDetailData } from '@/types/user/UserTypes';
import React from 'react';
import { CommonResponse } from '@/lib/axiosClient';


const mockUserDetailUser4: UserDetailData = {
    seq_no: '003', id: 'user_4', name: 'Lolo', job_rank: '과장',
    position: '디자인팀', email: 'lolo@example.com', ip_address: '172.16.10.20',
    active: true, join_date: '2021-05-01',
};
const mockUserDetailUser2: UserDetailData = {
    seq_no: '004', id: 'user_2', name: 'Pepe', job_rank: '대리',
    position: '기획팀', email: 'pepe@example.com', ip_address: '192.168.1.50',
    active: false, join_date: '2023-03-10',
};

const theme = createTheme();
const queryClient = new QueryClient();

const meta: Meta<typeof UserEditModal> = {
  title: 'Components/Users/UserEditModal',
  component: UserEditModal,
  parameters: {
    layout: 'centered',

    msw: {
      handlers: [
       
        http.get('/api/users/user_4', () => {
          const response: CommonResponse<UserDetailData> = {
            isSuccess: true,
            message: 'mock 데이터 응답답 003',
            data: mockUserDetailUser4,
          };
          return HttpResponse.json(response);
        }),
    
        http.get('/api/users/user_2', () => {
     
           const response: CommonResponse<UserDetailData> = {
            isSuccess: true,
            message: 'mock 데이터 응답 004',
            data: mockUserDetailUser2,
          };
          return HttpResponse.json(response);
        }),
     
        http.get('/api/users/user_999', () => {
            const errorResponse: CommonResponse<null> = {
                isSuccess: false,
                message: 'mock 데이터 응답',
                data: null,
            };
            return HttpResponse.json(errorResponse, { status: 404 });
        }),
      ]
    }

  },
  tags: ['autodocs'],
  argTypes: {
    userId: { control: 'text' },
    onClose: { action: 'closed' },
    onSuccess: { action: 'updateSuccess' },
  },
  args: {
    userId: 'user_4',
    onClose: action('onClose'),
    onSuccess: action('onSuccess'),
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
     userId: 'user_4',
  },
  render: (args) => { 
    const [isOpen, setIsOpen] = React.useState(true);
    const handleClose = () => { args.onClose(); setIsOpen(false); };
    const handleSuccess = () => { args.onSuccess(); setIsOpen(false); };
    const handleOpen = () => setIsOpen(true);
    return ( <> {!isOpen && <button onClick={handleOpen}>Open Edit Modal (user_4)</button>} <UserEditModal {...args} userId={isOpen ? args.userId : null} onClose={handleClose} onSuccess={handleSuccess} /> </> );
  }
};

export const EditingAnotherUser: Story = {
   render: (args) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const handleClose = () => { args.onClose(); setIsOpen(false); };
    const handleSuccess = () => { args.onSuccess(); setIsOpen(false); };
    const handleOpen = () => setIsOpen(true);
    return ( <> {!isOpen && <button onClick={handleOpen}>Open Edit Modal (user_2)</button>} <UserEditModal {...args} userId={isOpen ? args.userId : null} onClose={handleClose} onSuccess={handleSuccess} /> </> );
  },
   args: {
      userId: 'user_2',
      onClose: action('onClose'),
      onSuccess: action('onSuccess'),
   }
};

export const UserNotFound: Story = {
   render: (args) => { 
    const [isOpen, setIsOpen] = React.useState(true);
    const handleClose = () => { args.onClose(); setIsOpen(false); };
    const handleSuccess = () => { args.onSuccess(); setIsOpen(false); };
    const handleOpen = () => setIsOpen(true);
    return ( <> {!isOpen && <button onClick={handleOpen}>Open Edit Modal (user_999)</button>} <UserEditModal {...args} userId={isOpen ? args.userId : null} onClose={handleClose} onSuccess={handleSuccess} /> </> );
  },
   args: {
      userId: 'user_999',
      onClose: action('onClose'),
      onSuccess: action('onSuccess'),
   }
};
