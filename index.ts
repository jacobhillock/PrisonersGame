import { Game } from "@src/Game";
import { loadPrisoners } from "@src/loadPrisoners";

const scores: { [key: string]: number } = {};
const wins: { [key: string]: number } = {};
const games: Array<Game> = [];
const prisoners = loadPrisoners();

console.log(`Loaded ${prisoners.length} prisoners`);

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

    if (game.prisonersSameType) {
      continue;
    }

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

// Calculate the maximum length of prisoner names
const maxNameLength = Math.max(...Object.keys(normalizedScores).map(name => name.length));

// Sort and print normalized scores
const sortedNormalizedScores = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
console.log('Normalized Scores:');
for (const [prisoner, score] of sortedNormalizedScores) {
  console.log(`${prisoner.padEnd(maxNameLength)} : ${score}`);
}

// Sort and print wins
const sortedWins = Object.entries(wins).sort((a, b) => b[1] - a[1]);
console.log('\nWins:');
for (const [prisoner, win] of sortedWins) {
  console.log(`${prisoner.padEnd(maxNameLength)} : ${win}`);
}