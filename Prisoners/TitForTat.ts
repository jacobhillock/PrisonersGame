import {IGame, TLabel} from "@src/types";
import {Prisoner} from "@src/Prisoner";

export default class TitForTat extends Prisoner {
  readonly name = "TitForTat";
  readonly strategy = "Cooperate on the first round, and then do whatever the other player did in the previous round.";

  constructor(game: IGame, label: TLabel) {
    super(game, label);
  }
  
  action(): boolean {
    return this.othersMove();
  }
}
