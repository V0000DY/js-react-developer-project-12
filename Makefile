lint-frontend:
	make -C frontend lint

server-install:
	npm ci

install:
	npm ci
	make -C frontend install

start-frontend:
	make -C frontend develop

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/dist

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	npm run build

build-install:
	make install
	rm -rf frontend/dist
	npm run build


git-add-all:
	git status
	git add --all