
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

type PasswordChangeForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const PasswordChange = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
  const { register, handleSubmit, formState, watch, reset, getValues } = useForm<PasswordChangeForm>();

  const newPassword = watch("newPassword");
  const currentPassword = watch("currentPassword");

  const handleVerifyCurrentPassword = () => {
    const currentPwd = getValues("currentPassword");
    if (!currentPwd) {
      toast({
        title: "현재 비밀번호를 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    // TODO: 서버와 연동 시 실제 비밀번호 확인 API 호출
    // 지금은 임시로 확인 처리
    toast({
      title: "현재 비밀번호가 확인되었습니다",
      description: "새 비밀번호를 입력해주세요.",
    });
    setIsCurrentPasswordVerified(true);
  };

  const onSubmit = (data: PasswordChangeForm) => {
    if (!isCurrentPasswordVerified) {
      toast({
        title: "현재 비밀번호를 먼저 확인해주세요",
        variant: "destructive",
      });
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "비밀번호가 일치하지 않습니다",
        description: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        variant: "destructive",
      });
      return;
    }

    // TODO: 서버와 연동 시 수정 필요
    toast({
      title: "비밀번호가 변경되었습니다",
      description: "새 비밀번호로 다시 로그인해 주세요.",
    });
    reset();
    setIsCurrentPasswordVerified(false);
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-base sm:text-lg font-semibold">비밀번호 변경</h1>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor="currentPassword">
                  현재 비밀번호
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="현재 비밀번호를 입력하세요"
                    {...register("currentPassword", { required: "현재 비밀번호를 입력해주세요" })}
                    className="text-xs sm:text-sm h-10 sm:h-11 flex-1"
                    disabled={isCurrentPasswordVerified}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleVerifyCurrentPassword}
                    disabled={!currentPassword || isCurrentPasswordVerified}
                    className="text-xs sm:text-sm h-10 sm:h-11 px-3"
                  >
                    {isCurrentPasswordVerified ? "확인됨" : "확인"}
                  </Button>
                </div>
                {formState.errors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1">{formState.errors.currentPassword.message}</p>
                )}
                {isCurrentPasswordVerified && (
                  <p className="text-green-600 text-xs mt-1">현재 비밀번호가 확인되었습니다</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor="newPassword">
                  새 비밀번호
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="새 비밀번호를 입력하세요"
                  {...register("newPassword", { 
                    required: "새 비밀번호를 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 최소 8자 이상이어야 합니다"
                    }
                  })}
                  className="text-xs sm:text-sm h-10 sm:h-11"
                  disabled={!isCurrentPasswordVerified}
                />
                {formState.errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{formState.errors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor="confirmPassword">
                  새 비밀번호 확인
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="새 비밀번호를 다시 입력하세요"
                  {...register("confirmPassword", { 
                    required: "비밀번호 확인을 입력해주세요",
                    validate: (value) => value === newPassword || "비밀번호가 일치하지 않습니다"
                  })}
                  className="text-xs sm:text-sm h-10 sm:h-11"
                  disabled={!isCurrentPasswordVerified}
                />
                {formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
                >
                  취소
                </Button>
                <Button 
                  type="submit" 
                  disabled={formState.isSubmitting || !isCurrentPasswordVerified}
                  className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
                >
                  변경하기
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium mb-2">비밀번호 설정 안내</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 8자 이상으로 설정해주세요</li>
                <li>• 영문, 숫자, 특수문자를 조합하면 더 안전합니다</li>
                <li>• 개인정보와 관련된 내용은 피해주세요</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordChange;
