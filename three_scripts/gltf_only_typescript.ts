



import * as THREE from "three";

import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener("DOMContentLoaded", function () {
  const scene = new THREE.Scene();
  let Black_color = new THREE.Color(0x000000);
  //let Blue_color = new THREE.Color(0x0000ff);

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

  let server_model: { position: { z: number; y: number; }; children: { material: any; }[]; };
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
  //@ts-ignore
  document.querySelector(".gltfContent").appendChild(renderer.domElement);

  camera.position.x = 0;
  camera.position.z = 5;
  const loader = new GLTFLoader();

  function logserver_model() {
    // Log the server_model variable after one second
    setTimeout(() => {
      console.log("server_model:", server_model);
    }, 1000);
  }

  loader.load(
    "assets/computer_server_1.glb",
    function (gltf: GLTF) {
       scene.add(gltf.scene);

       // Access the children of gltf.scene
       gltf.scene.children.forEach((child) => {
         // Check if the child has a material
         if ("material" in child) {
           // Access the material of the child and do something
           //const material = (child as THREE.Mesh).material;
           // Your code here
         }
       });

      logserver_model();

      // Call animate only when server_model and its children are loaded
      if (server_model && server_model.children[2]) {
        animate();
      }
    },
    undefined,
    function (error: any) {
      console.error(error);
    }
  );

  function light_blink () {
    
    const elapsed = clock.getElapsedTime(); // Get elapsed time from the clock

    if (elapsed % 3 < 0.5 && server_model.children[2]) {
      server_model.children[2].material = blueGlowingMaterial;
      
    } else {
      server_model.children[2].material = blackMaterial;
      console.log("blink called");
    }
    
  }

  light_blink()

  function animate() {
    requestAnimationFrame(animate);

    

    renderer.render(scene, camera);
  }
});
