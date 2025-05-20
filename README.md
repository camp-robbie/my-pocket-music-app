# My Pocket App

My Pocket은 모바일 앱 디자인을 시각화하기 위한 React 기반 웹 애플리케이션입니다.

## 기능

- 다양한 모바일 앱 화면 디자인 모형 제공
- 반응형 디자인으로 다양한 기기에서 확인 가능
- 한국어 인터페이스 지원

## 개발 환경 설정

### 필수 요구사항

- Node.js 16.0.0 이상
- npm 8.0.0 이상

### 설치 방법

```bash
# 저장소 클론
git clone [저장소 URL]
cd my-pocket

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 배포 방법

### 빌드

```bash
# 프로덕션용 빌드 생성
npm run build
```

### 정적 호스팅

빌드 후 생성된 `dist` 디렉토리를 다음 서비스 중 하나에 배포할 수 있습니다:

1. **Vercel**
   ```bash
   # Vercel CLI 설치
   npm install -g vercel
   
   # 배포 (프로젝트 루트 디렉토리에서)
   vercel
   ```

2. **Netlify**
   ```bash
   # Netlify CLI 설치
   npm install -g netlify-cli
   
   # 배포
   netlify deploy --prod
   ```

3. **GitHub Pages**
   - `vite.config.js`의 `base` 경로를 리포지토리 이름으로 설정 (예: `/my-pocket/`)
   - GitHub Actions 워크플로우를 설정하거나 gh-pages 패키지를 사용하여 배포

4. **일반 웹 서버**
   - `dist` 디렉토리의 내용을 웹 서버의 적절한 디렉토리에 업로드
   - nginx, Apache 등의 웹 서버 설정에 맞게 조정

## 기술 스택

- React 19
- Vite 6
- JavaScript ES6+
- CSS3

## 작성자

- [작성자 이름]

## 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다.