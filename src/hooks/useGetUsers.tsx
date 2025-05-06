import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchUsersList } from '@/services/userService'; 
import type { UserListData } from '@/types/user/UserTypes'; 
import { userQueryKeys } from '@/queries/user/userQueries';

interface UseFetchUsersProps {
    pageIndex: number;
    pageSize: number;
    searchParams: { 
        id?: string;
        name?: string;
        email?: string;
        active?: boolean | '';
    };
}


export const useFetchUsers = ({
    pageIndex,
    pageSize,
    searchParams,
}: UseFetchUsersProps): UseQueryResult<UserListData, Error> => {

    const queryParams = {
        page_index: pageIndex,
        page_size: pageSize,
        ...searchParams,
    };

    return useQuery<UserListData, Error>({
        queryKey: userQueryKeys.lists(queryParams),
        queryFn: () => fetchUsersList(queryParams),
    });
};