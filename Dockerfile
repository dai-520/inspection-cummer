  
FROM node:8.11.2
# 设置时区
# RUN apk --update add tzdata \
#     && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#     && echo "Asia/Shanghai" > /etc/timezone \
#     && apk del tzdata

RUN mkdir -p /usr/src/node-app/egg-consumer
WORKDIR /usr/src/node-app/egg-consumer
COPY ./package.json /usr/src/node-app/egg-consumer/package.json
RUN npm i --registry=https://registry.npm.taobao.org

ADD ./egg-consumer.tar.gz /usr/src/node-app/egg-consumer
EXPOSE 7001
CMD npm run dev