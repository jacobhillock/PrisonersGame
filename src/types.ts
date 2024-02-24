export type TLabel = "A" | "B";

export interface IPrisoner {
  // Describes the name for the scoreboard
  readonly name: string;
  // Describes the strategy for the prisoner for the score board
  readonly strategy?: string;
  game: IGame;
  label: TLabel;
  action(): boolean;
}

export type Round = {
  actionA: boolean;
  actionB: boolean;
}

export interface IGame {
  scoreA: number;
  scoreB: number;
  rounds: Round[];
}
