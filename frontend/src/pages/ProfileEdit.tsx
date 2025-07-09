
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User } from "lucide-react";

type ProfileForm = {
  name: string;
  email: string;
};

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<ProfileForm>({
    defaultValues: {
      name: "홍길동",
      email: "example@email.com",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    // TODO: 서버와 연동 시 수정 필요
    alert("프로필이 수정되었습니다!");
    navigate("/mypage");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex-1 max-w-3xl">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="bg-real-blue/10 rounded-full p-2.5 sm:p-3 mr-2.5 sm:mr-3">
              <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-real-blue" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold">프로필 수정</h1>
          </div>
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor="name">
                이름
              </label>
              <Input id="name" {...register("name", { required: true })} className="text-xs sm:text-sm h-10 sm:h-11" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1" htmlFor="email">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
                disabled
                className="text-xs sm:text-sm h-10 sm:h-11"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
              >
                취소
              </Button>
              <Button type="submit" disabled={formState.isSubmitting} className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10">
                저장
              </Button>
            </div>
          </form>
          <div className="border-t pt-4 sm:pt-5 mt-5 sm:mt-7">
            <Button
              type="button"
              variant="ghost"
              className="text-red-500 hover:bg-red-50 w-full justify-center mt-1 text-xs sm:text-sm h-9 sm:h-10"
              onClick={() => navigate("/withdraw")}
            >
              회원 탈퇴
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
