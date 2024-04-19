import * as THREE from "three";

// Import other necessary modules

document.addEventListener("DOMContentLoaded", function () {
  // Inside this function, the DOM content is fully loaded
  const scene = new THREE.Scene();
  let BG_color = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector("#threeShow").appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  scene.background = BG_color;

  cube.position.z = 130;
  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    cube.position.z -= 0.5;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
});
