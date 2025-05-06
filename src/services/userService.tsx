
import axiosClient, { CommonResponse } from '@/lib/axiosClient';
import type { UserListData, UserDetailData, UpdateUserData, GetUsersParams } from '@/types/user/UserTypes';
export type UserMutationResponse = CommonResponse<null>;

// 유저 리스트 조회
export const fetchUsersList = async ({
    page_index,
    page_size,
    id,
    name,
    email,
    active,
}: GetUsersParams): Promise<UserListData> => {
  
    const params: Record<string, string | number | boolean> = {
        page_index,
        page_size,
    };

    if (id) params.id = id;
    if (name) params.name = name;
    if (email) params.email = email;
    if (typeof active === 'boolean') params.active = active; 

    const response = await axiosClient<UserListData>({ 
        method: 'GET',
        url: '/users', 
        params: params,
    });

    return response.data;
};


// 유저 상세 정보 조회
export const fetchUserDetails = async (userId: string): Promise<UserDetailData> => {

    if (!userId) {
        throw new Error("유저 ID가 있어야 합니다!");
    }

    const response = await axiosClient<UserDetailData>({
        method: 'GET',
        url: `/users/${userId}`,
    });

    return response.data;
};



// 유저 정보 수정 조회
export const updateUser = async (
    userId: string,
    userData: UpdateUserData
): Promise<UserMutationResponse> => { 
    if (!userId) {
        throw new Error("유저 ID가 있어야 합니다!");
    }

    const response = await axiosClient<any, UpdateUserData>({ 
        method: 'POST',
        url: `/users/${userId}`,
        data: userData,
    });

    return response;
};

// 유저 정보 삭제 조회
export const deleteUser = async (
    userId: string
): Promise<UserMutationResponse> => { 
    if (!userId) {
        throw new Error("유저 ID가 있어야 합니다!");
    }

    const response = await axiosClient<any>({ 
        method: 'DELETE',
        url: `/users/${userId}`, 
    });

    return response;
};