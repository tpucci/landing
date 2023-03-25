import * as THREE from "three";
import { Scene } from "three";

export const lights = (scene: Scene) => {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);
};
