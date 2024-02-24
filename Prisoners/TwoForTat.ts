import {IGame, TLabel} from "@src/types";
import {Prisoner} from "@src/Prisoner";

export default class TitForTat extends Prisoner {
  readonly name = "Nice TitForTat";
  readonly strategy = "Cooperate on the first round, and then do whatever the other player did in the previous round.";
  initialPlay = true;

  constructor(game: IGame, label: TLabel) {
    super(game, label);
  }
  
  action(): boolean {
    const othersMove = this.othersMove();
    if (othersMove === null) {
      return this.initialPlay;
    }
    const othersMoveTwo = this.othersMove(2);

    if (othersMoveTwo === null) {
      return this.initialPlay;
    }

    return othersMove || othersMoveTwo;
  }
}
