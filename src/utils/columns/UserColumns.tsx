import { type MRT_ColumnDef } from 'material-react-table';
import { Box } from '@mui/material';
import { UserDetailData } from '@/types/user/UserTypes';

// 유저 화면 테이블 컬럼
export const userTableColumns: MRT_ColumnDef<UserDetailData>[] = [
    {
        accessorKey: 'id',
        header: '사용자 ID',
        size: 100,
    },
    {
        accessorKey: 'name',
        header: '사용자명',
        size: 120,
    },
    {
        accessorKey: 'job_rank',
        header: '직급',
        size: 100,
    },
    {
        accessorKey: 'position',
        header: '직책',
        size: 100,
    },
    {
        accessorKey: 'email',
        header: '이메일',
        size: 200,
    },
    {
        accessorKey: 'active',
        header: '활성 상태',
        size: 80,
        Cell: ({ cell }) => (
            <Box
                component="span"
                sx={(theme) => ({
                    backgroundColor: cell.getValue<boolean>()
                        ? theme.palette.success.dark
                        : theme.palette.error.dark,
                    borderRadius: '0.25rem',
                    color: '#fff',
                    maxWidth: '9ch',
                    p: '0.25rem',
                    display: 'inline-block',
                    textAlign: 'center',
                    width: '50px'
                })}
            >
                {cell.getValue<boolean>() ? '활성' : '비활성'}
            </Box>
        ),
    },
];

