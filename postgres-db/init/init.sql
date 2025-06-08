CREATE TABLE "property" (
	"property_id"	BIGINT		NOT NULL,
	"realty_id"	BIGINT		NOT NULL,
	"complex_id"	BIGINT		NOT NULL,
	"article_no"	VARCHAR		NULL,
	"article_name"	VARCHAR		NULL,
	"ptp_name"	VARCHAR		NULL,
	"trade_complete_yn"	VARCHAR		NULL,
	"apt_name"	VARCHAR		NULL,
	"apt_heat_method_type_name"	VARCHAR		NULL,
	"heat_method_type_name"	VARCHAR		NULL,
	"apt_heat_fuel_type_name"	VARCHAR		NULL,
	"heat_fuel_type_name"	VARCHAR		NULL,
	"apt_household_count"	VARCHAR		NULL,
	"household_count"	VARCHAR		NULL,
	"apt_use_approve_ymd"	VARCHAR		NULL,
	"building_use_aprv_ymd"	VARCHAR		NULL,
	"realestate_type_name"	VARCHAR		NULL,
	"trade_type_name"	VARCHAR		NULL,
	"city_name"	VARCHAR		NULL,
	"division_name"	VARCHAR		NULL,
	"section_name"	VARCHAR		NULL,
	"walking_time_to_near_subway"	VARCHAR		NULL,
	"room_count"	VARCHAR		NULL,
	"bathroom_count"	VARCHAR		NULL,
	"move_in_type_name"	VARCHAR		NULL,
	"move_in_possible_ymd"	VARCHAR		NULL,
	"article_feature_description"	VARCHAR		NULL,
	"detail_description"	VARCHAR		NULL,
	"parking_possible_yn"	VARCHAR		NULL,
	"principal_use"	VARCHAR		NULL,
	"main_purps_cd_nm"	VARCHAR		NULL,
	"floor_info"	VARCHAR		NULL,
	"deal_or_warrant_prc"	VARCHAR		NULL,
	"area1"	VARCHAR		NULL,
	"area2"	VARCHAR		NULL,
	"direction"	VARCHAR		NULL,
	"article_feature_desc"	VARCHAR		NULL,
	"same_addr_max_prc"	VARCHAR		NULL,
	"same_addr_min_prc"	VARCHAR		NULL,
	"direction_base_type_name"	VARCHAR		NULL,
	"entrance_type_name"	VARCHAR		NULL,
	"life_facilities"	VARCHAR		NULL,
	"security_facilities"	VARCHAR		NULL,
	"etc_facilities"	VARCHAR		NULL,
	"total_floor_count"	VARCHAR		NULL,
	"corresponding_floor_count"	VARCHAR		NULL,
	"article_real_estate_type_name"	VARCHAR		NULL,
	"building_type_name"	VARCHAR		NULL,
	"apt_parking_count"	VARCHAR		NULL,
	"parking_count"	VARCHAR		NULL,
	"latitude"	DOUBLE PRECISION		NULL,
	"longitude"	DOUBLE PRECISION		NULL,
	"building_name"	VARCHAR		NULL,
	"apt_parking_count_per_household"	VARCHAR		NULL,
	"exposure_address"	VARCHAR		NULL,
	"expose-start-ymd"	VARCHAR		NULL,
	"rent_price"	DECIMAL		NULL,
	"deal_price"	DECIMAL		NULL,
	"warrant_price"	DECIMAL		NULL,
	"all_warrant_price"	DECIMAL		NULL,
	"all_rent_price"	DECIMAL		NULL,
	"price_by_space"	DECIMAL		NULL,
	"acquisition_tax"	DECIMAL		NULL,
	"regist_tax"	DECIMAL		NULL,
	"special_tax"	DECIMAL		NULL,
	"edu_tax"	DECIMAL		NULL,
	"finance_price"	DECIMAL		NULL,
	"etc_fee_amount"	DECIMAL		NULL,
	"tag_list"	VARCHAR		NULL,
	"created_at"	TIMESTAMP		NULL,
	"updated_at"	TIMESTAMP		NULL,
	"deleted_at"	TIMESTAMP		NULL
);

CREATE TABLE "realty" (
	"realty_id"	BIGINT		NOT NULL,
	"establish_registration_no"	VARCHAR		NULL,
	"realtor_name"	VARCHAR		NULL,
	"representative_name"	VARCHAR		NULL,
	"address"	VARCHAR		NULL,
	"representative_tel_no"	VARCHAR		NULL,
	"cell_phone_no"	VARCHAR		NULL,
	"deal_count"	BIGINT		NULL,
	"lease_count"	BIGINT		NULL,
	"rent_count"	BIGINT		NULL,
	"max_broker_fee"	DECIMAL		NULL,
	"broker_fee"	DECIMAL		NULL,
	"created_at"	TIMESTAMP		NULL,
	"updated_at"	TIMESTAMP		NULL,
	"deleted_at"	TIMESTAMP		NULL
);

-- 이미지 ENUM 타입 정의
CREATE TYPE image_type_enum AS ENUM (
  'REPRESENTATIVE', 'SITE', 'FLOOR_PLAN', 'STRUCTURE', 'VR', 'COMPLEX', 'OTHER'
);

CREATE TABLE "image" (
	"image_id"	BIGINT		NOT NULL,
	"property_id"	BIGINT		NOT NULL,
	"complex_id"	BIGINT		NOT NULL,
	"image_url"	VARCHAR		NULL,
	"image_type"	image_type_enum		NULL,
	"image_order"	BIGINT		NULL,
	"is_main"	BOOLEAN		NULL,
	"created_at"	TIMESTAMP		NULL,
	"updated_at"	TIMESTAMP		NULL,
	"deleted_at"	TIMESTAMP		NULL
);

CREATE TABLE "complex" (
	"complex_id"	BIGINT		NOT NULL,
	"complex_no"	BIGINT		NULL,
	"complex_name"	VARCHAR		NULL
);

ALTER TABLE "property" ADD CONSTRAINT "PK_PROPERTY" PRIMARY KEY (
	"property_id"
);

ALTER TABLE "realty" ADD CONSTRAINT "PK_REALTY" PRIMARY KEY (
	"realty_id"
);

ALTER TABLE "image" ADD CONSTRAINT "PK_IMAGE" PRIMARY KEY (
	"image_id"
);

ALTER TABLE "complex" ADD CONSTRAINT "PK_COMPLEX" PRIMARY KEY (
	"complex_id"
);
