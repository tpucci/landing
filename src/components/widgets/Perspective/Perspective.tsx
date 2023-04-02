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
import gsap from "gsap";

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
      // @ts-ignore
      renderer.useLegacyLights = false;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 2;

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight
      );

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

      loader.load(
        "/room.glb",

        (gltf) => {
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

          renderer.domElement.style.opacity = "100%";
        },

        (error) => {
          if (error.type === "progress") return;
          console.error(error);
        }
      );

      window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;

        gsap.to(camera.position, {
          x: 10 - Math.min(scrollTop / 1000, 4),
          y: 4 + Math.min(scrollTop / 150, 5),
          z: -22 - Math.min(scrollTop / 50, 10),
        });

        gsap.to(camera.rotation, {
          x: -(Math.PI * Math.min(scrollTop / 40, 15)) / 180,
        });
      });

      camera.position.set(10, 4, -18);
      camera.rotation.set(0, -Math.PI, 0);

      window.addEventListener("resize", onWindowResize);

      setTimeout(() => {
        renderer.domElement.style.transitionDuration = "2000ms";
      }, 300);
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
    <div class="absolute top-0 bottom-0 right-0 left-0 flex items-stretch overflow-hidden">
      <canvas ref={bg} id="bg" class="flex-1 transition-opacity opacity-0" />
    </div>
  );
});
