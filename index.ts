import { Game } from "@src/Game";
import { loadPrisoners } from "@src/loadPrisoners";

const scores: { [key: string]: number } = {};
const wins: { [key: string]: number } = {};
const games: Array<Game> = [];
const prisoners = loadPrisoners();

console.log(`Loaded ${prisoners.length} prisoners`);
// Calculate the maximum length of prisoner names
const maxNameLength = Math.max(...prisoners.map(prisoner => prisoner.source.length));
const paddedString = (str: string, fill: string = ' ') => str.padEnd(maxNameLength, fill);

for (let prisonerAIndex = 0; prisonerAIndex < prisoners.length; prisonerAIndex++) {
  for (let prisonerBIndex = 0; prisonerBIndex <= prisonerAIndex; prisonerBIndex++) {
    const prisonerA = prisoners[prisonerAIndex];
    const prisonerB = prisoners[prisonerBIndex];
    const game = new Game(
      prisonerA.prisoner,
      prisonerB.prisoner
    );
    games.push(game);
    game.play();

    scores[prisonerA.source] = (scores[prisonerA.source] || 0) + (game.getScoreByType(prisonerA.prisoner) || 0);
    scores[prisonerB.source] = (scores[prisonerB.source] || 0) + (game.getScoreByType(prisonerB.prisoner) || 0);

    if (game.winner === game.getPrisonerByType(prisonerA.prisoner)) {
      wins[prisonerA.source] = (wins[prisonerA.source] || 0) + 1;
    } else if (game.winner === game.getPrisonerByType(prisonerB.prisoner)) {
      wins[prisonerB.source] = (wins[prisonerB.source] || 0) + 1;
    }
  }
}

const normalizedScores: {[key: string]: number} = {};
for (const prisoner of prisoners) {
  normalizedScores[prisoner.source] = scores[prisoner.source] / prisoners.length;
}

console.log(`Played ${games.length} games`);

// Sort and print normalized scores
const sortedNormalizedScores = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
console.log(`\n${paddedString('Normalized Scores')} :`);
for (const [prisoner, score] of sortedNormalizedScores) {
  console.log(`${paddedString(prisoner)} : ${score}`);
}

// Sort and print wins
let totalWins = 0;
const sortedWins = Object.entries(wins).sort((a, b) => b[1] - a[1]);
console.log(`\n${paddedString('Wins')} :`);
for (const [prisoner, win] of sortedWins) {
  console.log(`${paddedString(prisoner)} : ${win}`);
  totalWins += win;
}
console.log(`${paddedString('Total Wins')} : ${totalWins}`);

/*
  Developers note:
  - I did analysis on the ties and it found out that was not interesting
    because every prisoner had exactly 1 tie. With itself.
*/
