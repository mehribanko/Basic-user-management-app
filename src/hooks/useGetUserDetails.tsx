import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchUserDetails } from '@/services/userService';
import type { UserDetailData } from '@/types/user/UserTypes'; 
import { userQueryKeys } from '@/queries/user/userQueries'; 


export const useGetUserDetails = (userId: string | null | undefined): UseQueryResult<UserDetailData, Error> => {
    return useQuery<UserDetailData, Error>({
        queryKey: userQueryKeys.detail(userId!),
        queryFn: () => fetchUserDetails(userId!),
        enabled: !!userId,
    });
};
