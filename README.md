# MoveMap – Mobile Fitness Tracking App

## 📱 Overview

**MoveMap**은 아이의 운동 활동을 기록하고 주변 운동 시설을 탐색할 수 있는 **생활형 운동 기록 플랫폼**입니다.  
사용자는 위치 기반 자동 체크인과 운동 기록 기능을 통해 활동 데이터를 축적할 수 있으며, 지역 리그와 점수 시스템을 통해 지속적인 운동 참여를 유도합니다.

이 프로젝트는 공모전에서 진행된 **팀 프로젝트**로, 실제 **원스토어에 출시된 모바일 애플리케이션**입니다.

---

## 👩‍💻 My Role (Frontend Developer)

프론트엔드 개발을 담당하며 다음 기능을 구현했습니다.

- 로그인 / 회원가입 화면 구현
- 카카오 소셜 로그인 연동
- 위치 기반 **자동 체크인 기능**
- 수동 운동 기록 기능
- 운동 점수 확인 화면
- 지역 리그 화면
- 부모용 아이 운동 리포트 화면
- 리뷰 화면
- API 연동 및 데이터 상태 관리

특히 **위치 기반 자동 체크인 기능**을 구현하며 실시간 좌표 기반 이벤트 처리와 기록 중복 방지 로직을 설계했습니다.

---

## 🛠 Tech Stack

### Frontend
- React Native
- Expo
- JavaScript

### State / Storage
- React Hooks
- AsyncStorage

### Navigation
- React Navigation

### API
- REST API

### Location
- Expo Location

---

## ✨ Key Features

### 📍 Location-based Auto Check-in

사용자의 실시간 위치를 기반으로 특정 운동 시설 반경 내에 접근하면 자동으로 체크인이 발생하도록 구현했습니다.

- 실시간 위치 좌표 추적
- 특정 반경 내 이벤트 발생
- 중복 체크인 방지 상태 관리

---

### 🏃 Exercise Recording System

사용자는 운동 활동을 자동 또는 수동으로 기록할 수 있습니다.

- 자동 체크인 기록
- 수동 운동 기록
- 운동 점수 계산

---

### 🏆 Local League System

지역 기반 운동 데이터를 활용하여 리그 순위를 제공하고 사용자 참여를 유도합니다.

---

### 👨‍👩‍👧 Parent Report Feature

부모 계정에서 아이의 운동 기록 데이터를 확인할 수 있는 리포트 화면을 구현했습니다.

---

## 📂 Project Structure

MoveMap

|- assets
|- src
||- api
||- components
||- data
||- hooks
||- screens
||- utils
|
 |- App.js
 |- app.config.js
 |- package.json


---

## 🔐 Security Notice

이 저장소는 **포트폴리오 공개용으로 정리된 프로젝트**입니다.  
보안상 민감한 환경 변수 및 API 키는 제거하거나 환경 변수로 분리되어 있습니다.

---

## 🚀 What I Learned

이 프로젝트를 통해 다음과 같은 역량을 키울 수 있었습니다.

- React Native 기반 모바일 앱 개발 경험
- 위치 기반 서비스 기능 구현
- REST API 연동 및 데이터 흐름 이해
- 팀 프로젝트 협업 경험
- 사용자 중심 UI/UX 설계

---

## 👥 Team Project

이 프로젝트는 다음과 같은 팀 구성으로 진행되었습니다.

- Frontend Developer ×2
- Backend Developer ×2
- Planner ×1

공모전 기간 동안 기능 구현과 테스트를 진행하여 **실제 앱 출시까지 완료**했습니다.

---

## 📌 Notes

- 일부 환경 변수 및 API 키는 보안상 제거되었습니다.
- 본 저장소는 포트폴리오 목적으로 정리된 버전입니다.

---
