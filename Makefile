all: wordpress mariadb nginx

website:
	docker build website/ -t website
	docker run --rm --name website -p 8080:8080 -itd website

minecraft:
	docker build minecraft/ -t minecraft
	docker run --name minecraft -p 25565:25565 -itd minecraft

nginx:
	docker build NGINX/ -t nginx
	docker run --name nginx -v wordpressvol:/var/www/html -p 80:80 --network=my_network -itd nginx
	# docker run --rm --name nginx -v wordpressvol:/var/www/html -p 80:80 --network=my_network -itd nginx

mariadb:
	docker build MariaDB/ -t mariadb
	docker run --name mariadb -p 3306:3306 --network=my_network -itd mariadb
	# docker run --rm --name mariadb -p 3306:3306 --network=my_network -itd mariadb

wordpress:
	docker build WordPress/ -t wordpress
	docker run --name wordpress -v wordpressvol:/var/www/html -p 9000:9000 --network=my_network -itd wordpress
	# docker run --rm --name wordpress -v wordpressvol:/var/www/html -p 9000:9000 --network=my_network -itd wordpress

setup/node_modules:
	cd setup && npm i node-fetch

# compose: setup/node_modules
compose:
	docker compose up -d
	# cd setup && node main.js

clean:
	docker stop $$(docker ps -qa); docker rm $$(docker ps -qa); docker rmi -f $$(docker images -qa); docker volume rm $$(docker volume ls -q); docker network rm $$(docker network ls -q)

re: clean compose

.PHONY: nginx mariadb wordpress minecraft website