import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import ScrollToTop from "./components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  /* 1) 모바일 안전-vh 계산 ---------------------------------------- */
  useEffect(() => {
    const setVh = () => {
      // 1vh = 현재 뷰포트 높이의 1% (키보드 올라오면 값이 줄어듦)
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();                        // 첫 렌더 시 한 번 실행
    window.addEventListener("resize", setVh);   // 화면 크기 변하면 다시 계산
    return () => window.removeEventListener("resize", setVh);
  }, []);
  /* ------------------------------------------------------------- */

  return (
    <div className="w-full bg-white flex flex-col"> 
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;



// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { navItems } from "./nav-items";
// import ScrollToTop from "./components/layout/ScrollToTop";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <ScrollToTop />
//         <Routes>
//           {navItems.map(({ to, page }) => (
//             <Route key={to} path={to} element={page} />
//           ))}
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;