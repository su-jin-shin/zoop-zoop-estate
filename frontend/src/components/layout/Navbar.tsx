
import { useState } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ZoopLogo from "@/components/logo/ZoopLogo";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 backdrop-blur-sm shadow-md select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ZoopLogo className="text-real-blue" />
            <h1 className="font-bold text-xl text-real-blue">줍줍</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
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
