import { component$, useClientEffect$, useSignal } from "@builder.io/qwik";
import * as THREE from "three";
import {
  AnimationMixer,
  Light,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function blenderWattsToLumens(watt: number) {
  return watt / 100;
}

export const isLight = (object: Object3D): object is Light => {
  // @ts-ignore
  return object.isLight;
};

export const Perspective = component$(() => {
  const bg = useSignal<HTMLCanvasElement>();

  useClientEffect$(() => {
    let camera: PerspectiveCamera,
      scene: Scene,
      renderer: WebGLRenderer,
      mixer: AnimationMixer;
    const clock = new THREE.Clock();
    init();
    //render(); // remove when using next line for animation loop (requestAnimationFrame)
    animate();

    function init() {
      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: bg.value,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      // @ts-ignore
      renderer.useLegacyLights = false;

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight
      );
      camera.position.set(5, 4, -18);
      camera.rotation.set(0, -Math.PI, 0);

      // create a new instance of the loader
      const loader = new GLTFLoader();

      // load a GLB file
      loader.load(
        // path to the GLB file
        "/room.glb",

        // callback function that gets called when the file is loaded
        (gltf) => {
          // add the loaded object to the scene
          scene.add(gltf.scene);

          scene.traverse(function (object) {
            if (isLight(object)) {
              object.intensity = blenderWattsToLumens(object.intensity);
              object.castShadow = true;
            }
            if (object.isMesh) {
              object.castShadow = true;
              object.receiveShadow = true;
            }
          });

          mixer = new THREE.AnimationMixer(gltf.scene);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();

          const action2 = mixer.clipAction(gltf.animations[1]);
          action2.play();
        },

        // callback function that gets called if there is an error loading the file
        (error) => {
          if (error.type === "progress") return;
          console.error(error);
        }
      );

      //

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }
  });

  return (
    <canvas
      ref={bg}
      id="bg"
      class="fixed top-0"
      //
      style={{ zIndex: -1 }}
    />
  );
});
