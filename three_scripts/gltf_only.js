import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", function () {
  const scene = new THREE.Scene();
  let Black_color = new THREE.Color(0x000000);
  let Blue_color = new THREE.Color(0x0000ff);

  // Define the bright glowing light blue color
  const BrightBlue_color = new THREE.Color(0x00ffff);

  // Create the material with emissive color and intensity
  const blueGlowingMaterial = new THREE.MeshStandardMaterial({
    color: BrightBlue_color,
    emissive: BrightBlue_color,
    emissiveIntensity: 7,
  });
  // Create the material with emissive color and intensity
  const blackMaterial = new THREE.MeshStandardMaterial({
    color: Black_color,
  });

  let protector;
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    120
  );

  const clock = new THREE.Clock(); // Create a clock instance

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".gltfContent").appendChild(renderer.domElement);

  camera.position.x = 0;
  camera.position.z = 5;
  const loader = new GLTFLoader();

  function logProtector() {
    // Log the protector variable after one second
    setTimeout(() => {
      console.log("protector:", protector);
    }, 1000);
  }

  loader.load(
    "assets/computer_server_1.glb",
    function (gltf) {
      scene.add(gltf.scene);
      protector = gltf.scene;
      protector.position.z = -5;
      protector.position.y = -3;
      //protector.rotation.y = Math.PI / -28;

      logProtector();

      // Call animate only when protector and its children are loaded
      if (protector && protector.children[2]) {
        animate();
      }
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime(); // Get elapsed time from the clock

    if (protector) {
      //protector.rotation.y -= 0.01;
      //console.log(protector.rotation)
    }
    if (elapsed % 3 < 0.5 && protector.children[2]) {
      protector.children[2].material = blueGlowingMaterial;
    } else {
      protector.children[2].material = blackMaterial;
    }

    renderer.render(scene, camera);
  }
});
