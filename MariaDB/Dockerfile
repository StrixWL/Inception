FROM debian:bookworm

RUN apt update
RUN apt install mariadb-server -y

RUN sed -i '27d' /etc/mysql/mariadb.conf.d/50-server.cnf

# /etc/init.d/mariadb start
RUN service mariadb start && \
    mysql -e "CREATE DATABASE wordpress_db;" && \
    mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'wordpress_user'@'%' IDENTIFIED BY 'password';"

# yo?
CMD ["mariadbd", "--user=mysql"]
