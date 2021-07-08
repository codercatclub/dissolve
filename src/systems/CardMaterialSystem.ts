import { System } from "../ecs/index";
import { TransformC, Object3DC, CardMaterialC } from "../ecs/components";
import { applyQuery, Entity, World } from "../ecs/index";
import { Mesh, UniformsUtils, MeshStandardMaterial,Vector3 } from "three";
import { getComponent } from './utils';
import { RenderSystem } from "./RenderSystem";
function smoothstep (min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
};
interface CardMaterialSystem extends System {
  world: World | null;
  processEntity: (ent: Entity) => void;
  materials: THREE.Shader[],
  growthT: number,
  dir: number,
  isGrowing: boolean;
  worldMousePos: Vector3;
  camera: THREE.PerspectiveCamera | null;
  updateUniforms: (time: number, timeDelta: number) => void;
}

export const CardMaterialSystem: CardMaterialSystem = {
  type: "CardMaterialSystem",
  world: null,
  growthT: 0,
  dir: -1,
  worldMousePos: new Vector3(),
  isGrowing: false,
  camera: null,
  materials: [],
  queries: [TransformC, Object3DC, CardMaterialC],

  init: function (world) {
    this.world = world;
    this.entities = applyQuery(world.entities, this.queries);
    this.entities.forEach(this.processEntity.bind(this));

    const renderSystem = world.systems.filter((s) => s.type === "RenderSystem")[0] as RenderSystem;
    this.camera = renderSystem.camera;
    this.worldMousePos = new Vector3();

  },

  processEntity: function(ent) {
    if (!this.world) return;
    const { shader, color1, color2 } = getComponent(ent, CardMaterialC);
    const { object3d: parent } = getComponent(ent, Object3DC);
    
    const uniforms = {
      colorB: { type: "vec3", value: color1 },
      colorA: { type: "vec3", value: color2 },
      timeMSec: { type: "f", value: 0 },
      growthT: { type: "f", value: 0 },
      worldMousePos: { type: "vec3", value: this.worldMousePos }
    };
    let materialOptions = {
    };
    
    //HACK
    const material = new MeshStandardMaterial(materialOptions);
    material.onBeforeCompile = (mshader) => {
      mshader.uniforms = UniformsUtils.merge([
        uniforms,
        mshader.uniforms,
      ]);
      mshader.vertexShader = require(`../shaders/${shader}Vert.glsl`);
      mshader.fragmentShader =require(`../shaders/${shader}Frag.glsl`);
      this.materials.push(mshader);
    };

    parent?.traverse((obj) => {
      if (obj.type === "Mesh") {
        let mesh = obj as Mesh;
        let sMat = mesh.material as MeshStandardMaterial;
        // const texture = this.world?.assets.textures.get("assets/textures/sample.jpg");
        // if(texture) {
        //   material.map = texture;
        // }
        material.map = sMat.map;
        mesh.material = material;
        mesh.material.needsUpdate = true;
      }
    });

    window.addEventListener("click", (event) => {
      this.isGrowing = true;
      this.dir *= -1;
    });

    window.addEventListener("mousemove", (event) => {
      if(!this.camera) return;

      var vec = new Vector3(); // create once and reuse
      
      vec.set(
          ( event.clientX / window.innerWidth ) * 2 - 1,
          - ( event.clientY / window.innerHeight ) * 2 + 1,
          0.5 );
      
      vec.unproject( this.camera );
      
      vec.sub( this.camera.position ).normalize();
      
      var distance = - this.camera.position.z / vec.z;
      
      this.worldMousePos.copy( this.camera.position ).add( vec.multiplyScalar( distance ) );
    })
  },

  onEntityAdd: function (ent) {
    const entities = applyQuery([ent], this.queries);
    entities.forEach(this.processEntity.bind(this));
  },

  updateUniforms: function (time, timeDelta) {
    this.materials.forEach((mat) => {
      mat.uniforms["timeMSec"].value = time;
      mat.uniforms["worldMousePos"].value = this.worldMousePos;

      if(this.isGrowing) {
        let speedMult = 0.3 * smoothstep(1.75, 2.0, this.growthT);
        this.growthT += this.dir * (0.7-speedMult) * timeDelta;
        if(this.growthT > 2) {
          this.isGrowing = false;
        }
        if(this.growthT < 0) {
          this.isGrowing = false;
          this.growthT = 0.0;
        }
      }
      mat.uniforms["growthT"].value = this.growthT;
    });
  },

  tick: function(time, timeDelta) {
    this.updateUniforms(time, timeDelta);
  }
};
