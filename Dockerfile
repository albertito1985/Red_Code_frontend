FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG NG_BACKEND_HOST=redcodebackend-production.up.railway.app
ARG NG_BACKEND_PORT=0

ENV NG_BACKEND_HOST=${NG_BACKEND_HOST}
ENV NG_BACKEND_PORT=${NG_BACKEND_PORT}

RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist/red-code-frontend/ /usr/share/nginx/html/

RUN cat <<'EOF' >/etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|mjs|json|ico|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]