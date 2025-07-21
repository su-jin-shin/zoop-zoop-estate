
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Phone, Mail, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/layout/Navbar";

const Help = () => {
  const faqData = [
    {
      question: "매물 등록은 어떻게 하나요?",
      answer: "매물 등록은 현재 전문 중개업소를 통해서만 가능합니다. 개인 매물 등록 기능은 추후 업데이트 예정입니다."
    },
    {
      question: "관심 매물은 몇 개까지 등록할 수 있나요?",
      answer: "관심 매물은 최대 100개까지 등록 가능합니다. 더 많은 매물을 관심 목록에 추가하려면 기존 매물을 삭제해 주세요."
    },
    {
      question: "매물 정보가 정확하지 않을 때는 어떻게 하나요?",
      answer: "매물 정보에 오류가 있다면 해당 매물 페이지에서 '신고하기' 버튼을 통해 신고해 주시거나 고객센터로 문의해 주세요."
    },
    {
      question: "회원 탈퇴는 어떻게 하나요?",
      answer: "설정 > 계정 설정 > 회원 탈퇴에서 진행하실 수 있습니다. 탈퇴 시 모든 개인정보가 삭제되며 복구가 불가능합니다."
    },
    {
      question: "알림이 오지 않아요",
      answer: "설정 > 알림 설정에서 알림 권한을 확인해 주세요. 스마트폰의 앱 설정에서도 알림 권한이 허용되어 있는지 확인해 주세요."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/mypage">
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">고객센터</h1>
          </div>
        </div>

        <div className="space-y-4">
          {/* 문의하기 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">문의하기</h3>
                </div>
              </div>
              <Separator />
              <div>
                <button className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100 w-full text-left">
                  <Phone className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium">전화 문의</p>
                    <p className="text-xs text-gray-500">1588-1234 (평일 09:00~18:00)</p>
                  </div>
                </button>
                <Separator />
                <button className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100 w-full text-left">
                  <Mail className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium">이메일 문의</p>
                    <p className="text-xs text-gray-500">support@zoopzoop.dev</p>
                  </div>
                </button>
                <Separator />
                <Link to="/chat" className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100">
                  <MessageSquare className="h-4 w-4 mr-3 text-gray-500" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium">채팅 상담</p>
                    <p className="text-xs text-gray-500">실시간 채팅으로 문의하기</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">자주 묻는 질문</h3>
                </div>
              </div>
              <Separator />
              <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-xs sm:text-sm">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs sm:text-sm text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          </Card>

          {/* 공지사항 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">공지사항</h3>
                </div>
              </div>
              <Separator />
              <div>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium">서비스 업데이트 안내</span>
                    <span className="text-xs text-gray-500">2024.01.15</span>
                  </div>
                  <p className="text-xs text-gray-600">새로운 기능이 추가되었습니다.</p>
                </div>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium">개인정보 처리방침 변경 안내</span>
                    <span className="text-xs text-gray-500">2024.01.10</span>
                  </div>
                  <p className="text-xs text-gray-600">개인정보 처리방침이 변경되었습니다.</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium">줍줍 서비스 오픈</span>
                    <span className="text-xs text-gray-500">2024.01.01</span>
                  </div>
                  <p className="text-xs text-gray-600">줍줍 서비스가 정식 오픈되었습니다.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 앱 정보 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-600">앱 버전</span>
                <span className="text-xs sm:text-sm">v1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">최종 업데이트</span>
                <span className="text-xs sm:text-sm">2024.01.15</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
