import * as THREE from "three";

// Import other necessary modules

document.addEventListener("DOMContentLoaded", function () {
  const introThreeAnimation = document.querySelector("#introThreeAnimation");

  const scene = new THREE.Scene();
  let BG_color = new THREE.Color(0x000000);

  // Initialize camera and renderer variables
  let camera, renderer;

 function setup() {
   // Initialize camera
   camera = new THREE.PerspectiveCamera(
     75,
     introThreeAnimation.offsetWidth / introThreeAnimation.offsetHeight,
     0.1,
     1000
   );

   // Initialize renderer
   renderer = new THREE.WebGLRenderer();
   renderer.setSize(
     introThreeAnimation.offsetWidth,
     introThreeAnimation.offsetHeight
   );
   introThreeAnimation.appendChild(renderer.domElement);

   // Set height of introThreeAnimation based on renderer's aspect ratio
   introThreeAnimation.style.height = `${renderer.domElement.clientHeight}px`;

   // Position the cube within the camera frustum
   const geometry = new THREE.BoxGeometry(1, 1, 1);
   const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
   const cube = new THREE.Mesh(geometry, material);
   scene.add(cube);
   scene.background = BG_color;

   // Adjust cube position so that it's visible within the camera frustum
   cube.position.x = 0;
   cube.position.y = 0;
   cube.position.z = 0; // Move the cube closer to the camera

   // Set camera position
   camera.position.z = 5;
 }

  // Function to animate the scene
  function animate() {
    requestAnimationFrame(animate);
    // Rotate the cube
    scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      }
    });
    // Render the scene
    renderer.render(scene, camera);
  }

 function onWindowResize() {
   if (window.innerWidth < 1200) {
     // Adjust the canvas size and camera aspect ratio
     camera.aspect =
       introThreeAnimation.offsetWidth / introThreeAnimation.offsetHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(
       introThreeAnimation.offsetWidth,
       introThreeAnimation.offsetHeight
     );
     introThreeAnimation.style.height = `${renderer.domElement.clientHeight}px`;
   } else {
     // Reset to original aspect ratio
     camera.aspect = 75;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
   }
 }

 setup();
 animate();
 window.addEventListener("resize", onWindowResize, false);
});

