.DEFAULT_GOAL := help
BOTNAME       := your-bot
PROJECT_ID    := your-project
PKG_VERSION   := $(shell node -pe "require('./package.json').version")

all:

init: ## Initialize repository
	@read -p "PROJECT_ID (GCP) is? " ID; echo "Initialize with your gcp project name: " $${ID}; grep -rl "your-project" . | xargs sed -i '' -e "s/your-project/$${ID}/g"
	@read -p "BOTNAME is? " BOT; echo "Initialize bot name with " $${BOT}; grep -rl "your-bot" . | xargs sed -i '' -e "s/your-bot/$${BOT}/g"

who-am-i: ## Echo botname
	@echo $(BOTNAME) $(PKG_VERSION)

build-image: ## Build
	docker build -t "gcr.io/$(PROJECT_ID)/$(BOTNAME):$(PKG_VERSION)" .

push-image: ## Push image to container registory
	gcloud docker -- push "gcr.io/$(PROJECT_ID)/$(BOTNAME):$(PKG_VERSION)"

apply: ## Deploy (apply kubernetes/bot.yaml)
	kubectl apply -f kubernetes/bot.yaml

deploy: build-image push-image apply ## Deploy

help: ## Self-documented Makefile
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: all init build-image push-image apply deploy who-am-i help
