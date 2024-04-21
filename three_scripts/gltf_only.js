import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Import other necessary modules

document.addEventListener("DOMContentLoaded", function () {
  // Inside this function, the DOM content is fully loaded
  const scene = new THREE.Scene();
  let BG_color = new THREE.Color(0x000000);
  let protector
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    120
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".gltfContent").appendChild(renderer.domElement);

  
  camera.position.z = 5;


  const loader = new GLTFLoader();

  loader.load(
    "assets/Protector11.glb",
    function (gltf) {
      scene.add(gltf.scene);
      protector = gltf.scene
      protector.position.z = -50;
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  

  function animate() {
    requestAnimationFrame(animate);

     

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
});
