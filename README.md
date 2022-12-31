# ESC

Everything Styles' Custom Keyboard \_ project

<br>

## 목차

1.  [기획](#프로젝트-소개)
2.  [설계](#기능)
3.  [디자인]()
4.  [개발]()
5.  [배포]()

- 커밋 내역 [[바로가기]](#커밋-내역)

  <br><br>

## PPT

![img]()
[[PPT 파일 바로가기]]()

###### 다운로드: 좌측 상단의 파일 > 다운로드

<br><br>

---

## 프로젝트 소개

키보드 커스터마이징 쇼핑몰 &amp; 커뮤니티 웹사이트

###### 해당 프로젝트는 이영규(본인)의 아이디어입니다.

## 기획

- 목적: 사용자가 자신에게 맞는 키보드를 조합하여 구매하거나 각종 키보드 관련 이야기를 할 수 있는 사이트
- 성공 기준:
  - 사용자가 원활하게 커스텀 키보드를 조합할 수 있는가.
  - 커뮤니티의 기능이 정상적으로 작동하는가.
- 사용층: 키보드를 구매하고 싶은 누구나
  - 10~20대
  - 게임을 좋아하는 사람
  - 키보드 사용 시간 많은 직장인
  - 컴퓨터 주변 기기에 관심이 많은 사람

### 수행 도구

| Components   | techology     |
| :----------- | :------------ |
| Client Build | npm , webpack |
| API testing  | POSTMAN       |
| Tool         | VSC           |
| UIdesign     | figma         |

## 설계

### 기능

- 키보드 커스터마이징 견적 내기 기능
- 커뮤니티 답글 작성 및 열람 기능
- 전체 상품 보기 기능
- 고객센터 챗봇 기능
- 이용자 취향에 맞는 키보드 추천 기능
- 메인화면 컬러테마 선택 기능

### 흐름도

![img]()

### DB

<br><br>

## 사이트 디자인

메인 색상:

  <!-- bgColor: #ffffff<br>
  
  frMainColor: #B6ABAB<br>
  cpMainColor: #997976<br>

  frSubColor1: #A9C5B9<br>
  frSubColor2: #C5DCD5<br>

  cpSubColor1: #F3C2BD<br>
  cpSubColor2: #ECD6D9<br>

  fontColor: #FFFFFF<br>
  fontSubColor: #736B6B<br> -->

<br>
글꼴:

- Noto Sans KR
- Gothic A1

<br>
디자인:

- UI / UX Tool : Figma

Img
![]()  
![]()
![]()

<br><br>

## 개발

### 사용 언어 :

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Nodejs](https://img.shields.io/badge/Nodejs-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Npm](https://img.shields.io/badge/Npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

<br>

### 사용 라이브러리 :

![.ENV](https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.ENV&logoColor=white)
![styled-components](https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Font-Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=Font-Awesome&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764abc?style=for-the-badge&logo=Redux&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5a29e4?style=for-the-badge&logo=Axios&logoColor=white)

### API testing

![Postman](https://img.shields.io/badge/Postman-ff6c37?style=for-the-badge&logo=Postman&logoColor=white)

## 배포

<!-- 둘중에 하나 지우기 -->

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white)

테스트 기간: 0000년 00월 00일 ~ 0000년 00월 00일

테스트 인원: 주변 지인 외 학교의 불특정 다수

배포 기간: 0000년 00월 00일 ~ 0000년 00월 00일

<br>

## 커밋 내역

### first commit

###### Dec 27, 2022

- CRA 생성 / 파일정리 / 폴더 구성
- logo 제작
- library 설치 및 설정
- Readme.me Updata

<br>

### MediaQuery

###### Dec 28, 2022

- layout 구조 생성
- useMediaQuery의 재사용성을 높여줄 useMedia CustomHook 제작

<br>

### mainLayOut_1

###### Dec 30, 2022 (Dec 29일 코드, 자정 지나고 업로드)

- colorTheme 설정
- Theme.palette 구성
- Header 부분제작

<br>

### mainLayOut_2

###### Dec 30, 2022

- Pc_HeaderLayOut
- Pc_FooterLayOut

<br>

### mainLayOut_3

###### Dec 31, 2022

- Mobile,Tablet_HeaderLayOut
- Mobile,Tablet_FooterLayOut
