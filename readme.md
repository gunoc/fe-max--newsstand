# 뉴스스탠드 프로젝트

<details>
<summary>📌 Week1 TODO</summary>

- [] 프론트엔드 빌드와 환경구성

  - [] vitest 기반의 빌드환경
  - [] typescript 를 구성하고, typescript 기반으로 코드를 구현할 준비

- [] eslint, prettier설정
- [] script 파일 작성

- [] 데이터 크롤링

  - [] DOM API를 활용해서 브라우저 콘솔에서 가져온다
  - [] 가져온 데이터는 JSON 형식에 맞춰서 JSON데이터로 구성
  - [] 크롤링한 코드도 커밋하고 소스파일로 관리

- [] 프로그래밍 설계

  - [] feature list 뽑기 : 기획서 요구사항을 분석
  - [] 설계서 : 프로그램을 어떻게 만들것인지 계획을 수립
  - [] 클래스구성 또는 개발순서, 프로그래밍 동작흐름 등 자유롭게 계획수립
  - [] 작성페이지 : github wiki 또는 notion 등 추천

- [] CSS
  - [] CSS 중복 요소를 최소한
  - [] CSS 함수도 활용
  - [] 단위를 em, rem 을 골고루 활용해보고, rem을 좀더 많이
  - [] CSS Grid 를 활용
  - [] css stacking context 개념 학습

</details>

# 일지

# 학습

## 빌드와 환경구성

## 즉각적인 재로딩

1. Vite는 즉각적인 재로딩을 제공

- 즉, 전체 페이지를 다시 로드할 필요 없이 코드 변경 사항이 브라우저에 즉시 반영된다
- 이를 통해 개발 프로세스 속도가 빨라지고 코드 테스트 및 디버깅이 더 쉬워진다

2. 최적화된 빌드 시간

- Vite는 최소한의 오버헤드에 중점을 두고 빠른 빌드 시간에 최적화되어 있다 메모리 내 캐싱 및 빠른 증분 빌드를 사용하여 애플리케이션을 컴파일하고 빌드하는 데 필요한 시간을 최소화
- 그 결과 빌드 시간이 단축되고 보다 효율적인 개발 환경이 제공

3. 효율적인 코드 분할

- Vite는 효율적인 코드 분할을 사용하여 사용자가 현재 페이지에 필요한 코드만 다운로드하도록 하여 로드 시간을 단축하고 사용자 경험을 향상시킨다
- 이는 로드 시간이 병목 현상이 될 수 있는 크고 복잡한 애플리케이션에 특히 중요하다

4. 빠르고 가벼움

- Vite는 빠르고 가벼워지도록 설계되어 크고 작은 응용 프로그램 모두에 탁월한 선택입니다
- 최소한의 설정과 구성이 필요하며 초보자도 쉽게 사용하고 이해할 수 있다

5. 기본 ES 모듈 지원

- Vite는 JavaScript 모듈의 최신 표준인 기본 ES 모듈(ESM) 형식을 지원
- 이를 통해 모듈을 보다 빠르고 효율적으로 로드할 수 있으며 보다 깨끗하고 유지 관리 가능한 코드베이스를 제공한다
