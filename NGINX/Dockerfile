FROM debian:bookworm

RUN apt update
RUN apt install unzip -y
RUN apt install nginx -y
RUN apt install nodejs -y
RUN apt install curl -y

COPY ./configfile.txt /etc/nginx/sites-enabled/default

COPY ./script.sh /script.sh
COPY ./script.js /script.js

CMD ["bash", "script.sh"]
