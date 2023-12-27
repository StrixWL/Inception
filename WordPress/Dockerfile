FROM debian:bookworm

RUN apt update
RUN apt install unzip -y
RUN apt install wget -y
RUN apt install php php-curl php-fpm php-bcmath php-gd php-soap php-zip php-curl php-mbstring php-mysqlnd php-gd php-xml php-intl php-zip -y

RUN wget https://wordpress.org/latest.zip
RUN unzip latest.zip -d /var/www/html/ && rm latest.zip

RUN echo "\nlisten = wordpress:9000" >> /etc/php/8.2/fpm/pool.d/www.conf

RUN chown -R www-data:www-data /var/www/html/

RUN cd /var/www/html/wordpress && wget https://github.com/vrana/adminer/releases/download/v4.7.8/adminer-4.7.8.php -O adminer.php


CMD ["php-fpm8.2", "-F"]