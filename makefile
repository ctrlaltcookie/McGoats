default: run

prepare:
	rm -rf node_modules
	npm ci

clean-install: prepare
	mkdir -p data
	mkdir -p api/token
	echo '{"goodgoat":0,"badgoat":0}' > ./data/savestate.json
	echo '{}' > ./data/streamers.json
	echo 'module.exports = "";' > ./api/token/index.js

test:
	./node_modules/.bin/lab -c

run:
	node index.js

lint:
	node_modules/.bin/eslint "api/**"

ci-test: lint test

.PHONY: lint test