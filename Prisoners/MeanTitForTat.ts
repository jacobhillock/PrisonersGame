import {IGame, TLabel} from "@src/types";
import {Prisoner} from "@src/Prisoner";

export default class TitForTat extends Prisoner {
  readonly name = "Mean TitForTat";
  readonly strategy = "Defect on the first round, and then do whatever the other player did in the previous round.";
  initialPlay = false;

  constructor(game: IGame, label: TLabel) {
    super(game, label);
  }
  
  action(): boolean {
    const othersMove = this.othersMove();
    if (othersMove === null) {
      return this.initialPlay;
    }
    return othersMove;
  }
}
