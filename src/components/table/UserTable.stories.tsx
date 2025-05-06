import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UserTable from './UserTable'; 
import { userTableColumns } from '@/utils/columns/UserColumns'; 
import { UserDetailData } from '@/types/user/UserTypes';



const mockUsers: UserDetailData[] = [
    {
      seq_no: '001', id: 'user_1', name: 'Lolo', job_rank: '팀장', position: '개발팀', email: 'lolo@example.com', active: true, ip_address: '',
      join_date: ''},
    { seq_no: '002', id: 'user_2', name: 'Pepe', job_rank: '대리', position: '기획팀', email: 'pepe@example.com', active: true,  ip_address: '',
      join_date: ''},
    { seq_no: '003', id: 'user_3', name: 'Coco', job_rank: '사원', position: '개발팀', email: 'coco@example.com', active: false,  ip_address: '',
      join_date: ''},
    { seq_no: '004', id: 'user_4', name: 'Toto', job_rank: '과장', position: '디자인팀', email: 'toto@example.com', active: true,  ip_address: '',
      join_date: '' },
    { seq_no: '005', id: 'user_5', name: 'Mimi', job_rank: '사원', position: '마케팅팀', email: 'mimi@example.com', active: true,  ip_address: '',
      join_date: ''},
];


const theme = createTheme();
const meta: Meta<typeof UserTable> = {
  title: 'Components/Users/UserTable',
  component: UserTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: false },
    users: { control: 'object' },
    isLoading: { control: 'boolean' },
    error: { control: 'text' },
    totalCount: { control: 'number' },
    pageIndex: { control: 'number' },
    pageSize: { control: 'number' },
    onPaginationChange: { action: 'paginationChanged' },
    onShowDetails: { action: 'showDetails' },
    onShowEdit: { action: 'showEdit' },
    onShowDelete: { action: 'showDelete' },
  },
  args: {
    columns: userTableColumns,
    isLoading: false,
    error: null,
    pageIndex: 1,
    pageSize: 10,
    onPaginationChange: action('onPaginationChange'),
    onShowDetails: action('onShowDetails'),
    onShowEdit: action('onShowEdit'),
    onShowDelete: action('onShowDelete'),
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
    users: mockUsers.slice(0, 5),
    totalCount: mockUsers.length,
    pageSize: 5,
  },
};

export const Loading: Story = {
  args: {
    users: [],
    isLoading: true,
    totalCount: 0,
  },
};

export const Error: Story = {
  args: {
    users: [],
    error: '데이터를 불러오는 중 오류가 발생했습니다',
    totalCount: 0,
  },
};

export const Empty: Story = {
  args: {
    users: [],
    totalCount: 0,
    isLoading: false,
    error: null,
  },
};

export const WithPagination: Story = {
    args: {
        users: mockUsers.slice(0, 10),
        totalCount: 35,
        pageIndex: 2,
        pageSize: 10,
    }
}
