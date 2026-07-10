# 데이트 초대장 메이커 💌

링크 하나로 보내는 데이트 초대장. DB·서버 없이 초대장 데이터를 Base64URL로 인코딩해 URL 해시에 담아 공유합니다.

## 기능

- 초대장 문구 프리셋: 한국어 / 영어 / 일본어
- 샘플 이미지 또는 외부 HTTPS 이미지 URL
- 날짜(최대 3개)·시간(날짜별 최대 6개) 후보 설정
- 음식 후보 2~6개 (이모지 + 이름)
- 도망가는 NO 버튼 (모바일 4회 / 데스크톱 20초)
- 실시간 미리보기, 결과 복사·공유 (Web Share API)

## 개발

```bash
npm install
npm run dev
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 정적 빌드 후 GitHub Pages에 배포합니다.
저장소 Settings → Pages에서 Source를 **GitHub Actions**로 설정해 주세요.

```bash
GITHUB_PAGES=true npm run build   # Pages용 빌드 (basePath: /invite-maker)
```
