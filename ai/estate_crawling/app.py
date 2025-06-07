# streamlit run app.py  
import asyncio
import json
import time

import nest_asyncio
import streamlit as st
from crawler import main  # 만든 async 크롤러 함수


MAX_PREVIEW_SIZE = 5000  # 최대 미리보기 글자 수
nest_asyncio.apply()
st.title('🏙️ 네이버 부동산 매물 크롤러')


# 파일 불러오기
with open('secrets/all_dong_list.json', 'r', encoding='utf-8') as f:
    dong_list = json.load(f) 

dong_options = [dong['fullCortarName'] for dong in dong_list]
dong_map = {dong['fullCortarName']: dong['cortarNo'] for dong in dong_list}


# Streamlit selectbox
dong_name = st.selectbox('📍 동 검색', dong_options)
dong_code = dong_map[dong_name]


# 거래 타입
trade_type_map = {
    '매매': 'A1',
    '전세': 'B1',
    '월세': 'B2'
}
trade_type_name = st.selectbox('🏠 거래 타입', [name for name in trade_type_map])
trade_type = trade_type_map[trade_type_name]


# 매물 타입
real_estate_type_map = {
    '아파트': 'APT',
    '오피스텔': 'OPST',
    '빌라': 'VL:YR',
    '원룸-투룸': 'DDDGG:DSD'
}
real_estate_type_name = st.selectbox('🏘️ 매물 타입', [name for name in real_estate_type_map])
real_estate_type = real_estate_type_map[real_estate_type_name]


# 거래 타입에 따라 입력 필드 다르게
price_min, price_max = 0, 900000000  # 범위 설정
deal_or_warrant_price = 0
rent_price = 0

if trade_type_name == '매매':
    deal_or_warrant_price = st.number_input('💰 원하는 매매가 (만원)', min_value=0, max_value=price_max, step=1000)
    rent_price = price_max # price_min으로 해도 될듯
elif trade_type_name == '전세':
    deal_or_warrant_price = st.number_input('💰 원하는 전세금 (만원)', min_value=0, max_value=price_max, step=1000)
    rent_price = price_max # price_min으로 해도 될듯
elif trade_type_name == '월세':
    deal_or_warrant_price = st.number_input('💰 원하는 보증금 (만원)', min_value=0, max_value=price_max, step=1000)
    rent_price = st.number_input('💸 원하는 월세 (만원)', min_value=0, max_value=price_max, step=10)

# 0을 입력하면 자동으로 최대값 처리
if deal_or_warrant_price == 0:
    deal_or_warrant_price = price_max
if trade_type_name == '월세' and rent_price == 0:
    rent_price = price_max


search_condition = {
    'dong': {
        'name': dong_name,
        'code': dong_map[dong_name]
    },
    'trade_type': {
        'name': trade_type_name,
        'code': trade_type
    },
    'real_estate_type': {
        'name': real_estate_type_name,
        'code': real_estate_type
    },
    'deal_or_warrant_price': deal_or_warrant_price,
    'rent_price': rent_price
}


# 버튼 클릭 시 크롤링 시작
if st.button('매물 가져오기'):
    st.write('📦 매물 수집 중... 잠시만 기다려주세요...')
    
    start = time.time()  # 시작 시간 기록

    loop = asyncio.get_event_loop()
    file_path = loop.run_until_complete(main(search_condition))

    elapsed = time.time() - start  # 경과 시간 계산
 
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    st.success('✔️ 완료! 아래에서 결과 파일 내용을 확인할 수 있어요.')
    if len(content) > MAX_PREVIEW_SIZE:
        st.text_area('📂 결과 일부 미리보기', f'{content[:MAX_PREVIEW_SIZE]}\n... (생략됨)', height=400)
    else:
        st.text_area('📂 저장된 결과', content, height=400)
    st.info(f'⏱️ 처리 시간: {elapsed:.2f}초')
