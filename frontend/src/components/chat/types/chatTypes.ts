
export type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
  inputType?: 'search' | 'select' | 'radio' | 'input' | 'button';
  searchOptions?: string[];
  buttonText?: string;
};

export type ChatHistory = {
  id: number;
  title: string;
  messages: Message[];
  timestamp: Date;
  chatRoomId?: number;
};

export type PropertyPreferences = {
  location?: string;
  transactionType?: '월세' | '전세' | '매매';
  propertyType?: '원룸 / 투룸' | '빌라' | '오피스텔' | '아파트';
  priceRange?: string;
  depositAmount?: string;
  step: number;
};
