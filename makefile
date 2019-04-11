default: run

prepare:
	rm -rf node_modules
	npm install

test:
	./node_modules/.bin/lab -c

run:
	node index.js

.PHONY: test