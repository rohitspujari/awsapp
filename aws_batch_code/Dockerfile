FROM amazonlinux:latest

RUN yum -y update; mkdir /opt/upload_video
RUN curl --silent --location https://rpm.nodesource.com/setup_9.x | bash - ;  yum -y install nodejs
WORKDIR /opt/upload_video
ADD package.json /opt/upload_video/package.json
ADD index.js /opt/upload_video/index.js
RUN npm install
CMD ["/bin/bash"]