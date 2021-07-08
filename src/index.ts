import { extend, World } from "./ecs/index";
import { RenderSystem } from "./systems/RenderSystem";
import { Object3DSystem } from "./systems/Object3DSystem";
import { AssetManager } from "./ecs/assetManager";
import { Asset, Camera, HemisphereLight } from "./ecs/achetypes";
import { AssetSystem } from "./systems/AssetSystem";
import { OrbitControlsSystem } from "./systems/OrbitControlsSystem";
import { PointLightSystem } from "./systems/PointLightSystem";
import { Vector3, Color } from "three";
import { CameraSystem } from "./systems/CameraSystem";
import { MaterialSystem } from "./systems/MaterialSystem";
import { StatsSystem } from "./systems/StatsSystem";
import { HemisphereLightSystem } from "./systems/HemisphereLightSystem";
import { AnimationSystem } from "./systems/AnimationSystem";

(async () => {
  const assetManager = new AssetManager();

  const CARD_GLTF = "assets/models/card.glb";

  assetManager
    .addAsset(CARD_GLTF, "env")
    .addAsset("assets/textures/env.jpg", "env_tex"); // Environmental texture for PBR material.

  // Wait untill all assets are loaded
  await assetManager.load();

  const world = new World(assetManager.loadedAssets);

  const cam = Camera(new Vector3(0, 0, 1));

  const card = extend(
    Asset({
      src: CARD_GLTF,
    }),
    [/* newComponent(MaterialC, {}) */]
  );

  const hLight = HemisphereLight({ intensity: 2 });

  world.addEntity(cam).addEntity(card).addEntity(hLight);

  world
    .registerSystem(
      RenderSystem.configure({
        enableShadows: false,
        fog: { enabled: true, color: new Color(0xc2d1d1), density: 0.03 },
      })
    )
    .registerSystem(Object3DSystem)
    .registerSystem(AssetSystem)
    .registerSystem(CameraSystem)
    .registerSystem(OrbitControlsSystem)
    .registerSystem(HemisphereLightSystem)
    .registerSystem(PointLightSystem)
    .registerSystem(MaterialSystem)
    .registerSystem(StatsSystem)
    .registerSystem(AnimationSystem);

  world.init();
})();
