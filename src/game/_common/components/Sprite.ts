import { defineComponent, Types } from "bitecs";

export const Sprite = defineComponent({
  textureId: Types.ui8,
});

export const SpriteTile = defineComponent({
  frames: [Types.ui8, 4],
  frameCount: Types.ui8,
});
