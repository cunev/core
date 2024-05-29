// These are all the events that the game emits.
// Can be used to model almost any type of mod/cheat/plugin.
export abstract class GamePlugin {
  abstract name: string;

  abstract tick(): void;
  abstract onInitialize(): void;
  abstract onMapStart(): void;
  abstract onMapEnd(): void;
}
