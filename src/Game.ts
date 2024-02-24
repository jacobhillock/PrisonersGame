import { IGame, IPrisoner, Round } from '@src/types';
import { PrisonerConstructor } from '@src/Prisoner';
import { gaussianRandom } from '@src/random';

export class Game implements IGame {
  rounds: Round[];
  totalRounds: number;
  scoreA: number;
  scoreB: number;
  private prisonerA: IPrisoner;
  private prisonerB: IPrisoner;

  constructor(prisonerA: PrisonerConstructor, prisonerB: PrisonerConstructor) {
    this.rounds = [];
    this.totalRounds = gaussianRandom(200, 5);
    this.scoreA = 0;
    this.scoreB = 0;

    this.prisonerA = new prisonerA (this, 'A');
    this.prisonerB = new prisonerB (this, 'B');
  }

  doRound() {
    if (this.rounds.length >= this.totalRounds) {
      return;
    }

    const actionA = this.prisonerA.action();
    const actionB = this.prisonerB.action();
    this.rounds.push({actionA, actionB});

    if (actionA && actionB) {
      this.scoreA += 3;
      this.scoreB += 3;
    } else if (actionA && !actionB) {
      this.scoreA += 0;
      this.scoreB += 5;
    } else if (!actionA && actionB) {
      this.scoreA += 5;
      this.scoreB += 0;
    } else {
      this.scoreA += 1;
      this.scoreB += 1;
    }
  }

  play() {
    while (this.rounds.length < this.totalRounds) {
      this.doRound();
    }
  }

  get winner() {
    if (this.scoreA > this.scoreB) {
      return this.prisonerA;
    } else if (this.scoreA < this.scoreB) {
      return this.prisonerB;
    } else {
      return null;
    }
  }

  get aName() {
    return this.prisonerA.name;
  }

  get bName() {
    return this.prisonerB.name;
  }
}
