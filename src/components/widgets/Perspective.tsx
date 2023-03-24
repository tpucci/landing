import {
  component$,
  noSerialize,
  NoSerialize,
  useClientEffect$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import * as THREE from "three";
import { ExtrudeGeometryOptions, Shape } from "three";

interface State {
  scene: NoSerialize<THREE.Scene>;
  camera: NoSerialize<THREE.PerspectiveCamera>;
  renderer: NoSerialize<THREE.WebGLRenderer>;
}

export const Perspective = component$(() => {
  const bg = useSignal<HTMLCanvasElement>();
  const state = useStore<State>({
    scene: noSerialize(undefined),
    camera: noSerialize(undefined),
    renderer: noSerialize(undefined),
  });

  useClientEffect$(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: bg.value,
      alpha: true,
    });

    state.scene = noSerialize(scene);
    state.camera = noSerialize(camera);
    state.renderer = noSerialize(renderer);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

    renderer.render(scene, camera);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    function addShape(
      shape: Shape,
      extrudeSettings: ExtrudeGeometryOptions,
      color: THREE.ColorRepresentation,
      x: number,
      y: number,
      z: number
    ) {
      // flat shape with texture
      // note: default UVs generated by THREE.ShapeGeometry are simply the x- and y-coordinates of the vertices

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({ color: color })
      );
      mesh.position.set(x, y, z);
      scene.add(mesh);
    }

    const roundedRectShape = new THREE.Shape();

    (function roundedRect(ctx, x, y, width, height, radius) {
      ctx.moveTo(x, y + radius);
      ctx.lineTo(x, y + height - radius);
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
      ctx.lineTo(x + width - radius, y + height);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      );
      ctx.lineTo(x + width, y + radius);
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
      ctx.lineTo(x + radius, y);
      ctx.quadraticCurveTo(x, y, x, y + radius);
    })(roundedRectShape, 0, 0, 100, 50, 10);
    const extrudeSettings = {
      depth: 5,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    addShape(roundedRectShape, extrudeSettings, 0xaaaaaa, 60, 0, -300);
    addShape(roundedRectShape, extrudeSettings, 0xaaaaaa, 120, 80, -300);
    addShape(roundedRectShape, extrudeSettings, 0xaaaaaa, -200, 20, -300);

    // Scroll Animation

    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top;

      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0002;
    };

    document.body.onscroll = moveCamera;
    moveCamera();

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();
  });

  return <canvas ref={bg} id="bg" class="fixed top-0" style={{ zIndex: -1 }} />;
});
