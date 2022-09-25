# 💻 Chat App

- React + Firebase 를 이용한 채팅 애플리케이션 구현

<br />

## 주요 기술 스택

- React v18
- TypeScript
- redux-toolkit
- styled-components
- Firebase v9
- craco
- react-hook-form

<br />

## 정리 문서

- [firebase](https://github.com/ssi02014/chat-app/blob/master/documents/firebase.md)

<br />

## Firebase?

- Firebase는 `구글`에서 개발한 모바일 또는 웹을 개발하기위한 플랫폼이다.
- Firebase는 애플리케이션을 구현하는데 기본적으로 필요한 `인증`, `데이터베이스`, `스토리지`, `푸시 알림`, `배포` 등의 기능을 포함한다.
  - 이중에서 `데이터베이스`의 기능이 특별하다. 왜? Firebase에서 사용하는 데이터베이스는 Mysql이나 오라클 같은 관계형 데이터베이스가 아닌 MongoDB 같은 `NoSQL 기반의 Document 형식`의 빠르고 간편한 데이터베이스이다.
  - 또한, RTSP라는 `Real Time Stream Protocol` 방식을 지원한다. RTSP는 실시간으로 데이터들을 전송해주는 방식이다. 이러한 방식 덕분에 실시간 기능이 필요한 `채팅`이나 `택시 앱`같은 것을 쉽게 구현이 가능하다.

<br />

## react-hook-form

<br />
