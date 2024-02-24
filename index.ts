import { Game } from "@src/Game";
import {readdirSync} from 'fs';

const prisoners = readdirSync('./Prisoners').map(file => require(`./Prisoners/${file}`).default);
const games: Array<Array<Game>> = [];

for (const prisonerA of prisoners) {
  const nextRow: Array<Game> = []
  games.push(nextRow)
  for (const prisonerB of prisoners) {
    const game = new Game(prisonerA, prisonerB);
    nextRow.push(game);
    game.play();
  }
}

for (const row of games) {
  for (const game of row) {
    console.log(`Score: ${game.aName} ${game.scoreA} - ${game.bName} ${game.scoreB}`);
    console.log(`Winner: ${game.winner ? game.winner.name : 'Tie'}`);
  }
}
