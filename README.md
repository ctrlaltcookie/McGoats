# McGoats

McGoats is a discord bot for the Totes discord server built by [Remi](https://www.twitter.com/ctrlaltcookie) for adding missing discord functionality, memes and assisting in roleplaying games.

## Build

You can build the project with `make`

```bash
$ make prepare
```

Or if you are on linux without `make`:

```bash
$ npm install
$ mkdir -p data
$ echo "{}" > ./data/savestate.json
$ echo "module.exports = 'your key here'" > ./api/token.js
```

I don't have a script for building on windows, because windows is terrible.

## Tests

Tests are written run with [Labjs](https://github.com/hapijs/lab), assertions are from [Code](https://github.com/hapijs/code), with mocking from [Sinon](https://sinonjs.org/).

You can run tests with

```bash
$ make test
```

Or if you don't have make because you're on windows:

```bash
$ npm test
```

Or if you want to add arguments to the test runner:

```bash
$ ./node_modules/.bin/lab -c -m -something -readTheDocumentation
```

## Runnage

You can run the bot either with `make` if it's available, the default target is to run the project:

```bash
$ make

or

$ make run
```

Or if you are on windows:

```bash
$ npm start

or

$ node index.js
```

I'd suggest using a process manager if you are intending to use this code in production, such as [pm2](https://www.npmjs.com/package/pm2)! You'll need to add a `./token` folder or file that contains your auth token.

## Upcoming features

* talk as bot feature!
* Score! - Yeah! Adding scores to things, so that you can like, build up score and use it to do things, relies on persistence existing
* Hangman !fullword penalties - !fullword is OP, you need to spend some score to use it and if you get it wrong will not be allowed to !fullword again for the rest of this hangman session, it gives more score the earlier used, and is worth the same as a win when used 1 letter away from the end.
* The feeding game! - The goat is hungry, feed it, everyone who feeds it within a time limit gets some score.
* The petting game - The goat is sad, pet it, the first person to pet the goat gets score, if you react too slow, it'll kick you and you'll lose score :o CAREFUL!
* Leaderboards! - which will show score, this can't be implemented until we have the second game
