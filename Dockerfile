FROM nginx
RUN apt -y update
RUN apt -y upgrade
RUN apt -y install curl git procps
RUN rm -rf /etc/nginx
RUN ln -sf /app/etc/nginx /etc/nginx
WORKDIR /app
COPY ./ ./

