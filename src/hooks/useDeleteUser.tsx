import { CommonResponse } from "@/lib/axiosClient";
import { userQueryKeys } from "@/queries/user/userQueries";
import { deleteUser } from "@/services/userService";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
type DeleteUserVariables = string
type DeleteUserResponse = CommonResponse<null>;


export const useDeleteUser = (): UseMutationResult<
    DeleteUserResponse, 
    Error,              
    DeleteUserVariables 
> => {
    const queryClient = useQueryClient();

    return useMutation<DeleteUserResponse, Error, DeleteUserVariables>({
    
        mutationFn: (userId) => deleteUser(userId),
        onSuccess: (data, userId) => {
            queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
            queryClient.removeQueries({ queryKey: userQueryKeys.detail(userId) });
        },

        onError: (error, userId) => {
            console.error(`유저 정보 삭제하는데 에러 발생  --->  ${userId}:`, error.message);
        },
    });
};

