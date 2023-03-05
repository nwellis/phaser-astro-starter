import BaseScene from "game/_common/BaseScene";
import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  IWorld,
} from "bitecs";
import { Sprite } from "game/_common/components/Sprite";
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

      console.log("MAKING SPRITE", textureId, textures, texture);
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
