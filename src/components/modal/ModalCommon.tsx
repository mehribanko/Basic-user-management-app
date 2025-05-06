'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Typography,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  titleIcon?: React.ReactNode;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  onClose,
  titleIcon,
  title,
  isLoading = false,
  isError = false,
  errorMessage = '',
  children,
  actions,
  maxWidth = 'md'
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      scroll="paper"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          backgroundColor: 'grey.100',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {titleIcon}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {isLoading ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}
          >
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert severity="error" variant="outlined" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        ) : (
          children
        )}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            backgroundColor: 'grey.50',
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalWrapper;
