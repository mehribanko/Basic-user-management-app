
import PersonIcon from '@mui/icons-material/PersonOutline';
import { Button } from '@mui/material';
import ModalWrapper from '@/components/modal/ModalCommon';
import UserDetailsView from './UserDetailView';
import { useGetUserDetails } from '@/hooks/useGetUserDetails';

interface UserDetailsModalProps {
  userId: string | null;
  onClose: () => void;
}

export const UserDetailsModal:React.FC<UserDetailsModalProps> = ({ userId, onClose }) => {
  const { data: user, isLoading, isError, error } = useGetUserDetails(userId);
  const open = Boolean(userId);

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      titleIcon={<PersonIcon color="primary" />}
      title="사용자 상세 정보"
      isLoading={isLoading}
      isError={isError}
      errorMessage={`정보를 불러오는데 실패했습니다: ${error?.message}`}
      actions={
        <Button onClick={onClose} variant="contained" color="primary">
          닫기
        </Button>
      }
    >
      {user && <UserDetailsView user={user} />}
    </ModalWrapper>
  );
};
