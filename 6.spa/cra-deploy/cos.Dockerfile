FROM node:14-alpine as builder

ARG secretid=YOBKpjIfopIX0Mp4Umra4B9E/FHAm2aeqRn5wToXCTnMQ2DRhTJb1tia/rx64QIZ
ARG secretkey=k3yS/zvSiIAwVcb+hzC11UHptqnv55jLBPksPSTnbxPeQ1lHjB+NSA6psd9+JBIz
ARG endpoint=cos.ap-shanghai.myqcloud.com
ENV PUBLIC_URL https://cra-deploy-1312334865.cos.ap-shanghai.myqcloud.com/

WORKDIR /code

# 为了更好的缓存，把它放在前边

## 下载 到指定目录 并重命名 
RUN wget https://github.com/tencentyun/coscli/releases/download/v0.11.1-beta/coscli-linux -O /usr/local/bin/ossutil \
  && mv coscli-linux coscli /usr/local/bin/ossutil \
  && chmod 755  coscli /usr/local/bin/ossutil \
  && coscli config  set -i $secretid -k $secretkey -e $endpoint

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn

ADD . /code
RUN npm run build && npm run cos:script

# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/build /usr/share/nginx/html