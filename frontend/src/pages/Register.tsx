
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

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 최소 2자 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "올바른 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(6, {
    message: "비밀번호는 최소 6자 이상이어야 합니다.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    
    // 여기서 실제 회원가입 로직이 필요합니다 (현재는 시뮬레이션)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "회원가입 성공",
        description: "로그인하여 서비스를 이용해보세요!",
      });
      navigate("/login");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-3 py-2 flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-1.5 h-8 w-8 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-medium">회원가입</h1>
        </div>
      </div>
      
      <div className="px-4 py-6 flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-real-black mb-2">줍줍의 회원이 되어보세요</h2>
          <p className="text-real-darkGray text-sm">필요한 정보를 입력해주세요</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">이름</FormLabel>
                  <FormControl>
                    <Input placeholder="홍길동" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} className="text-sm" />
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
                  <FormLabel className="text-sm">비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-real-blue hover:bg-blue-700 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "가입 중..." : "회원가입"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p className="text-real-darkGray text-sm">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-real-blue font-medium hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
