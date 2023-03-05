import Phaser from "phaser";
import BaseScene from "game/_common/BaseScene";
import {
  addComponent,
  addEntity,
  createWorld,
  IWorld,
  pipe,
  System,
} from "bitecs";
import { Position, Rotation, Velocity } from "game/_common/components/Physics";
import { Sprite, SpriteTile } from "game/_common/components/Sprite";
import {
  mkSpriteSystem,
  mkSpriteTileSystem,
} from "game/_common/systems/Sprite";

function invertKvp(record: Record<string, number> = {}) {
  return Object.keys(record).reduce((inverted, strKey) => {
    inverted[record[strKey]] = strKey;
    return inverted;
  }, {} as Record<number, string>);
}

export const TextureIds = {
  tilesheet: 0,
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
    min: {
      width: this.Width / 4,
      height: this.Height / 4,
    },
    max: {
      width: this.Width,
      height: this.Height,
    },
  };

  protected world: IWorld;
  protected systems = {
    sprite: undefined as System,
  };

  protected cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super();
  }

  init() {
    super.init();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    super.preload();
    this.load.spritesheet({
      url: "/sprites/basictiles.png",
      key: "tilesheet" as TextureKey,

      frameConfig: { frameWidth: 16, frameHeight: 16 },
    });
  }

  create() {
    super.create();
    this.world = createWorld();

    this.systems.sprite = pipe(
      mkSpriteSystem(this, invertKvp(TextureIds)),
      mkSpriteTileSystem(this, invertKvp(TextureIds))
    );

    this.addTile(this.scale.width / 2, this.scale.height / 2);
  }

  update(t: number, dt: number) {
    super.update(t, dt);
    if (!this.world) return;

    this.systems.sprite(this.world);
  }

  destroy() {
    super.destroy();
  }

  addTile(x: number, y: number) {
    const tile = addEntity(this.world);

    addComponent(this.world, Position, tile);
    Position.x[tile] = x;
    Position.y[tile] = y;

    addComponent(this.world, Sprite, tile);
    Sprite.textureId[tile] = 0;

    addComponent(this.world, SpriteTile, tile);
    // SpriteTile.frames[tile] = Uint8Array.of(0);
    // SpriteTile.frameCount[tile] = 1;
    SpriteTile.frames[tile] = Uint8Array.of(4, 5);
    SpriteTile.frameCount[tile] = 2;
  }
}
