import asyncio
import json
import sys
from pathlib import Path
from typing import Dict, List

import aiohttp
import asyncpg
from aiohttp import ClientSession, ClientTimeout

# 모듈 import 기준 디렉토리 설정 (ai 폴더 기준)
CURRENT_DIR = Path(__file__).resolve().parent
MODULE_BASE_DIR = CURRENT_DIR.parent
sys.path.insert(0, str(MODULE_BASE_DIR))
from config.loader import DB_CONFIG

if not DB_CONFIG:
    raise ValueError('DB 설정이 누락되었습니다. .env 파일 또는 DB_CONFIG를 확인해주세요.')


CURRENT_DIR = Path(__file__).resolve().parent

# 헤더/쿠키
with open(CURRENT_DIR / 'secrets/headers.json', 'r', encoding='utf-8') as f:
    HEADERS = json.load(f)

with open(CURRENT_DIR / 'secrets/cookies.json', 'r', encoding='utf-8') as f:
    COOKIES = json.load(f)

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

async def get_region_list(session: ClientSession, cortar_no: str) -> List[Dict]:
    print(f'[지역 목록 요청] cortarNo={cortar_no}')
    url = f'https://new.land.naver.com/api/regions/list?cortarNo={cortar_no}'
    data = await fetch_json(session, url)
    return data.get('regionList', [])

async def insert_many_properties(values_to_insert):
    pool = await asyncpg.create_pool(**DB_CONFIG)

    async with pool.acquire() as conn:
        # 일괄 insert
        await conn.executemany("""
                INSERT INTO region (cortar_no, cortar_name, cortar_type, parent_cortar_no, 
                center_lat, center_lon, full_cortar_name)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                ON CONFLICT (cortar_no) DO NOTHING
            """, values_to_insert)

    await pool.close()


# city, district, subdistrict
async def main():
    async with aiohttp.ClientSession() as session:
        si_list = await get_region_list(session, '')
        print(si_list)

        values_to_insert = []

        for si in si_list: # 시,도 리스트
            values_to_insert.append((
                si.get('cortarNo'), si.get('cortarName'), si.get('cortarType'), None,
                si.get('centerLat'), si.get('centerLon'), si.get('cortarName')
            ))

            gu_list = await get_region_list(session, si.get('cortarNo'))
            for gu in gu_list: # 구 리스트

                values_to_insert.append((
                    gu.get('cortarNo'), gu.get('cortarName'), gu.get('cortarType'), si.get('cortarNo'),
                    gu.get('centerLat'), gu.get('centerLon'), f"{si.get('cortarName')} {gu.get('cortarName')}"
                ))

                try:
                    dong_list = await get_region_list(session, gu.get('cortarNo')) # 동 리스트
                except Exception as e:
                    print(f'{gu}은(는) 하위 행정 구역이 없습니다. {e}')
                    continue

                for dong in dong_list: # 동 리스트를 순회하면서 모든 동이 출력

                    values_to_insert.append((
                        dong.get('cortarNo'), dong.get('cortarName'), dong.get('cortarType'), gu.get('cortarNo'),
                        dong.get('centerLat'), dong.get('centerLon'),
                        f"{si.get('cortarName')} {gu.get('cortarName')} {dong.get('cortarName')}"
                    ))

        await insert_many_properties(values_to_insert)


if __name__ == '__main__':
    asyncio.run(main())
