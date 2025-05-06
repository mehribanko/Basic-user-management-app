
'use client'; 
import React, { useState } from 'react';
import { SearchFormData } from '../../types/common/CommonTypes';
import { usePagination } from '../../hooks/usePagination';

import UserTable from '@/components/table/UserTable';
import { useFetchUsers } from '@/hooks/useGetUsers';
import { userTableColumns } from '@/utils/columns/UserColumns';
import SearchBar from '@/components/search/SearchBar';
import { UserDetailsModal } from './_component/UserDetailsModal';
import UserUpdateModal from './_component/UserUpdateModal';
import { useQueryClient } from '@tanstack/react-query';
import { userQueryKeys } from '@/queries/user/userQueries';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { UserDetailData } from '@/types/user/UserTypes';

//유저 관리 화면 
export default function UsersPage() {
    
    // 사용저 상세 정보 조회용
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    // 사용저 정보 수정용
    const [userToUpdate, setUserToUpdate] =  useState<string | null>(null);   
    // 사용자 정보 삭제용
    const [userToDelete, setUserToDelete] =  useState<UserDetailData | null>(null);
    const [searchParams, setSearchParams] = useState<SearchFormData>({});
    const { pagination, handleMRTPageChange, resetPagination } = usePagination({ pageSize: 10 });

    const queryClient = useQueryClient();

    // 사용자 리스트 조회 query
    const {
        data: usersData,
        isLoading,
        isError,
        error,
    } = useFetchUsers({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchParams: searchParams, 
    });

    const { mutate: deleteUserMutate, isPending: isDeleting } = useDeleteUser();

    const handleSearchSubmit = (formData: SearchFormData) => {
        setSearchParams(formData); 
        resetPagination(); 
    };

    const handleResetSearch = () => {
        setSearchParams({});
        resetPagination();
    };

    const handleShowDetails = (user: UserDetailData) => {
        setSelectedUserId(user.id);
    };

    const handleCloseDetailsModal = () => {
        setSelectedUserId(null); 
    };

    const handleShowEdit = (user: UserDetailData) => {
        setUserToUpdate(user.id);
    };

    const handleCloseEditModal = () => {
        setUserToUpdate(null); 
    };
  
    const handleEditSuccess = () => {
        handleCloseEditModal(); 
        queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
    };

    const handleShowDelete = (user: UserDetailData) => {
        setUserToDelete(user);
    };

    const handleCloseDeleteModal = () => {
        setUserToDelete(null); 
    };

    const handleConfirmDelete = () => {
        if (!userToDelete) return; 
    
        deleteUserMutate(userToDelete.id, {
            onSuccess: () => {
                handleCloseDeleteModal();
            },
            onError: (deleteError) => {
                console.error('삭제 요청 실패:', deleteError);
            }
        });
    };



    return (
       
        <>
               {/* 검색창 */}
               <div className="bg-white p-6 shadow rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">사용자 검색</h2>
                <SearchBar
                    onSearch={handleSearchSubmit}
                    onReset={handleResetSearch}
                />
              </div>

            {/* 유저 테이블 메인인 */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">사용자 목록</h2>

                {/* 로딩 */}
                {isLoading && (
                    <div className="text-center py-4">
                        <p className="text-blue-500"> 사용자 목록 조회 중...</p>
                    </div>
                )}

                {/* 에러 메세지 */}
                {error && (
                    <div className="text-center py-4 text-red-600 bg-red-100 border border-red-400 rounded p-4">
                        <p>사용자 목록 조회 중 에러 발생했습니다.</p>
                    </div>
                )}

                 {/* 사용자 리스트 테이블 */}
                {!isLoading && !error && (
                    <>
                        <UserTable
                            columns={userTableColumns}
                            users={usersData?.result_list ?? []}
                            totalCount={usersData?.total_count ?? 0}
                            isLoading={isLoading}
                            error={isError ? '사용자 목록 조회 중 에러 발생했습니다' : null}
                            pageIndex={pagination.pageIndex}
                            pageSize={pagination.pageSize}
                            onPaginationChange={handleMRTPageChange} 
                            onShowDetails={handleShowDetails}
                            onShowEdit={handleShowEdit}
                            onShowDelete={handleShowDelete} 
                           />

                    </>
                )}
            </div>

            {/* 사용자 상세 정보 조회 모달  */}
            <UserDetailsModal
                userId={selectedUserId}
                onClose={handleCloseDetailsModal}
            />

            {/* 사용자 상세 정보 수정 모달  */}
               <UserUpdateModal
                userId={userToUpdate} 
                onClose={handleCloseEditModal} 
                onSuccess={handleEditSuccess}
            />

             {/* 사용자 삭제 모달  */}
             <ConfirmModal
                open={Boolean(userToDelete)} 
                onClose={handleCloseDeleteModal} 
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting} 
                message={userToDelete ? `정말로 ${userToDelete.name}님을 삭제하시겠습니까?` : ''}
              />
        </>
    );
}