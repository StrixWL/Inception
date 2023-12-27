FROM debian:bookworm

RUN apt update
RUN apt install npm --no-install-recommends -y
RUN apt install nginx -y

COPY ./configfile.txt /etc/nginx/sites-enabled/default
COPY ./website /website
RUN cd /website && npm i && npm run build

CMD ["nginx", "-g", "daemon off;"]
