default: run

prepare:
	rm -rf node_modules
	npm install
	mkdir -p data
	echo '{"goodgoat":0,"badgoat":0}' > ./data/savestate.json

test:
	./node_modules/.bin/lab -c

run:
	node index.js

.PHONY: test