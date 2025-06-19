# Stage 1: Build ứng dụng NestJS
FROM node:20 AS builder

# Thư mục làm việc bên trong container
WORKDIR /app

# Copy file cấu hình package và cài đặt dependency
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn và build
COPY . .
RUN npm run build

# Stage 2: Tối ưu cho Production
FROM node:20-alpine

WORKDIR /app

# Chỉ copy những thứ cần thiết cho production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/.env .env

# cập nhật hệ thống và giảm lỗ hổng bảo mật
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

RUN npm install --omit=dev

# Cổng mà ứng dụng lắng nghe (nên khai báo trong .env)
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["node", "dist/main"]
