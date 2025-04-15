# 프로젝트명

## 프로젝트 개요

- 카카오 책 검색 API를 활용한 도서 검색 서비스입니다.
- **효율적인 상태 관리**: Next.js와 React Query를 활용한 최적화된 데이터 관리
- **사용자 중심 UX**: 무한 스크롤, 스켈레톤 UI, 토스트 메시지 등 구현
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화된 UI/UX 제공
- **lodash**: 검색 입력 디바운싱 처리

## 실행 방법

### 환경 설정

1. 환경 변수 설정

```bash
NEXT_PUBLIC_KAKAO_API_KEY=``
NEXT_PUBLIC_KAKAO_API_BASE_URL=https://dapi.kakao.com/v3
```

2. 의존성 설치

```bash
pnpm install
```

3. 개발 서버 실행

```bash
pnpm dev
```

## 폴더 구조

```bash
src/
├── app/                   # Next.js app router
│   ├── search/            # 도서 검색 페이지
│   │   ├── api/           # 검색 관련 API
│   │   └── components/    # 검색 관련 컴포넌트
│   ├── favorites/         # 찜한 책 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # 공통 컴포넌트
├── constants/             # 상수 정의
├── hooks/                 # 커스텀 훅
└── types/                 # 타입 정의
```

### API 통신 및 상태 관리

- React Query를 사용하여 서버 상태 관리 및 캐싱 구현

### 사용된 주요 라이브러리

- **@tanstack/react-query**:
  서버 상태 관리의 효율성과 직관적인 데이터 페칭 로직 구현을 위해 사용

- **shadcn/ui**: 커스터마이징 가능한 컴포넌트와 접근성 대응이 잘 되어 있어 빠르게 UI를 구성

- **Tailwind CSS**: 빠른 UI prototyping과 반응형 스타일링 구현을 위해 사용

## 주요 기능 하이라이트

### 1. 도서 검색 기능

- 제목/저자/출판사별 상세 검색
- 최근 검색어 기록 및 관리

### 2. 무한 스크롤

- Intersection Observer를 활용한 페이징처리
- 스크롤 위치에 따른 API 호출

### 3. 찜하기 기능

- localStorage를 활용한 영구적인 데이터 저장
- 토스트 메시지를 통한 즉각적인 사용자 피드백

### 4. 사용자 경험 최적화

- 반응형 디자인
- '상단으로 이동' 버튼
- 로딩 상태에 대한 시각적 피드백 (스켈레톤 UI)

### 5. 성능 최적화

- 이미지 최적화 및 지연 로딩 구현
- 컴포넌트 렌더링 최적화
  - useCallback을 활용한 이벤트 핸들러 메모이제이션
  - lodash debounce를 활용한 검색 입력 최적화
