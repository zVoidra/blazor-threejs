import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js";

function RunScene(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function handleResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }
  window.addEventListener('resize', handleResize);

  function animate() {
    requestAnimationFrame(animate);
    handleResize();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  return function cleanup() {
    window.removeEventListener('resize', handleResize);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
export { RunScene };
