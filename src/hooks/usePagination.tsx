
import { useState, useCallback } from 'react';
import { type MRT_PaginationState } from 'material-react-table'; 
import type { OnChangeFn } from '@tanstack/react-table';

export interface PageState {
    pageIndex: number;
    pageSize: number;
}

const defaultPageOptions: PageState = {
    pageIndex: 1,
    pageSize: 10,
};

export const usePagination = (initialState: Partial<PageState> = {}) => {
    const [pagination, setPagination] = useState<PageState>({
        ...defaultPageOptions,
        ...initialState,
    });

    
    const handleMRTPageChange: OnChangeFn<MRT_PaginationState> = useCallback(
        (updaterOrValue) => {
          setPagination(current => {
    
            const oldMRTState: MRT_PaginationState = {
              pageIndex: current.pageIndex - 1,
              pageSize: current.pageSize,
            };
      
            const newMRTState =
              typeof updaterOrValue === 'function'
                ? updaterOrValue(oldMRTState)
                : updaterOrValue;
      
            const newPageIndex = newMRTState.pageIndex + 1;
            const newPageSize = newMRTState.pageSize;
    
            return {
              pageSize: newPageSize,
              pageIndex: current.pageSize !== newPageSize ? 1 : newPageIndex,
            };
          });
        },
        []
      );

  
    const resetPagination = useCallback(() => {
        setPagination(prev => ({ ...prev, pageIndex: 1 })); 
    }, []);


    return {
        pagination,        
        handleMRTPageChange,
        resetPagination,  
    };
};