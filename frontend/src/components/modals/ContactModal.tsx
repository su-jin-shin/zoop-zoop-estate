
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgencyClick?: () => void;
  agent: {
    name: string;
    company: string;
    phone: string;
    image: string;
  };
}

const ContactModal = ({ isOpen, onClose, onAgencyClick, agent }: ContactModalProps) => {
  const handlePhoneCall = () => {
    // 비활성화 - 아무 동작 하지 않음
  };

  const handleSMS = () => {
    // 비활성화 - 아무 동작 하지 않음
  };

  const handleEmail = () => {
    // 비활성화 - 아무 동작 하지 않음
  };

  const handleAgencyClick = () => {
    if (onAgencyClick) {
      onAgencyClick();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>연락하기</DialogTitle>
          <DialogDescription>
            부동산 담당자에게 문의해보세요
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 담당자 정보 - 클릭 가능 */}
          <div 
            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleAgencyClick}
          >
            <img 
              src={agent.image} 
              alt={agent.name} 
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{agent.name}</p>
              <p className="text-sm text-gray-600">{agent.company}</p>
              <p className="text-sm text-gray-700 font-medium">{agent.phone}</p>
            </div>
          </div>
          
          <Separator />
          
          {/* 연락 옵션 */}
          <div className="space-y-2">
            <Button 
              onClick={handlePhoneCall}
              className="w-full justify-start h-12"
              variant="outline"
            >
              <Phone className="h-4 w-4 mr-3" />
              전화 걸기
            </Button>
            
            <Button 
              onClick={handleSMS}
              className="w-full justify-start h-12"
              variant="outline"
            >
              <MessageCircle className="h-4 w-4 mr-3" />
              문자 보내기
            </Button>
            
            <Button 
              onClick={handleEmail}
              className="w-full justify-start h-12"
              variant="outline"
            >
              <Mail className="h-4 w-4 mr-3" />
              이메일 보내기
            </Button>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button onClick={onClose} variant="outline" className="flex-1">
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
