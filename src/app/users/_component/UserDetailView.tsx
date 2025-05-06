'use client';
import React from 'react';
import { Box, Typography, Chip, Divider, Stack, Paper } from '@mui/material';
import { UserDetailData } from '@/types/user/UserTypes';

interface UserDetailsViewProps {
  user: UserDetailData;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <Paper
    elevation={0}
    sx={{
      flex: '1 1 300px',
      backgroundColor: 'grey.50',
      borderRadius: 2,
      p: 2.5,
      minHeight: 90,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid',
      borderColor: 'grey.100',
    }}
  >
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}
    >
      {label}
    </Typography>

    <Typography
      variant="body2"
      component="span"
      color="text.primary"
      sx={{ mt: 0.5, wordBreak: 'break-word', fontSize: '0.95rem' }}
    >
      {value ?? <em style={{ color: '#999' }}>-</em>}
    </Typography>
  </Paper>
);


const UserDetailsView: React.FC<UserDetailsViewProps> = ({ user }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        useFlexGap
        gap={2}
        sx={{ width: '100%', mb: 3 }}
      >
        <DetailItem label="사용자 ID" value={user.id} />
        <DetailItem label="사용자명" value={user.name} />
        <DetailItem label="이메일" value={user.email} />
        <DetailItem label="직급" value={user.job_rank} />
        <DetailItem label="직책" value={user.position} />
        <DetailItem label="IP 주소" value={user.ip_address} />
        <DetailItem label="가입일" value={user.join_date} />
        <DetailItem
          label="활성 상태"
          value={
            <Chip
              label={user.active ? '활성' : '비활성'}
              color={user.active ? 'success' : 'error'}
              size="small"
              variant="filled"
              sx={{ fontWeight: 500, height: 24, fontSize: '0.75rem' }}
            />
          }
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" flexWrap="wrap" useFlexGap gap={2}>
        <DetailItem label="내부 번호" value={user.seq_no} />
      </Stack>
    </Box>
  );
};

export default UserDetailsView;
