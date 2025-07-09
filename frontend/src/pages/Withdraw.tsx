import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

const reasonList = [
  "필요한 서비스를 찾지 못했어요",
  "더 이상 이용하지 않을 예정이에요",
  "개인정보 보호가 걱정돼요",
  "사용이 불편해요",
  "기타(직접 작성)",
];

const Withdraw = () => {
  const navigate = useNavigate();
  const [reason, setReason] = React.useState(reasonList[0]);
  const [customReason, setCustomReason] = React.useState("");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason =
      reason === "기타(직접 작성)" && customReason.trim()
        ? customReason.trim()
        : reason;
    alert(`회원 탈퇴가 완료되었습니다.\n탈퇴 사유: ${finalReason}`);
    // 실제 처리 로직은 여기에 추가
    navigate("/");
  };

  const handleKakaoWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason =
      reason === "기타(직접 작성)" && customReason.trim()
        ? customReason.trim()
        : reason;
    alert(`카카오로 가입 계정 탈퇴가 완료되었습니다.\n탈퇴 사유: ${finalReason}`);
    // 실제 카카오톡 연동 해제 로직은 여기에 추가
  };

  // "기타(직접 작성)" 선택 시 입력이 2글자 이상이어야 활성화
  const isSubmitDisabled =
    reason === "기타(직접 작성)"
      ? customReason.trim().length < 2
      : false;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex-1 max-w-sm sm:max-w-md flex flex-col items-center justify-center">
        <form
          className="bg-white rounded-lg shadow p-4 sm:p-6 md:p-8 w-full"
          onSubmit={handleWithdraw}
        >
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-red-500 mb-2" />
            <h1 className="text-lg sm:text-xl font-bold mb-1">회원 탈퇴</h1>
            <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
              정말로 회원 탈퇴를 진행하시겠습니까?
              <br />
              회원정보 및 이용기록이 모두 삭제되며, 복구할 수 없습니다.
            </p>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2">
              탈퇴 사유를 선택해주세요 <span className="text-red-500">*</span>
            </label>
            <RadioGroup
              value={reason}
              onValueChange={setReason}
              className="space-y-2"
            >
              {reasonList.map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <RadioGroupItem id={r} value={r} />
                  <label htmlFor={r} className="text-xs sm:text-sm">
                    {r}
                  </label>
                </div>
              ))}
            </RadioGroup>
            {reason === "기타(직접 작성)" && (
              <div className="mt-3 sm:mt-4">
                <label htmlFor="custom-reason" className="block text-xs sm:text-sm mb-1">
                  탈퇴 사유 입력
                </label>
                <Textarea
                  id="custom-reason"
                  placeholder="탈퇴 사유를 입력해주세요."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="resize-none text-xs sm:text-sm"
                  minLength={2}
                  maxLength={300}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 mt-6 sm:mt-8">
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm h-9 sm:h-10"
              disabled={isSubmitDisabled}
            >
              네, 탈퇴할래요
            </Button>
            <Button
              type="button"
              onClick={handleKakaoWithdraw}
              className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-center gap-2"
              disabled={isSubmitDisabled}
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M12 3C7.03 3 3 6.16 3 10.12c0 2.5 1.65 4.7 4.15 6.03L6.4 19.5c-.15.3.15.63.45.48l3.65-2.25C11.1 17.8 11.55 17.8 12 17.8c4.97 0 9-3.16 9-7.08S16.97 3 12 3z" 
                  fill="currentColor"
                />
              </svg>
              카카오로 가입한 계정 탈퇴하기
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="text-xs sm:text-sm h-9 sm:h-10"
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
