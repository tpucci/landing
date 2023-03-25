import * as THREE from "three";
import { ColorRepresentation, Scene } from "three";

const extrudeSettings = {
  depth: 5,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
};

export const roundedRect = (
  {
    x,
    y,
    z,
    width,
    height,
    radius,
    color,
  }: {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    radius: number;
    color: ColorRepresentation;
  },
  scene: Scene
) => {
  const ctx = new THREE.Shape();

  ctx.moveTo(0, radius);
  ctx.lineTo(0, height - radius);
  ctx.quadraticCurveTo(0, height, radius, height);
  ctx.lineTo(width - radius, height);
  ctx.quadraticCurveTo(width, height, width, height - radius);
  ctx.lineTo(width, radius);
  ctx.quadraticCurveTo(width, 0, width - radius, 0);
  ctx.lineTo(radius, 0);
  ctx.quadraticCurveTo(0, 0, 0, radius);

  const geometry = new THREE.ExtrudeGeometry(ctx, extrudeSettings);

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.6,
      metalness: 1,
    })
  );
  mesh.position.set(x, y, z);
  scene.add(mesh);
};
