
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(6, {
    message: "비밀번호는 최소 6자 이상이어야 합니다.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    
    // 여기서 실제 로그인 로직이 필요합니다 (현재는 시뮬레이션)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "로그인 성공",
        description: "환영합니다!",
      });
      navigate("/");
    }, 1500);
  }

  const handleKakaoLogin = () => {
    setIsKakaoLoading(true);
    
    // 카카오 로그인 로직 (현재는 시뮬레이션)
    setTimeout(() => {
      setIsKakaoLoading(false);
      toast({
        title: "카카오 로그인 성공",
        description: "카카오 계정으로 로그인되었습니다!",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 backdrop-blur-sm select-none">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2 h-8 w-8 p-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-medium text-sm sm:text-base">로그인</h1>
          </div>
        </div>
      </nav>
      
      <div className="px-3 sm:px-4 py-4 sm:py-6 flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="text-lg sm:text-xl font-bold text-real-black mb-1 sm:mb-2">줍줍에 오신 것을 환영합니다</h2>
          <p className="text-real-darkGray text-xs sm:text-sm">계정 정보를 입력해주세요</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} className="text-xs sm:text-sm h-10 sm:h-11" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} className="text-xs sm:text-sm h-10 sm:h-11" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-real-blue hover:bg-blue-700 mt-3 sm:mt-4 h-10 sm:h-11 text-xs sm:text-sm"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Form>

        <div className="mt-4 sm:mt-6">
          <div className="relative">
            <Separator className="my-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-xs sm:text-sm text-real-darkGray">또는</span>
            </div>
          </div>
          
          <Button
            type="button"
            className="w-full h-10 sm:h-11 text-xs sm:text-sm mt-4 bg-yellow-400 hover:bg-yellow-500 text-black border-0"
            onClick={handleKakaoLogin}
            disabled={isKakaoLoading}
          >
            <div className="flex items-center justify-center">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M12 3C7.03 3 3 6.16 3 10.12c0 2.5 1.65 4.7 4.15 6.03L6.4 19.5c-.15.3.15.63.45.48l3.65-2.25C11.1 17.8 11.55 17.8 12 17.8c4.97 0 9-3.16 9-7.08S16.97 3 12 3z" 
                  fill="currentColor"
                />
              </svg>
              {isKakaoLoading ? "카카오 로그인 중..." : "카카오로 로그인"}
            </div>
          </Button>
        </div>
        
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-real-darkGray text-xs sm:text-sm">
            계정이 없으신가요?{" "}
            <Link to="/register" className="text-real-blue font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
