'use client';
import React from 'react';
import {
    Button,
    Typography,
    CircularProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ModalWrapper from './ModalCommon';


interface ConfirmDeleteModalProps {
    open: boolean; 
    onClose: () => void; 
    onConfirm: () => void; 
    title?: string; 
    message?: string; 
    confirmText?: string;
    cancelText?: string; 
    isLoading?: boolean; 
}

const ConfirmModal: React.FC<ConfirmDeleteModalProps> = ({
    open,
    onClose,
    onConfirm,
    title = "삭제 확인",
    message = "정말로 이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    confirmText = "삭제",
    cancelText = "취소", 
    isLoading = false,
}) => {
  
    const modalActions = (
        <>
            <Button onClick={onClose} variant="outlined" disabled={isLoading}>
                {cancelText}
            </Button>
            <Button
                onClick={onConfirm}
                variant="contained"
                color="error" 
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null} 
            >
                {isLoading ? '삭제 중...' : confirmText}
            </Button>
        </>
    );

    return (
        <ModalWrapper
            open={open}
            onClose={onClose}
            title={title}
            titleIcon={<WarningAmberIcon color="warning" />} 
            actions={modalActions}
            maxWidth="xs"
        >
            <Typography variant="body1">{message}</Typography>
        </ModalWrapper>
    );
};

export default ConfirmModal;
