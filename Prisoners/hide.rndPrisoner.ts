import {Prisoner, PrisonerConstructor} from "@src/Prisoner";
import {IGame, TLabel} from "@src/types";

export function createPrisoner (percent: number): PrisonerConstructor {
  return class RndPrisoner extends Prisoner {
    readonly name = `.rndPrisoner ${percent}`;
    readonly strategy = "Randomly choose to cooperate or defect.";
  
    constructor(game: IGame, label: TLabel) {
      super(game, label);
    }
    
    action(): boolean {
      return Math.random() < percent;
    }
  }
}
