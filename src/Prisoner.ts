import { IGame, IPrisoner, TLabel } from '@src/types';

export interface PrisonerConstructor {
  new (game: IGame, label: TLabel): Prisoner;
}

export abstract class Prisoner implements IPrisoner {
  abstract readonly name: string;
  abstract readonly strategy?: string;
  game: IGame;
  label: TLabel;

  constructor(game: IGame, label: TLabel) {
    this.game = game;
    this.label = label;
  }

  othersMove(n: number = 1) {
    const nthLastMove = this.game.rounds.at(-1*n);
    if (!nthLastMove) {
      return true;
    }

    return nthLastMove[`action${this.label === 'A' ? 'B' : 'A'}`];
  }

  abstract action(): boolean;
}