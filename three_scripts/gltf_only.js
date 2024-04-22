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

  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".gltfContent").appendChild(renderer.domElement);

  
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
      protector = gltf.scene
      protector.position.z = -5;
      protector.rotation.y = 90

      logProtector()
      
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  

  function animate() {

   
    requestAnimationFrame(animate);

     
     if (protector) {
       protector.rotation.y += 0.01;
     }
    // cube.rotation.x += 0.01;
     

    renderer.render(scene, camera);
  }

  animate();
});
