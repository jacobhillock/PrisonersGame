import {IGame, TLabel} from "@src/types";
import {Prisoner} from "@src/Prisoner";

export default class TitForTat extends Prisoner {
  readonly name = "Cooperative Loser";
  readonly strategy = "Defect on the first round, and then cooperate if player is losing.";
  initialPlay = false;

  constructor(game: IGame, label: TLabel) {
    super(game, label);
  }
  
  action(): boolean {
    if (!this.game.winner) {
      return this.initialPlay;
    }
    
    return this !== this.game.winner;
  }
}
