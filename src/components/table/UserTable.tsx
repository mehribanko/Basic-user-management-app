import React from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_PaginationState,
} from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material'; 
import { Edit, Delete, Visibility } from '@mui/icons-material'; 
import { OnChangeFn } from '@tanstack/react-table';
import { UserDetailData } from '@/types/user/UserTypes';


interface UserTableProps {
    columns: MRT_ColumnDef<UserDetailData>[];
    users: UserDetailData[];
    isLoading: boolean;
    error: string | null;
    totalCount: number;
    pageIndex: number; 
    pageSize: number;
    onPaginationChange: OnChangeFn<MRT_PaginationState>;
    onShowDetails: (user: UserDetailData) => void;
    onShowEdit: (user: UserDetailData) => void;
    onShowDelete: (user: UserDetailData) => void;
}

const UserTable: React.FC<UserTableProps> = ({
    columns,
    users,
    isLoading,
    error,
    totalCount,
    pageIndex,
    pageSize,
    onPaginationChange,
    onShowDetails,
    onShowEdit,
    onShowDelete,
}) => {

    const table = useMaterialReactTable({
        columns,
        data: users, 
        manualPagination: true, 
        enableRowActions: true, 
        enableSorting: true, 
        enableFilters: false, 
        rowCount: totalCount, 
        state: {
            isLoading: isLoading, 
            showAlertBanner: error !== null,
            showProgressBars: isLoading, 
            pagination: {
                pageIndex: pageIndex - 1, 
                pageSize: pageSize,
            },
        },

        positionPagination: 'top',
        enableBottomToolbar: false, 
    
        muiPaginationProps: {
            rowsPerPageOptions: [10, 30, 50],
            showRowsPerPage: true,
        },

        enableTopToolbar: true,
        onPaginationChange: onPaginationChange,

        muiToolbarAlertBannerProps: error
            ? {
                  color: 'error',
                  children: error,
              }
            : undefined,

        // 유저 정보 조회, 수정, 삭제 버튼 
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Tooltip title="상세 보기">
                    <IconButton color="primary" size="small" onClick={() => onShowDetails(row.original)}>
                        <Visibility />
                    </IconButton>
                </Tooltip>
                <Tooltip title="정보 수정">
                    <IconButton color="secondary" size="small" onClick={() => onShowEdit(row.original)}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="사용자 삭제">
                    <IconButton color="error" size="small" onClick={() => onShowDelete(row.original)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </Box>
        ),

        
        paginationDisplayMode: 'pages', 
    
    });
 
    return <MaterialReactTable table={table} />;
};

export default UserTable;