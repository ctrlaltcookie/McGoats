# McGoats

McGoats is a discord bot for the Totes discord server built by [Remi](https://www.twitter.com/ctrlaltcookie) for adding missing discord functionality. Includes a hangman game.

# Tests

Testing is done with [Labjs](https://github.com/hapijs/lab) and can be run with `npm test`

# Runnage

You can run this bot as you normally would any node project:

```bash
$ node index.js
```

I'd suggest using a process manager if you are intending to use this code in production, such as [pm2](https://www.npmjs.com/package/pm2)!

# Upcoming features
* Refactoring index cos it's stanky in here!
* Score! - Yeah! Adding scores to things, so that you can like, build up score and use it to do things, relies on persistence existing
* Hangman !fullword penalties - !fullword is OP, you need to spend some score to use it and if you get it wrong will not be allowed to !fullword again for the rest of this hangman session, it gives more score the earlier used, and is worth the same as a win when used 1 letter away from the end.
* The feeding game! - The goat is hungry, feed it, everyone who feeds it within a time limit gets some score.
* The petting game - The goat is sad, pet it, the first person to pet the goat gets score, if you react too slow, it'll kick you and you'll lose score :o CAREFUL!
* Leaderboards! - which will show score, this can't be implemented until we have the second game
