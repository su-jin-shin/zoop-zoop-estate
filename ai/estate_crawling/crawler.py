import asyncio
import aiohttp
import aiofiles
import json
from datetime import datetime
import os
from aiohttp import ClientSession, ClientTimeout
from typing import List, Dict

# 헤더/쿠키
with open('secrets/headers.json', 'r', encoding='utf-8') as f:
    HEADERS = json.load(f)

with open('secrets/cookies.json', 'r', encoding='utf-8') as f:
    COOKIES = json.load(f)

BATCH_SIZE = 20  # 매물 병렬 처리 단위
semaphore = asyncio.Semaphore(10)

async def fetch_json(session: ClientSession, url: str) -> dict:
    try:
        async with semaphore:
            timeout = ClientTimeout(total=15)
            async with session.get(url, headers=HEADERS, cookies=COOKIES, timeout=timeout) as response:
                if response.status == 200:
                    print(f'성공: {url}')
                    return await response.json()
                else:
                    print(f'실패 status {response.status}: {url}')
                    return {}
    except asyncio.TimeoutError:
        print(f'타임아웃: {url}')
        return {}
    except Exception as e:
        print(f'요청 에러: {url} | 에러: {e}')
        return {}


async def handle_article(article, session, dong_code, real_estate_type_code, v_complex_cache, a_complex_cache):
    article_no = article.get('articleNo')
    detail_url = f'https://new.land.naver.com/api/articles/{article_no}?complexNo='
    detail_data = await fetch_json(session, detail_url)

    # 단지 정보 불러오기(빌라, 원룸-투룸)
    if real_estate_type_code in ['VL:YR', 'DDDGG:DSD']:

        if article.get('isComplex'):  # 해당 매물의 단지가 존재하면 단지 정보를 가져온다.

            # 해당 매물 정보
            property_info_url = f'https://new.land.naver.com/api/property/article/rent/{article["articleRealEstateTypeCode"]}/{article_no}/{article["tradeTypeCode"]}'
            property_info_data = await fetch_json(session, property_info_url)
            # 해당 매물 정보에서 단지 정보 추출
            complex_info = property_info_data.get('data', {}).get('communalComplexInfo', {})  # 해당 key가 없으면 {}를 반환
            complex_no = complex_info.get('complexNumber')  # 해당 key가 없으면 None을 반환

            if complex_no:  # complex_no가 None이나 빈 문자열이 아니면
                article['complexInfo'] = complex_info

                if complex_no not in v_complex_cache:  # 캐시에 저장되어 있지 않다면
                    complex_info_url = f'https://new.land.naver.com/api/property/complex/villa/{complex_no}'
                    complex_info_data = await fetch_json(session, complex_info_url)

                    complex_photo_url = f'https://new.land.naver.com/api/property/complex/villa/{complex_no}/photo'
                    complex_photo_data = await fetch_json(session, complex_photo_url)

                    # 캐시에 저장
                    v_complex_cache[complex_no] = {
                        'complexDetails': complex_info_data['data'],
                        'photoInfo': complex_photo_data['data'],
                    }

                # 캐시에서 가져와서 단지 정보 삽입
                article['complexInfo'].update(v_complex_cache[complex_no])  # 내용 추가

    # 단지 정보 불러오기(아파트, 오피스텔)
    elif real_estate_type_code in ['APT', 'OPST']:
        complex_no = detail_data.get('articleDetail', {}).get('hscpNo')

        if complex_no:
            if complex_no not in a_complex_cache:

                complex_info_url = f'https://new.land.naver.com/api/regions/complexes?cortarNo={dong_code}&realEstateType={real_estate_type_code}&order=rank'
                complex_info_data = await fetch_json(session, complex_info_url)

                for complex in complex_info_data.get('complexList', []):
                    if complex['complexNo'] == complex_no:
                        matched_complex = complex

                        # 좀 더 상세한 단지 정보 (일단 여기서는 사진만 가져옴)
                        complex_detail_info_url = f'https://new.land.naver.com/api/complexes/{complex_no}'
                        complex_detail_info_data = await fetch_json(session, complex_detail_info_url)

                        a_complex_cache[complex_no] = {
                            'basicInfo': matched_complex,
                            'photos': complex_detail_info_data.get('photos', [])
                        }
                        break

            # 캐시에서 가져와서 단지 정보 삽입
            article['complexInfo'] = a_complex_cache[complex_no]['basicInfo']
            article['complexInfo']['photos'] = a_complex_cache[complex_no]['photos']

    article['articleDetails'] = detail_data
    return article


async def fetch_articles_by_dong(session: ClientSession, cond: dict):
    dong_code = cond['dong']['code']
    dong_name = cond['dong']['name']
    trade_type_code = cond['trade_type']['code']
    trade_type_name = cond['trade_type']['name']
    real_estate_type_code = cond['real_estate_type']['code']
    real_estate_type_name = cond['real_estate_type']['name']
    deal_or_warrant_price = cond['deal_or_warrant_price']
    rent_price = cond['rent_price']

    total_articles = 0
    all_details = []
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    json_file_subject = f'output/detail_data_{timestamp}_{dong_name}_{trade_type_name}_{real_estate_type_name}.json'

    # 단지 정보 캐시
    v_complex_cache = {}
    a_complex_cache = {}

    for page in range(1, 2):  # 1페이지만
        url = (
            f'https://new.land.naver.com/api/articles'
            f'?cortarNo={dong_code}'
            f'&order=rank'
            f'&realEstateType={real_estate_type_code}'  # 아파트/오피스텔/빌라/원룸-투룸
            f'&tradeType={trade_type_code}'  # 매매/전세/월세
            f'&tag=%3A%3A%3A%3A%3A%3A%3A%3A'
            f'&rentPriceMin=0&rentPriceMax={rent_price}'  # 900000000
            f'&priceMin=0&priceMax={deal_or_warrant_price}'
            f'&areaMin=0&areaMax=900000000'
            f'&priceType=RETAIL'
            f'&showArticle=false'
            f'&sameAddressGroup=false'
            f'&page={page}'
        )
        data = await fetch_json(session, url)
        articles = data.get('articleList', [])
        if not articles:
            break

        print(f'********** 매물 개수: [{dong_name} / p{page}] 매물 {len(articles)}건 수집됨 **********')
        total_articles += len(articles)
        print(f'********** 총 매물 개수: {total_articles} **********')

        # 병렬 처리: BATCH_SIZE씩 묶어서 처리
        for i in range(0, len(articles), BATCH_SIZE):
            batch = articles[i:i+BATCH_SIZE]
            tasks = [
                handle_article(article, session, dong_code, real_estate_type_code, v_complex_cache, a_complex_cache)
                for article in batch
            ]
            results = await asyncio.gather(*tasks) # n번째 배치의 결과가 담긴다.
            all_details.extend(results) # 모든 결과가 누적되어 쌓인다.

    # 마지막에 한 번에 저장   
    os.makedirs('output', exist_ok=True)
    async with aiofiles.open(json_file_subject, 'w', encoding='utf-8') as f:
        await f.write(json.dumps(all_details, ensure_ascii=False, indent=2))

    return json_file_subject


async def main(search_condition):
    async with aiohttp.ClientSession() as session:
        tasks = []
        task = fetch_articles_by_dong(session, search_condition)
        tasks.append(task)
        results = await asyncio.gather(*tasks)
    return results[0]  # 파일 경로 리턴


if __name__ == '__main__':
    asyncio.run(main())
