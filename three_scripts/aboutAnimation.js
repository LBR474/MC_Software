import * as THREE from "three";

// Import other necessary modules

document.addEventListener("DOMContentLoaded", function () {
  const aboutThreeAnimation = document.querySelector("#aboutThreeAnimation");

  const scene = new THREE.Scene();
  let BG_color = new THREE.Color(0x000000);

  // Initialize camera and renderer variables
  let camera, renderer;

  function setup() {
    // Initialize camera
    camera = new THREE.PerspectiveCamera(
      75,
      aboutThreeAnimation.offsetWidth / aboutThreeAnimation.offsetHeight,
      0.1,
      1000
    );

    // Initialize renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      aboutThreeAnimation.offsetWidth,
      aboutThreeAnimation.offsetHeight
    );
    aboutThreeAnimation.appendChild(renderer.domElement);

    // Set height of aboutThreeAnimation based on renderer's aspect ratio
    aboutThreeAnimation.style.height = `${renderer.domElement.clientHeight}px`;
    //aboutThreeAnimation.style.width = `${renderer.domElement.clientWidth}px`;

    // Position the cube within the camera frustum
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
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
      aboutThreeAnimation.offsetWidth / aboutThreeAnimation.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
      aboutThreeAnimation.offsetWidth,
      aboutThreeAnimation.offsetHeight
    );
    aboutThreeAnimation.style.height = `${renderer.domElement.clientHeight}px`;
  }

  setup();
  animate();
  window.addEventListener("resize", onWindowResize, false);
});
