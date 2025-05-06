# 사용자 관리 어드민 페이지 - 사전과제

## 1. 프로젝트 개요

본 프로젝트는 기업용 관리자 사이트의 사용자 조회/관리 페이지입니다.
API 명세에 맞춰 사용자 데이터를 조회, 검색, 상세 확인, 수정, 삭제하는 기능을 제공합니다. 

## 2. 사용 기술 스택

* **Framework:** Next.js (v14 App Router)
* **UI:** React (v18)
* **언어:** TypeScript
* **Styling:** Tailwind CSS (Layout) 및 Material UI (MUI v5 Components)
* **State 관리:** React Query (TanStack Query v5), React Hooks
* **Data 호출:** Axios (custom client)
* **Form 관리:** React Hook Form
* **Component Testing:** Storybook (v8), Mock Service Worker (MSW)
* **Version Control:** Git & GitHub

### 기술 스택 선정 이유

* **Next.js & React:** 서버 컴포넌트와 클라이언트 컴포넌트를 활용해서 성능/개발 과정 최적화을 높일 수 있습니다. App Router를 사용해서 라우팅 및 레이아웃 관리를 효율적으로 할 수 있습니다.
* **TypeScript:** 정적 타이핑을 통해 개발 중 발생할 수 있는 오류를 사전에 방지할 수 있습니다.
* **React Query:** 서버 상태 관리를 효과적으로 처리하고 데이터 cashing, 백그라운드 업데이트, 로딩/에러 상태 관리 등을 더 잘 관리할 수 있습니다.
* **Material UI (MUI):** 사전과제에서 UI 가이드가 별도로 주어지지 않았기때문에, 완성도 높고 일관된 디자인 시스템을 빠르게 적용하기 위해 선택했습니다. `material-react-table`과 같은 라이브러리와의 호환성도 괜찮았습니다.
* **React Hook Form:** Form 상태 관리를 효율적으로 처리합니다.
* **Storybook & MSW:** 컴포넌트를 독립적인 환경에서 개발하고 visual 테스트하기 위해 선택했습니다. MSW를 통해 API 의존성 없이 안정적인 UI 테스트 환경을 구축할 수 있습니다. 

## 3. 주요 라이브러리

* `@tanstack/react-query`: 서버 상태 관리
* `@tanstack/react-table` & `material-react-table`: 데이터 테이블 구현 (정렬, 페이지네이션, 액션 등), 프로젝트 기능이 간단해서 MRT 라이브러리가 제공하는 테이블 구조로 구현하기 했습니다. 
* `axios`: HTTP 클라이언트 
* `react-hook-form`: Form 관리 및 유효성 검사
* `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`: Material UI 컴포넌트/styling
* `msw`, `msw-storybook-addon`: Storybook을 위한 API 모킹
* `@storybook/*`: 컴포넌트 개발 및 테스트 환경

## 4. 프로젝트 구조





## 5. 주요 기능 및 API 연동

구현된 주요 기능은 다음과 같습니다.
모든 데이터 관련 작업은 `/api` 경로의 내부 API 라우트를 통해 외부 Mockaroo API를 호출합니다.

* **사용자 목록 조회 및 검색:**
    * `GET /api/users` 호출 -> Mockaroo `GET /users` 호출
    * 검색 조건(`id`, `name`, `email`, `active`)을 Query Parameter로 전달합니다.
    * 페이지네이션(`page_index`, `page_size`) 기능이 구현되어 있습니다.
    * `SearchBar` 컴포넌트에서 검색 및 초기화 기능을 제공합니다.

* **사용자 상세 정보 보기:**
    * `GET /api/users/[id]` 호출  -> Mockaroo `GET /users/:id` 호출
    * 테이블의 '상세보기' 버튼 클릭하면면 `UserDetailsModal`이 열립니다. 해당 사용자의 상세 정보를 비동기적으로 로드해서서 표시합니다.

* **사용자 정보 수정:**
    * `POST /api/users/[id]` 호출 -> Mockaroo `POST /users/:id` 호출
    * 테이블의 '정보수정' 버튼 클릭 시 `UserEditModal`이 열립니다.
    * 모달 내에서 현재 사용자 정보를 불러오고 form에 표시합니다. 수정 후 '저장' 시 API를 통해 업데이트합니다.
    * 업데이트 성공 시 사용자 목록이 자동으로 리프레쉬됩니다. (`React Query`의 `invalidateQueries` 활용)

* **사용자 정보 삭제:**
    * `DELETE /api/users/[id]` 호출  -> Mockaroo `DELETE /users/:id` 호출
    * 테이블의 '사용자 삭제' 버튼 클릭 시 `ConfirmDeleteModal`을 통해 재확인합니다.
    * '삭제' 확인 시 API를 통해 사용자 정보를 삭제합니다.
    * 삭제 성공 시 사용자 목록이 자동으로 리프레쉬됩니다. (`React Query`의 `invalidateQueries` 활용)

## 6. 실행 방법

1.  **저장소 클론:**
    ```bash
    git clone url
    cd project명
    ```
2.  **환경 변수 설정:**
    * 프로젝트 루트에 `.env.local` 파일을 생성합니다.
    * 제공받은 `api_key`와 `auth_key`를 사용하고 아래 형식으로 환경 변수를 설정합니다.
        ```.env.local
        MOCKAROO_API_BASE_URL_PREFIX=[https://fabricate.mockaroo.com/api/v1/workspaces/danal/databases]
        MOCKAROO_API_KEY=API_KEY
        MOCKAROO_API_SUFFIX=/api
        MOCKAROO_AUTH_KEY=AUTH_KEY
        ```
3.  **의존성 설치:**
    ```bash
    npm install
    ```
4.  **개발 서버 실행:**
    ```bash
    npm run dev
    ```
    * 브라우저에서 `http://localhost:3000`로 접속합니다.

5.  **Storybook 실행 (컴포넌트 확인):**
    ```bash
    npm run storybook
    ```
    * 브라우저에서 `http://localhost:6006` 로 접속하여 각 UI 컴포넌트를 확인할 수 있습니다.

## 7. 테스트

* **Storybook:** 주요 UI 컴포넌트(`SearchBar`, `UserTable`, `UserDetailsView`, `UserUpdateModal` 등)에 대한 스토리를 작성했습니다.  다양한 state 와props에 따른 렌더링 결과을 확인할 수 있습니다.
* **Interaction Testing:** Storybook의 `play` 함수와 `@storybook/testing-library`를 사용했습니다. `SearchBar`와 같은 컴포넌트의 사용자 상호작용(입력, 클릭) 및 콜백 호출 여부를 자동화된 방식으로 테스트합니다. 
* **API Mocking:** `msw`와 `msw-storybook-addon`을 사용해서 Storybook 환경에서 API 호출을 모킹했습니다.



## 8. 버그 리포트 

### 1) 검색 버튼을 누르고고 API 요청은 잘 나가도 API 응답이 필터링 되지 않고 그대로 들어옵니다.

- **원인**  
   Next.js client사이드에서 query파람으로 검색 조건을 잘 던져주고 있어도 백엔드에서 필터링을 안하는것 같습니다. 

