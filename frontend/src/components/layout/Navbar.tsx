
import { useState } from "react";
import { Search, MapPin, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 실제 앱에서는 인증 상태에 따라 결정
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-56 bg-white"
              sideOffset={8}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <Link to="/" className="w-full">
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <h1 className="font-bold text-lg text-real-blue">줍줍</h1>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link to="/" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  매물 찾기
                </DropdownMenuItem>
              </Link>
              <Link to="/map" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  지도 검색
                </DropdownMenuItem>
              </Link>
              <Link to="/favorites" className="w-full">
                <DropdownMenuItem className="cursor-pointer">
                  관심 매물
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {isLoggedIn ? (
                <Link to="/mypage" className="w-full">
                  <DropdownMenuItem className="cursor-pointer">
                    마이페이지
                  </DropdownMenuItem>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      로그인
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/register" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      회원가입
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/" className="flex items-center">
            <h1 className="font-bold text-xl text-real-blue">줍줍</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 p-0">
            <Search className="h-5 w-5 text-real-darkGray" />
          </Button>
          <Link to="/map">
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 p-0">
              <MapPin className="h-5 w-5 text-real-darkGray" />
            </Button>
          </Link>
          {isLoggedIn ? (
            <Link to="/mypage">
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 p-0">
                <User className="h-5 w-5 text-real-blue" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 p-0">
                <User className="h-5 w-5 text-real-darkGray" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
