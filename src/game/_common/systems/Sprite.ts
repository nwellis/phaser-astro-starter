import BaseScene from "game/_common/BaseScene";
import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  IWorld,
} from "bitecs";
import { Sprite, SpriteTile } from "game/_common/components/Sprite";
import { Position } from "game/_common/components/Physics";

export const mkSpriteSystem = (
  scene: BaseScene,
  textures: Record<number, string>
) => {
  const query = defineQuery([Sprite]);
  const queryEnter = enterQuery(query);
  const queryExit = exitQuery(query);

  return defineSystem((world: IWorld) => {
    const enterEntities = queryEnter(world);
    for (let i = 0; i < enterEntities.length; i++) {
      const eid = enterEntities[i];
      const textureId = Sprite.textureId[eid];
      const texture = textures[textureId];

      scene.sprites.set(eid, scene.add.sprite(0, 0, texture));
    }

    const entities = query(world);
    for (let i = 0; i < entities.length; i++) {
      const eid = entities[i];
      const sprite = scene.sprites.get(eid);
      if (!sprite) {
        continue;
      }

      sprite.x = Position.x[eid];
      sprite.y = Position.y[eid];
    }

    const exitEntities = queryExit(world);
    for (let i = 0; i < exitEntities.length; i++) {
      const eid = entities[i];
      const sprite = scene.sprites.get(eid);
      if (!sprite) {
        continue;
      }

      sprite.destroy(true);
      scene.sprites.delete(eid);
    }

    return world;
  });
};

export const mkSpriteTileSystem = (
  scene: BaseScene,
  textures: Record<number, string>
) => {
  const query = defineQuery([Sprite, SpriteTile]);
  const queryEnter = enterQuery(query);
  const queryExit = exitQuery(query);

  return defineSystem((world: IWorld) => {
    const enterEntities = queryEnter(world);
    for (let i = 0; i < enterEntities.length; i++) {
      const eid = enterEntities[i];
      const sprite = scene.sprites.get(eid);
      if (!sprite) {
        continue;
      }

      const frames = Array.from(
        SpriteTile.frames[eid].slice(0, SpriteTile.frameCount[eid])
      );
      if (frames.length === 0) {
        continue;
      }

      const textureId = Sprite.textureId[eid];
      const texture = textures[textureId];
      sprite.anims.create({
        key: "idle",
        frameRate: 4,
        repeat: -1,
        frames: sprite.anims.generateFrameNumbers(texture, {
          frames,
        }),
      });
      sprite.anims.play("idle");
    }

    return world;
  });
};
