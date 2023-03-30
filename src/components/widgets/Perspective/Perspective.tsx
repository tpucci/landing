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

export const WATTS_DIMINUTION = 1000;

export function blenderWattsToLumens(watt: number) {
  return watt / WATTS_DIMINUTION;
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
      renderer.physicallyCorrectLights = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2;

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight
      );
      camera.position.set(5, 4, -18);
      camera.rotation.set(0, -Math.PI, 0);

      // create a new instance of the loader
      const loader = new GLTFLoader();

      // lights

      const light = new THREE.AmbientLight(0x404040, WATTS_DIMINUTION * 3); // soft white light
      scene.add(light);

      const spotLight = new THREE.SpotLight(0xffffff, WATTS_DIMINUTION * 100);
      spotLight.position.set(5, 10, 10);
      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;

      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.fov = 30;
      spotLight.penumbra = 1;

      scene.add(spotLight);

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
            } else {
              object.receiveShadow = true;
              object.castShadow = true;
            }
          });

          mixer = new THREE.AnimationMixer(gltf.scene);

          for (const animation of gltf.animations) {
            const action = mixer.clipAction(animation);
            action.play();
          }
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
