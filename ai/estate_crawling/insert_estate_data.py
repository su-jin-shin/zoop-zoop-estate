import json
import sys
from pathlib import Path

import asyncpg

# 모듈 import 기준 디렉토리 설정 (ai 폴더 기준)
CURRENT_DIR = Path(__file__).resolve().parent
MODULE_BASE_DIR = CURRENT_DIR.parent
sys.path.insert(0, str(MODULE_BASE_DIR))
from config.loader import DB_CONFIG

if not DB_CONFIG:
    raise ValueError('DB 설정이 누락되었습니다. .env 파일 또는 DB_CONFIG를 확인해주세요.')


async def insert_property(conn, data):
    await conn.execute("""
        INSERT INTO property (realty_id, complex_id, article_no, article_name)
        VALUES ($1, $2, $3, $4)
    """, 1, 1, data['articleNo'], data['articleName'])


def dump_if_not_empty(value):
    if not value:  # None, [] 둘 다 처리됨
        return None
    return json.dumps(value)

def safe_float(value):
    try:
        return float(value) if value is not None else None
    except (TypeError, ValueError):
        return None

async def insert_many_properties(article_list, real_estate_type_code):
    values_to_insert = []
    for item in article_list:
        details = item.get('articleDetails', {})
        detail = details.get('articleDetail', {})
        building_register = details.get('articleBuildingRegister', {})
        facility = details.get('articleFacility', {})
        floor = details.get('articleFloor', {})
        price = details.get('articlePrice', {})
        tax = details.get('articleTax', {})
        etc_fee_amount = details.get('administrationCostInfo', {}).get('etcFeeDetails', {}).get('etcFeeAmount')

        article_name, apt_name, heat_method_type_name, heat_fuel_type_name, household_count, use_approve_ymd, parking_count, parking_count_per_house_hold \
            = extract_article_info(item, real_estate_type_code)
        values_to_insert.append((item.get('articleNo'), article_name, detail.get('tradeCompleteYN'),
                                 apt_name, heat_method_type_name, heat_fuel_type_name,
                                 household_count, use_approve_ymd, item.get('realEstateTypeName'), item.get('tradeTypeName'),
                                 detail.get('cityName'), detail.get('divisionName'), detail.get('sectionName'),
                                 str(detail.get('walkingTimeToNearSubway')), detail.get('roomCount'),
                                 detail.get('bathroomCount'), detail.get('moveInTypeName'), detail.get('moveInPossibleYmd'),
                                 detail.get('articleFeatureDescription'), detail.get('detailDescription'), detail.get('parkingPossibleYN'),
                                 detail.get('principalUse'), building_register.get('mainPurpsCdNm'),
                                 item.get('floorInfo'), item.get('dealOrWarrantPrc'), str(item.get('area1')),
                                 str(item.get('area2')), item.get('direction'), item.get('articleFeatureDesc'),
                                 item.get('sameAddrMaxPrc'), item.get('sameAddrMinPrc'),
                                 facility.get('directionBaseTypeName'), facility.get('entranceTypeName'),
                                 dump_if_not_empty(facility.get('lifeFacilities')),
                                 dump_if_not_empty(facility.get('securityFacilities')),
                                 dump_if_not_empty(facility.get('etcFacilities')),
                                 floor.get('totalFloorCount'), floor.get('correspondingFloorCount'),
                                 parking_count, parking_count_per_house_hold,
                                 safe_float(item.get('latitude')), safe_float(item.get('longitude')),
                                 detail.get('buildingName'), detail.get('exposureAddress'), detail.get('exposeStartYMD'),
                                 price.get('rentPrice'), price.get('dealPrice'), price.get('warrantPrice'),
                                 price.get('allWarrantPrice'), price.get('allRentPrice'), price.get('priceBySpace'),
                                 tax.get('acquisitionTax'), tax.get('registTax'), tax.get('specialTax'),
                                 tax.get('eduTax'), price.get('financePrice'), etc_fee_amount,
                                 dump_if_not_empty(detail.get('tagList'))
                                 ))

    pool = await asyncpg.create_pool(**DB_CONFIG)
    async with pool.acquire() as conn:
        await conn.executemany("""
            INSERT INTO property (article_no, article_name, trade_complete_yn, 
            apt_name, heat_method_type_name, 
            heat_fuel_type_name, household_count, use_approve_ymd, real_estate_type_name, trade_type_name,
            city_name, division_name, section_name, walking_time_to_near_subway, room_count, bathroom_count,
            move_in_type_name, move_in_possible_ymd, article_feature_description, detail_description, 
            parking_possible_yn, principal_use, main_purps_cd_nm, floor_info, deal_or_warrant_prc, 
            area1, area2, direction, article_feature_desc, same_addr_max_prc, same_addr_min_prc, 
            direction_base_type_name, entrance_type_name, life_facilities, security_facilities, etc_facilities, 
            total_floor_count, corresponding_floor_count, parking_count, parking_count_per_household,
            latitude, longitude, building_name, exposure_address, expose_start_ymd,
            rent_price, deal_price, warrant_price, all_warrant_price, all_rent_price, price_by_space, 
            acquisition_tax, regist_tax, special_tax, edu_tax, finance_price, etc_fee_amount, tag_list)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,
            $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, 
            $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58)
            ON CONFLICT (article_no) DO NOTHING
        """, values_to_insert)
    await pool.close()

#
def extract_article_info(item, real_estate_type_code):
    details = item.get('articleDetails', {})
    detail = details.get('articleDetail', {})

    if real_estate_type_code in ['VL:YR', 'DDDGG:DSD']:
        complex_info = item.get('complexInfo', {})
        facility = details.get('articleFacility', {})
        parking_count = detail.get('parkingCount')

        return (
            complex_info.get('complexName') + ' ' + complex_info.get('dongName') if complex_info else item.get('articleName'),
            details.get('articleBuildingRegister', {}).get('bldNm'),
            facility.get('heatMethodTypeName'),
            facility.get('heatFuelTypeName'),
            detail.get('householdCount'),
            facility.get('buildingUseAprvYmd'),
            str(parking_count) if parking_count is not None else None,
            detail.get('parkingPerHouseholdCount')
        )
    elif real_estate_type_code in ['APT', 'OPST']:
        return (
            detail.get('articleName'),
            detail.get('aptName'),
            detail.get('aptHeatMethodTypeName'),
            detail.get('aptHeatFuelTypeName'),
            detail.get('aptHouseholdCount'),
            detail.get('aptUseApproveYmd'),
            detail.get('aptParkingCount'),
            detail.get('aptParkingCountPerHousehold')
        )

# # async def main():
# #     pool = await asyncpg.create_pool(**DB_CONFIG)
# #     async with pool.acquire() as conn:
# #         result = await conn.fetch('SELECT NOW();')
# #         print(result)
# #     await pool.close()
#
# async def main():
#     pool = await asyncpg.create_pool(**DB_CONFIG)
#     async with pool.acquire() as conn:
#         # 크롤링 결과 예시
#         data = {
#             'articleNo': "A123456",
#             'articleName': "강남역 인근 원룸",
#         }
#         await insert_property(conn, data)
#
#         # 확인용 SELECT
#         result = await conn.fetch('SELECT * FROM property ORDER BY property_id DESC LIMIT 5')
#         for row in result:
#             print(dict(row))
#     await pool.close()
#
# if __name__ == '__main__':
#     asyncio.run(main())
