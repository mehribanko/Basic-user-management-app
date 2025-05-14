import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/services/userService';
import { CommonResponse } from '@/lib/axiosClient';
import { userQueryKeys } from '@/queries/user/userQueries';
import { UpdateUserData } from '@/types/user/UserTypes';

interface UpdateUserVariables {
    userId: string;
    userData: UpdateUserData;
}

export const useUpdateUser = (): UseMutationResult<
    CommonResponse<any>, 
    Error,              
    UpdateUserVariables 
> => {
    const queryClient = useQueryClient();

    return useMutation<CommonResponse<any>, Error, UpdateUserVariables>({
        mutationFn: ({ userId, userData }) => updateUser(userId, userData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: userQueryKeys.detail(variables.userId) });
            queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
        },

        onError: (error, variables) => {
            console.error('사용자 정보 수정하는데 에러 발생', error.message);

        },

    });
};

