import { StandardBeatmap } from "osu-standard-stable";
import { GamePlugin } from "./gameplugin";

// The abstract game class which should be extended.
export abstract class Game {
  private static plugins: GamePlugin[] = [];
  static instance: Game | undefined;

  // Each plugin should call this method in their constructor
  // (global.game as typeof Game).addPlugin(this);
  static addPlugin(plugin: GamePlugin) {
    for (let i = 0; i < this.plugins.length; i++) {
      const existingPlugin = this.plugins[i];
      if (existingPlugin.name == plugin.name) {
        this.plugins.splice(i, 1);
        break;
      }
    }
    this.plugins.push(plugin);
  }

  // Your game implementation must call this method on each tick
  static emitTick() {
    for (const plugin of this.plugins) {
      plugin.tick();
    }
  }

  // Your game implementation must call this once, when the map starts
  static emitMapStart() {
    for (const plugin of this.plugins) {
      plugin.onMapStart();
    }
  }

  // Your game implementation must call this once, when the map ends
  static emitMapEnd() {
    for (const plugin of this.plugins) {
      plugin.onMapEnd();
    }
  }

  // Your game implementation must call this once, when it finishes initializing signatures, and other stuff.
  static emitInitialize() {
    for (const plugin of this.plugins) {
      plugin.onInitialize();
    }
  }

  // Your game version must implement all off these methods to work properly with
  // any plugin.
  abstract initialize(): Promise<void>;
  abstract getTime(): number;
  abstract getIsInMap(): boolean;
  abstract getIsPaused(): boolean;
  abstract getMods(): string[];
  abstract getBeatmap(): StandardBeatmap;
  abstract getWindowPosition(): { x: number; y: number };
  abstract getWindowSize(): { x: number; y: number };
}

global.game = Game;
