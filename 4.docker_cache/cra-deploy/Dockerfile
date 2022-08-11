FROM node:14-alpine as builder

WORKDIR /code

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
# 将当前 目录下的全部文件 添加到 工作目录 code 
ADD package.json yarn.lock /code/
RUN yarn

ADD . /code
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine

# 从前前置阶段的node 镜像中拷贝文件到当前的Nginx 镜像 
COPY --from=builder code/build /usr/share/nginx/html