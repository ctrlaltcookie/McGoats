default: run

prepare:
	rm -rf node_modules
	npm install
	mkdir -p data
	echo '{"goodgoat":0,"badgoat":0}' > ./data/savestate.json
	echo '{}' > ./data/streamers.json

test:
	./node_modules/.bin/lab -c

run:
	node index.js

lint:
	node_modules/.bin/eslint api/

.PHONY: test