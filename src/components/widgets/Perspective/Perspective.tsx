import {
  component$,
  noSerialize,
  NoSerialize,
  useClientEffect$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import * as THREE from "three";
import { lights } from "./lights";
import { roundedRect } from "./roundedRect";

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

    lights(scene);

    roundedRect(
      {
        width: 100,
        height: 50,
        radius: 10,
        color: 0xaaaaaa,
        x: 60,
        y: 0,
        z: -300,
      },
      scene
    );

    const particleLight = new THREE.Mesh(
      new THREE.SphereGeometry(4, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    scene.add(particleLight);

    particleLight.add(new THREE.PointLight(0xffffff, 1));

    // Scroll Animation

    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top;

      camera.position.z = t * -0.1;
      camera.position.x = t * -0.002;
      camera.rotation.y = t * -0.002;
    };

    document.body.onscroll = moveCamera;
    moveCamera();

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const timer = Date.now() * 0.00025;

      particleLight.position.x = Math.sin(timer * 7) * 300;
      particleLight.position.y = Math.cos(timer * 5) * 400;
      particleLight.position.z = Math.cos(timer * 3) * 300;

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
