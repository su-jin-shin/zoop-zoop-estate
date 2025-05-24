
import { Message } from "../types/chatTypes";

// Mock location data for search demonstration
export const locations = [
  "강남역", "강남구", "강동구", "강서구", "관악구", "광진구", "구로구",
  "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구",
  "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구",
  "은평구", "종로구", "중구", "중랑구", "광화문", "신촌", "홍대", "여의도",
  "건대입구", "잠실", "논현동", "삼성동", "역삼동", "청담동", "압구정", "신사동"
];

// Combined initial message with filter button
export const initialMessage: Message = {
  id: 1,
  text: "안녕하세요! AI 부동산 매물 추천 챗봇 줍줍입니다.<br>원하는 조건을 설정하면, 딱 맞는 매물을 찾아드릴게요 🏠✨",
  isUser: false,
  timestamp: new Date(),
  buttonText: "필터 설정하기",
  inputType: 'button',
};

export const locationQuestion: Message = {
  id: 2,
  text: "어느 지역에서 매물을 찾고 계신가요? 지역명을 입력해주세요.",
  isUser: false,
  timestamp: new Date(),
  inputType: 'search',
};

export const transactionQuestion: Message = {
  id: 3,
  text: "어떤 거래 유형을 원하시나요?",
  isUser: false,
  timestamp: new Date(),
  options: ["월세", "전세", "매매"],
  inputType: 'radio',
};

export const propertyQuestion: Message = {
  id: 4,
  text: "어떤 종류의 부동산을 찾고 계신가요?",
  isUser: false,
  timestamp: new Date(),
  options: ["원룸 / 투룸", "빌라", "오피스텔", "아파트"],
  inputType: 'radio',
};

export const priceQuestion: Message = {
  id: 5,
  text: "희망하시는 가격대는 어떻게 되시나요? (단위: 만원)",
  isUser: false,
  timestamp: new Date(),
  inputType: 'input',
};

export const depositQuestion: Message = {
  id: 6,
  text: "희망하시는 보증금은 어떻게 되시나요? (단위: 만원)<br>입력을 원치 않으시면 다음 버튼을 눌러주세요.",
  isUser: false,
  timestamp: new Date(),
  inputType: 'input',
};

// Array of different response messages when users chat outside the filter flow
export const chatResponses: string[] = [
  "필터 설정을 통해 원하시는 매물을 찾으실 수 있습니다. '필터 설정하기' 버튼을 클릭해보세요.",
  "원하시는 매물을 찾으려면 '필터 설정하기' 버튼을 클릭하여 조건을 입력해주세요.",
  "맞춤형 매물 추천을 위해 '필터 설정하기' 버튼을 클릭하시면 도와드리겠습니다.",
  "다양한 매물을 확인하려면 '필터 설정하기'를 통해 조건을 설정해주세요.",
  "최적의 매물을 찾기 위해 '필터 설정하기' 버튼을 눌러 원하시는 조건을 알려주세요.",
  "지역, 가격대, 매물 유형 등을 설정하려면 '필터 설정하기' 버튼을 이용해주세요.",
  "맞춤형 추천을 원하신다면 '필터 설정하기' 버튼으로 시작해보세요.",
  "부동산 매물 검색을 시작하려면 '필터 설정하기' 버튼을 클릭해주세요.",
  "원하시는 조건의 매물을 찾기 위해 '필터 설정하기'로 검색 조건을 설정해보세요.",
  "더 정확한 매물 추천을 위해 '필터 설정하기' 버튼을 통해 조건을 입력해주시면 좋겠습니다."
];
