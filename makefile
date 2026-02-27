DC=docker compose

.PHONY: build up down restart logs ps clean shell-s1 shell-s2

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
.PHONY: help 

rebuild:
	$(DC) up -d --build --force-recreate

build:
	$(DC) build

dev:
	$(DC) up --watch
.PHONY: dev

up:
	$(DC) up -d

down:
	$(DC) down

restart: down up 

logs: 
	$(DC) logs -f

ps: 
	$(DC) ps

clean:
	$(DC) down --rmi local

reboot: down clean build dev
.PHONY: reboot
