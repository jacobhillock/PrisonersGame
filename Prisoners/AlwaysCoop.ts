import {IGame, TLabel} from "@src/Types";
import {Prisoner} from "@src/Prisoner";

export default class TitForTat extends Prisoner {
  readonly name = "Always Cooperate";
  readonly strategy = "Cooperate on every round";
  
  constructor(game: IGame, label: TLabel) {
    super(game, label);
  }
  
  action(): boolean {
    return true;
  }
}
