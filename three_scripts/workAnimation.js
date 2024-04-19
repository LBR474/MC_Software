import * as THREE from "three";

// Import other necessary modules

document.addEventListener("DOMContentLoaded", function () {
  const workThreeAnimation = document.querySelector("#workThreeAnimation");

  const scene = new THREE.Scene();
  let BG_color = new THREE.Color(0x000000);

  // Initialize camera and renderer variables
  let camera, renderer;

  function setup() {
    // Initialize camera
    camera = new THREE.PerspectiveCamera(
      75,
      workThreeAnimation.offsetWidth / workThreeAnimation.offsetHeight,
      0.1,
      1000
    );

    // Initialize renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      workThreeAnimation.offsetWidth,
      workThreeAnimation.offsetHeight
    );
    workThreeAnimation.appendChild(renderer.domElement);

    // Set height of workThreeAnimation based on renderer's aspect ratio
    workThreeAnimation.style.height = `${renderer.domElement.clientHeight}px`;
    //workThreeAnimation.style.width = `${renderer.domElement.clientWidth}px`;

    // Position the cube within the camera frustum
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xFF69B4 });
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
    camera.aspect =
      workThreeAnimation.offsetWidth / workThreeAnimation.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
      workThreeAnimation.offsetWidth,
      workThreeAnimation.offsetHeight
    );
    workThreeAnimation.style.height = `${renderer.domElement.clientHeight}px`;
  }

  setup();
  animate();
  window.addEventListener("resize", onWindowResize, false);
});
