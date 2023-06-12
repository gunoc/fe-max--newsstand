export default {
  // 테스트 파일을 찾을 디렉토리 설정
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  // TypeScript 파일 지원
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
