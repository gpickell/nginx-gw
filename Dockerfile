FROM nginx
RUN apt -y update
RUN apt -y upgrade
RUN apt -y install curl git procps
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt -y install nodejs
RUN npm install yarn -g
RUN rm -rf /etc/nginx
WORKDIR /etc/nginx
COPY ./etc/nginx/ ./
WORKDIR /app
COPY ./ ./
WORKDIR /etc/nginx
CMD node /app/src/main.mjs
ENV REPO_URL https://github.com/gpickell/nginx-gw
