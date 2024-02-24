import {IGame, TLabel} from "@src/types";
import {Prisoner} from "@src/Prisoner";

export default class TitForTat extends Prisoner {
  readonly name = "Cooperative Winner";
  readonly strategy = "Cooperate on the first round, and then cooperate if player is winning.";
  initialPlay = true;

  constructor(game: IGame, label: TLabel) {
    super(game, label);
  }
  
  action(): boolean {
    if (!this.game.winner) {
      return this.initialPlay;
    }

    return this === this.game.winner || this.initialPlay;
  }
}
