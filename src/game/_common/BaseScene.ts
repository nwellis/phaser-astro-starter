import Phaser from "phaser";

/**
 * @see [Scene Lifecycle](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/#flow-chart)
 */
export default class BaseScene extends Phaser.Scene {
  readonly sprites = new Map<number, Phaser.GameObjects.Sprite>();

  constructor(config?: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  init() {}

  preload() {
    /**
     * Phaser will load things relative to its current URL, so this is required to reference the
     * public folder! For example {domain}/home will reference {domain}/assets from the public
     * folder, but if you have {domain}/home/page2 it will try reference it like {domain}/home/assets.
     */
    this.load.setBaseURL(`${window.location.origin}/game`);
  }

  create() {}

  update(t: number, dt: number) {}

  destroy() {}
}
