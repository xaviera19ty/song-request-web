FROM node:24-alpine AS build
WORKDIR /app
# 版本由 package.json 的 packageManager 決定
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# 先打包 OBS 疊加層到 public/overlay/，再建 Nuxt
RUN pnpm build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV NODE_ENV=production PORT=3100
EXPOSE 3100
USER node
CMD ["node", ".output/server/index.mjs"]
