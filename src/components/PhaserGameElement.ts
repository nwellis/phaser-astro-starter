import Phaser from "phaser";

export class PhaserGameDivElement extends HTMLDivElement {
  static readonly HTML_TAG = "phaser-game";

  readonly game: Phaser.Game;

  constructor() {
    super();

    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: this,
      antialias: false,
      antialiasGL: false,
      banner: import.meta.env.DEV,
      ...this.config,
    });
  }

  start(...args: Parameters<typeof this.game.scene.add>) {
    if (this.game.scene.keys[args[0]]) {
      return;
    }
    this.game.scene.add(...args);
  }

  private _config: Phaser.Types.Core.GameConfig;
  get config(): Phaser.Types.Core.GameConfig {
    if (this._config) {
      return this._config;
    }

    try {
      this.id;
      this._config = this.dataset.config ? JSON.parse(this.dataset.config) : {};
    } catch (err) {
      console.error();
      this._config = {};
    }

    return this._config;
  }
}
