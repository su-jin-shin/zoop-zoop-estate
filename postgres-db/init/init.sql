CREATE TABLE "property" (
	"property_id" 	BIGINT 	PRIMARY KEY,
	"realty_id"	BIGINT		NULL,
	"complex_id"	BIGINT		NULL,
	"article_no"	VARCHAR		NOT NULL,
	"article_name"	VARCHAR		NULL,
	"apt_name"	VARCHAR		NULL,
	"building_name"	VARCHAR		NULL,
	"trade_complete_yn"	VARCHAR		NULL,
	"heat_method_type_name"	VARCHAR		NULL,
	"heat_fuel_type_name"	VARCHAR		NULL,
	"household_count"	VARCHAR		NULL,
	"use_approve_ymd"	VARCHAR		NULL,
	"real_estate_type_name"	VARCHAR		NULL,
	"trade_type_name"	VARCHAR		NULL,
	"city_name"	VARCHAR		NULL,
	"division_name"	VARCHAR		NULL,
	"section_name"	VARCHAR		NULL,
	"walking_time_to_near_subway"	VARCHAR		NULL,
	"room_count"	VARCHAR		NULL,
	"bathroom_count"	VARCHAR		NULL,
	"move_in_type_name"	VARCHAR		NULL,
	"move_in_possible_ymd"	VARCHAR		NULL,
	"article_feature_description"	TEXT		NULL,
	"detail_description"	TEXT		NULL,
	"parking_possible_yn"	VARCHAR		NULL,
	"principal_use"	VARCHAR		NULL,
	"main_purps_cd_nm"	VARCHAR		NULL,
	"floor_info"	VARCHAR		NULL,
	"deal_or_warrant_prc"	VARCHAR		NULL,
	"area1"	VARCHAR		NULL,
	"area2"	VARCHAR		NULL,
	"direction"	VARCHAR		NULL,
	"article_feature_desc"	TEXT		NULL,
	"same_addr_max_prc"	VARCHAR		NULL,
	"same_addr_min_prc"	VARCHAR		NULL,
	"direction_base_type_name"	VARCHAR		NULL,
	"entrance_type_name"	VARCHAR		NULL,
	"life_facilities"	JSONB		NULL,
	"security_facilities"	JSONB		NULL,
	"etc_facilities"	JSONB		NULL,
	"total_floor_count"	VARCHAR		NULL,
	"corresponding_floor_count"	VARCHAR		NULL,
	"parking_count"	VARCHAR		NULL,
	"parking_count_per_household"	VARCHAR		NULL,
	"latitude"	DOUBLE PRECISION		NULL,
	"longitude"	DOUBLE PRECISION		NULL,
	"exposure_address"	VARCHAR		NULL,
	"expose_start_ymd"	VARCHAR		NULL,
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
	"tag_list"	JSONB		NULL,
	"created_at"	TIMESTAMP		DEFAULT NOW(),
	"updated_at"	TIMESTAMP		DEFAULT NOW(),
	"deleted_at"	TIMESTAMP		NULL,
	CONSTRAINT unique_article_no UNIQUE ("article_no")
);

CREATE TABLE "realty" (
	"realty_id" 	 	BIGINT	PRIMARY KEY,
	"realtor_account_id" 	 	VARCHAR		NULL,
	"establish_registration_no"	VARCHAR		NOT NULL,
	"realtor_name"	VARCHAR		NULL,
	"representative_name"	VARCHAR		NULL,
	"address"	VARCHAR		NULL,
	"representative_tel_no"	VARCHAR		NULL,
	"cell_phone_no"	VARCHAR		NULL,
	"deal_count"	BIGINT		NULL,
	"lease_count"	BIGINT		NULL,
	"rent_count"	BIGINT		NULL,
	"broker_fee"	DECIMAL		NULL,
	"max_broker_fee"	DECIMAL		NULL,
	"created_at"	TIMESTAMP		DEFAULT NOW(),
	"updated_at"	TIMESTAMP		DEFAULT NOW(),
	"deleted_at"	TIMESTAMP		NULL,
	CONSTRAINT unique_establish_registration_no UNIQUE ("establish_registration_no")
);

-- 이미지 ENUM 타입 정의
CREATE TYPE image_type_enum AS ENUM (
  'STRUCTURE', 'PROPERTY', 'COMPLEX'
);

CREATE TABLE "image" (
	"image_id" 	 	BIGINT		PRIMARY KEY,
	"property_id"	BIGINT		NULL,
	"complex_id"	BIGINT		NULL,
	"image_url"		TEXT			NULL,
	"image_type"	image_type_enum		NULL,
	"image_order"	BIGINT		NULL,
	"is_main"		BOOLEAN		NULL,
	"created_at"	TIMESTAMP		DEFAULT NOW(),
	"updated_at"	TIMESTAMP		DEFAULT NOW(),
	"deleted_at"	TIMESTAMP		NULL,
	CONSTRAINT property_unique_image UNIQUE ("property_id", "image_type", "image_order"),
	CONSTRAINT complex_unique_image UNIQUE ("complex_id", "image_type", "image_order")
);

CREATE TABLE "complex" (
	"complex_id" 	BIGINT		PRIMARY KEY,
	"complex_no"	VARCHAR		NOT NULL,
	"complex_name"	VARCHAR		NULL,
	"created_at"	TIMESTAMP		DEFAULT NOW(),
	"updated_at"	TIMESTAMP		DEFAULT NOW(),
	"deleted_at"	TIMESTAMP		NULL,
	CONSTRAINT unique_complex_no UNIQUE ("complex_no")
);

-- 지역 ENUM 타입 정의
CREATE TYPE region_type_enum AS ENUM (
  'city', 'dvsn', 'sec'
);

CREATE TABLE "region" (
	"region_id" 	BIGINT		PRIMARY KEY,
	"cortar_no"		VARCHAR		NOT NULL,
	"cortar_name"	VARCHAR		NULL,
	"cortar_type"	region_type_enum	NULL,
	"parent_cortar_no"	VARCHAR		NULL,
	"center_lat"		DOUBLE PRECISION		NULL,
	"center_lon"	DOUBLE PRECISION		NULL,
	"full_cortar_name"	VARCHAR	NULL,
	"created_at"	TIMESTAMP		DEFAULT NOW(),
	"updated_at"	TIMESTAMP		DEFAULT NOW(),
	"deleted_at"	TIMESTAMP		NULL,
	CONSTRAINT unique_cortar_no UNIQUE ("cortar_no")
);

ALTER TABLE property
ALTER COLUMN property_id
ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE realty
ALTER COLUMN realty_id
ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE image
ALTER COLUMN image_id
ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE complex
ALTER COLUMN complex_id
ADD GENERATED ALWAYS AS IDENTITY;

ALTER TABLE region
ALTER COLUMN region_id
ADD GENERATED ALWAYS AS IDENTITY;