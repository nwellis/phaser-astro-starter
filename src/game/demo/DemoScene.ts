import Phaser from "phaser";
import BaseScene from "game/_common/BaseScene";
import { addComponent, addEntity, createWorld, IWorld, System } from "bitecs";
import { Position, Rotation, Velocity } from "game/_common/components/Physics";
import { Sprite } from "game/_common/components/Sprite";
import { mkSpriteSystem } from "game/_common/systems/Sprite";

export const TextureIds = {
  tilesheet: 0,
  foobar: 1,
};
export type TextureKey = keyof typeof TextureIds;

export default class DemoScene extends BaseScene {
  private static Width = 16 * 16; // 1024
  private static Height = 16 * 10; // 640
  static Scaling: Phaser.Types.Core.ScaleConfig = {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: this.Width,
    height: this.Height,
  };

  protected world: IWorld;
  protected systems = {
    sprite: undefined as System,
  };

  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Demo");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.spritesheet({
      key: "tilesheet" as TextureKey,
      frameConfig: { frameWidth: 16, frameHeight: 16 },
    });
  }

  create() {
    this.world = createWorld();

    this.systems.sprite = mkSpriteSystem(this, TextureIds);

    this.addTile(this.scale.width / 2, this.scale.height / 2);

    console.log(this.world);
  }

  update(t: number, dt: number) {
    if (!this.world) return;

    this.systems.sprite(this.world);
  }

  addTile(x: number, y: number) {
    const tile = addEntity(this.world);

    addComponent(this.world, Position, tile);
    Position.x[tile] = x;
    Position.y[tile] = y;

    addComponent(this.world, Sprite, tile);
    Sprite.textureId[tile] = 0;
  }
}
