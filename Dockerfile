FROM node:18 as build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# GitHub Secret에서 가져온 index.ts 파일로 교체
# 이 부분은 GitHub Actions workflow에서 처리되어야 합니다
ARG INDEX_TS_CONTENT
RUN if [ ! -z "$INDEX_TS_CONTENT" ]; then \
    echo "$INDEX_TS_CONTENT" > src/services/index.ts; \
    fi

# 프로덕션용 빌드
RUN npm run build

# 실행 스테이지
FROM nginx:alpine

# 빌드된 파일들을 Nginx의 서비스 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 80 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]