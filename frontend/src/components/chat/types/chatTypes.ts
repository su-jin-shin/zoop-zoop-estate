
export type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
  inputType?: 'search' | 'select' | 'radio' | 'input' | 'button' | 'checkbox';
  searchOptions?: string[];
  buttonText?: string;
  hasPropertyItems?: boolean;
};

export type ChatHistory = {
  id: number;
  title: string;
  messages: Message[];
  timestamp: Date;
};

export type PropertyPreferences = {
  location?: string;
  transactionType?: '월세' | '전세' | '매매';
  propertyType?: string;
  propertyTypes?: string[];
  priceRange?: string;
  depositAmount?: string;
  step: number;
};
