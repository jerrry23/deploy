<!--
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-06-17 10:50:16
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-06-17 11:24:46
 * @FilePath: \deploy\2.docker部署\readme.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


## 借助doker进行部署 

1. 启动本地静态服务器  npx start 

2. 添加Dockerfile 文件 
```js

# 选择一个体积小的镜像 (~5MB)
FROM node:14-alpine

# 设置为工作目录，以下 RUN/CMD 命令都是在工作目录中进行执行
WORKDIR /1

# 把代码置于镜像
ADD . /1

# 装包
RUN yarn

EXPOSE 3000

# 启动 Node Server
CMD npm start

```

3. 构建镜像 image 

# 在此之前有一定要运行docker （启动Docker DeskTop）
# 命令行 切换到Dockerfile 文件所在的根目录

# 创建 一个名为 simple-app 的镜像
# -t: "name:tag" 构建镜像名称
docker build -t simple-app .

# 此时可以通过docker images 查看镜像的情况 

4. 运行容器 
# 根据该镜像运行容器
# 如果需要在后台运行则添加 -d 选项
# --rm: 当容器停止运行时，自动删除容器
# -p: 3000:3000，将容器中的 3000 端口映射到宿主机的 3000 端口，左侧端口为宿主机端口，右侧为容器端口
docker run --rm -p 3000:3000 simple-app

# 运行成功后可在另一个窗口查看所有容器
$ docker ps