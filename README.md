# MENTALK : 커피챗 매칭 사이트

멘토와 멘티를 이어주는 커피챗 매칭 서비스

2025 올해의 컬러 **PANTONE 17-1230 Mocha Mousse** 컬러를 포인트 컬러로 사용하여 커피 색상을 연상시켜 부드럽고 편안한 느낌을 줌
![팬톤](https://github.com/user-attachments/assets/ce64bccf-0532-41ad-a4ff-ed4da39c6d69)

<br>

# 기술 스택

FE
<br>
<code>Next.js</code> `TypeScript` `SCSS` `Socket.io` `axios`

BE
<br>
`MongoDB` `Node.js` `Express` `JavaScript`

TOOL
<br>
`Swagger` `Postman` `Figma` `Notion` `ERD-Cloud`

<br>

## **Team POCHACO**

김미래(PM, FE, Design), 임새별(FE, BE(채팅 구현), Design)

박준성(BE), 박하성(BE)

<br>

## 기간

<strong>2024.12.04 ~ 2024.12.30</strong>

1주차 (12.04 ~12.11) : 브레인 스토밍 및 주제 선정, 산출물 (ERD, 플로우차트, 화면설계도) 제작

2, 3주차 (12.12 ~ 12.27) : 기능 구현

4주차 (12.30 ~ 12.31) : 테스트

<br>

## ERD

![ERD](https://github.com/user-attachments/assets/405bfab8-d088-44ba-a95c-15e49b2f1c0a)

<br>

## 화면 흐름도

![flow chart](https://github.com/user-attachments/assets/5c10f075-723f-406b-8f6a-d0df05369f47)

피그마 내 피그잼 기능을 활용하여 흐름도 구성

<br>

## 기능 명세서

노션 데이터베이스와 Swagger를 활용하여 기능 명세서 확인

<img width="1338" alt="Job list" src="https://github.com/user-attachments/assets/aae79d44-5a53-40ed-8622-fe9e8c5c8266" />

![Swagger](https://github.com/user-attachments/assets/953f896b-e359-4702-a12f-c7afb6e2d97e)

<br>

## 구현 페이지

- 인덱스 (`/`)
- 로그인 (`/login`)
- 회원가입 (`/signup`)
- 아이디 찾기 (`/find/id`)
- 비밀번호 찾기 (`/find/pw`)
- 마이페이지
  - 내 정보 (`/my`)
  - 내 정보 수정 (`/my/edit`)
  - 커피챗 목록 (`/my/coffechat`)
  - 채팅(커피챗) (`/my/chatting/:chattingId`)
  - 리뷰 (`my/review`)
  - [멘토] 소개 페이지 (`/my/introduce`)
  - [멘티] 즐겨찾기 (`/my/favorite`)
- 멘토 찾기 (`/with/us`)
- 멘토 소개 페이지 (`/with/:id`)
- 커피챗 신청 (`/wanted/:id`)
