
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface NotificationDialogsProps {
  dialogOpen: boolean;
  deleteDialogOpen: boolean;
  toggleAction: 'activate' | 'deactivate';
  onToggleConfirm: () => void;
  onToggleCancel: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
  setDialogOpen: (open: boolean) => void;
  setDeleteDialogOpen: (open: boolean) => void;
}

const NotificationDialogs = ({
  dialogOpen,
  deleteDialogOpen,
  toggleAction,
  onToggleConfirm,
  onToggleCancel,
  onDeleteConfirm,
  onDeleteCancel,
  setDialogOpen,
  setDeleteDialogOpen
}: NotificationDialogsProps) => {
  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {toggleAction === 'activate' ? '알림을 활성화하시겠습니까?' : '알림을 비활성화하시겠습니까?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {toggleAction === 'activate' 
                ? '알림이 활성화되면 설정한 조건에 맞는 매물 정보를 받으실 수 있습니다.' 
                : '알림이 비활성화되면 해당 조건의 매물 정보를 받지 않습니다.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onToggleCancel}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={onToggleConfirm}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              알림을 삭제하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription>
              이 알림을 삭제하면 다시 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onDeleteCancel}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NotificationDialogs;
