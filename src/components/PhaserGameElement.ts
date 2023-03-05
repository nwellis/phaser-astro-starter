import Phaser from "phaser";

export class PhaserGameDivElement extends HTMLElement {
  static readonly HTML_TAG = "phaser-game";
  static get observedAttributes() {
    return ["game-config"];
  }

  private game: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig;

  constructor() {
    super();
  }

  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case "game-config": {
        if (!next) {
          this.config = undefined;
          this.game?.destroy(false);
          break;
        }

        try {
          console.log(`Parsing`, next);
          const partialConfig = next ? JSON.parse(next) : {};
          this.config = {
            type: Phaser.AUTO,
            parent: this,
            antialias: false,
            antialiasGL: false,
            banner: import.meta.env.DEV,
            ...partialConfig,
          };

          this.game?.destroy(false);
          this.game = new Phaser.Game(this.config);
        } catch (err) {
          console.error(`Failed to parse Phaser  config`, err);
          this.config = {};
        }
      }
    }
  }

  start(...args: Parameters<typeof this.game.scene.add>) {
    if (this.game.scene.keys[args[0]]) {
      return;
    }
    this.game.scene.add(...args);
  }

  // private config: Phaser.Types.Core.GameConfig;
  // get config(): Phaser.Types.Core.GameConfig {
  //   if (this._config) {
  //     return this._config;
  //   }

  //   try {
  //     this.id;
  //     this._config = this.dataset.config ? JSON.parse(this.dataset.config) : {};
  //   } catch (err) {
  //     console.error();
  //     this._config = {};
  //   }

  //   return this._config;
  // }
}
