# McGoats

McGoats is a discord bot for the Totes discord server built by CtrlAltCookie for the purpose of games and implementing missing discord features. Currently the only game is hangman however more games are going to be added, with score tracking and leaderboards.

# Tests

Due to a lack of mocking and some particularly leaky abstractions there are currently no tests.

# Runnage

```bash
$ node index.js
```

Though you should probably use pm2.

# Upcoming features

* Enriching dice rolling adding modifier supper and pass checks
* PERSISTENCE - not just in fighting bugs and doing work after 8 hours of other work, but also, putting data on disk!
* Score! - Yeah! Adding scores to things, so that you can like, build up score and use it to do things, relies on persistence existing
* Hangman !fullword penalties - !fullword is OP, you need to spend some score to use it and if you get it wrong will not be allowed to !fullword again for the rest of this hangman session, it gives more score the earlier used, and is worth the same as a win when used 1 letter away from the end.
* The feeding game! - The goat is hungry, feed it, everyone who feeds it within a time limit gets some score.
* The petting game - The goat is sad, pet it, the first person to pet the goat gets score, if you react too slow, it'll kick you and you'll lose score :o CAREFUL!
* Leaderboards! - which will show score, this can't be implemented until we have the second game
