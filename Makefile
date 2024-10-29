lint-frontend:
	make -C frontend lint

install:
	npm ci

fullinstall:
	npm ci
	make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
  make fullinstall
	rm -rf frontend/dist
	npm run build

git-add-all:
	git status
	git add --all