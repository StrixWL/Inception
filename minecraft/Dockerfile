FROM debian:bookworm

RUN apt update
RUN apt install openjdk-17-jre -y
RUN mkdir minecraft_server
RUN apt install wget -y
RUN cd minecraft_server && wget https://launcher.mojang.com/v1/objects/c8f83c5655308435b3dcf03c06d9fe8740a77469/server.jar
COPY ./server.properties minecraft_server/server.properties
COPY ./eula.txt minecraft_server/eula.txt
COPY ./script.sh /script.sh

CMD ["bash", "script.sh"]

