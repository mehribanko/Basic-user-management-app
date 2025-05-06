'use client';
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Box,
    CircularProgress,
    Alert,
    Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/EditNote'; 
import { UpdateUserData } from '@/types/user/UserTypes';
import ModalWrapper from '@/components/modal/ModalCommon';
import { useGetUserDetails } from '@/hooks/useGetUserDetails';
import { useUpdateUser } from '@/hooks/useUpdateUser';
 

interface UserEditModalProps {
    userId: string | null; 
    onClose: () => void;
    onSuccess: () => void; 
}

const defaultValues: UpdateUserData = {
    name: '',
    job_rank: '',
    position: '',
    email: '',
    ip_address: '',
    active: true,
    join_date: '',
};

const UserEditModal: React.FC<UserEditModalProps> = ({ userId, onClose, onSuccess }) => {
   
      const {
        data: currentUserData,
        isLoading: isLoadingDetails,
        isError: isErrorDetails,
        error: errorDetails,
    } = useGetUserDetails(userId);

    
    const {
        mutate: updateUser,
        isPending: isUpdating, 
    } = useUpdateUser();

    
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }, 
    } = useForm<UpdateUserData>({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (currentUserData) {
            reset({
                name: currentUserData.name,
                job_rank: currentUserData.job_rank,
                position: currentUserData.position,
                email: currentUserData.email,
                ip_address: currentUserData.ip_address,
                active: currentUserData.active,
                join_date: currentUserData.join_date,
            });
        } else {
            reset(defaultValues);
        }
    }, [currentUserData, reset]);


    const onSubmit: SubmitHandler<UpdateUserData> = (formData) => {
        if (!userId || isUpdating) return; 

        updateUser(
            { userId, userData: formData }, 
            { 
                onSuccess: () => { 
                    onSuccess();
                    onClose(); 
                },
                onError: (error) => {
                    console.error('사용자 정보 수정하는데 에러 발생 --->:', error);
                }
            }
        );
    };

    
    const isLoading = isLoadingDetails;
    const isError = isErrorDetails; 
    const errorMessage = errorDetails?.message;
    const disableSave = isSubmitting || isUpdating || isLoadingDetails;


    return (
        <ModalWrapper
            open={Boolean(userId)} 
            onClose={onClose}
            title="사용자 정보 수정"
            titleIcon={<EditIcon color="primary"/>}
            isLoading={isLoading}
            isError={isError}
            errorMessage={errorMessage || '정보를 처리하는 중 오류가 발생했습니다.'}
            maxWidth="md"
           
            actions={
                <>
                    <Button onClick={onClose} variant="outlined" disabled={isUpdating}>
                        취소 
                    </Button>
                    <Button
                        type="submit"
                        form="user-edit-form"
                        variant="contained"
                        color="primary"
                        disabled={disableSave} 
                        startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null} 
                    >
                        {isUpdating ? '저장 중...' : '저장'}
                    </Button>
                </>
            }
        >
        
            {!isLoadingDetails && currentUserData && (
                 <Box component="form" id="user-edit-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2.5}
                      useFlexGap
                      flexWrap="wrap"
                      > 

                        {/* 이름 */}
                        <Box sx={{ flex: '1 1 45%' }}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: '사용자명은 필수입니다.' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="사용자명"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </Box>

                        {/* 이메일일 */}
                        <Box sx={{ flex: '1 1 45%' }}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: '이메일은 필수입니다.',
                                    pattern: { 
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: '유효한 이메일 주소를 입력하세요.'
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="이메일"
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Box>

                        {/* 직급급 */}
                        <Box sx={{ flex: '1 1 45%' }}>
                             <Controller
                                name="job_rank"
                                control={control}
                                rules={{ required: '직급은 필수입니다.' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="직급"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!errors.job_rank}
                                        helperText={errors.job_rank?.message}  
                                    />
                                )}
                            />
                        </Box>

                         {/* 직책책 */}
                         <Box sx={{ flex: '1 1 45%' }}>
                             <Controller
                                name="position"
                                control={control}
                                rules={{ required: '직책은 필수입니다.' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="직책"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!errors.position}
                                        helperText={errors.position?.message}
                                    />
                                )}
                            />
                        </Box>

                        {/* IP */}
                        <Box sx={{ flex: '1 1 45%' }}>
                             <Controller
                                name="ip_address"
                                control={control}
                                rules={{ required: 'IP 주소는 필수입니다.' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="IP 주소"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        error={!!errors.ip_address}
                                        helperText={errors.ip_address?.message}
                                    />
                                )}
                            />
                        </Box>

                        {/* 가입 일 */}
                        <Box sx={{ flex: '1 1 45%' }}>
                             <Controller
                                name="join_date"
                                control={control}
                                rules={{ required: '가입일은 필수입니다.' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="가입일"
                                        type="date"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        InputLabelProps={{ shrink: true }} 
                                        error={!!errors.join_date}
                                        helperText={errors.join_date?.message}
                                    />
                                )}
                            />
                        </Box>

                        {/* 활성/비활성 */}
                        <Box sx={{ width: '100%', mb: 2 }}>
                             <Controller
                                name="active"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                {...field}
                                                checked={field.value}
                                                color="primary"
                                            />
                                        }
                                        label="활성 상태"
                                    />
                                )}
                            />
                        </Box>

                        {isErrorDetails && !isLoadingDetails && (
                            <Box sx={{ mt: 2 }}>
                                <Alert severity="warning" variant="outlined">
                                    기존 사용자 정보를 불러올 수 없습니다다.
                                </Alert>
                            </Box>
                        )}

                    </Stack>
                 </Box>
            )}
        </ModalWrapper>
    );
};

export default UserEditModal;



