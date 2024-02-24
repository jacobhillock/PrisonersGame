import {IGame, TLabel} from "@src/types";
import {Prisoner} from "@src/Prisoner";

export default class TitForTat extends Prisoner {
  readonly name = "Always Defect";
  readonly strategy = "Defect on every round";

  constructor(game: IGame, label: TLabel) {
    super(game, label);
  }
  
  action(): boolean {
    return false;
  }
}
