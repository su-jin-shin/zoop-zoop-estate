package com.zoop;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ZoopApplication {

	public static void main(String[] args) {
		loadEnvIfExists();
		SpringApplication.run(ZoopApplication.class, args);
	}

	private static void loadEnvIfExists() {
		// .env 파일 로드
		Dotenv dotenv = Dotenv.configure()
				.directory("../")
				.ignoreIfMissing() // .env 파일이 없으면 종료
				.load();

		// 환경 변수로 등록
		System.setProperty("POSTGRES_PORT", dotenv.get("POSTGRES_PORT"));
		System.setProperty("POSTGRES_DB", dotenv.get("POSTGRES_DB"));
		System.setProperty("POSTGRES_USER", dotenv.get("POSTGRES_USER"));
		System.setProperty("POSTGRES_PASSWORD", dotenv.get("POSTGRES_PASSWORD"));
	}

}
