import os
from pathlib import Path

from dotenv import load_dotenv

try:
    env_path = Path(__file__).resolve().parents[2] # .env 파일 경로
    load_dotenv(dotenv_path=env_path / ".env") # .env 불러오기
except Exception as e:
    print(f'.env 파일 로드 중 에러 발생: {e}')

try:
    DB_CONFIG = {
        'database': os.getenv('POSTGRES_DB'),
        'user': os.getenv('POSTGRES_USER'),
        'password': os.getenv('POSTGRES_PASSWORD'),
        'host': os.getenv('POSTGRES_HOST', 'localhost'),
        'port': os.getenv('POSTGRES_PORT')
    }
except Exception as e:
    print(f'DB 환경 변수 설정 중 에러 발생: {e}')
    DB_CONFIG = {}