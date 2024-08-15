function create3DViewer(containerId, modelPath) {
  const container = document.getElementById(containerId);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const loader = new THREE.GLTFLoader();

  // Ambient Light - general light for the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Intensity set to 1.5
  scene.add(ambientLight);

  // Directional Light - acts like a sunlight
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity to 2
  directionalLight.position.set(2, 2, 5).normalize();
  scene.add(directionalLight);

  //Add lights to the scene, so we can actually see the 3D model
  const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
  topLight.position.set(500, 500, 500); //top-left-ish
  topLight.castShadow = true;
  scene.add(topLight);

  // Optional: Additional point light for extra brightness
  const pointLight = new THREE.PointLight(0xffffff, 1.5); // Intensity set to 1.5
  pointLight.position.set(0, 3, 3);
  scene.add(pointLight);

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  });

  camera.position.z = 5;

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Adjust the renderer on window resize
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

// Initialize the viewers for each model
create3DViewer("modelViewer1", "assets/models/oxygencylinder.glb");
create3DViewer("modelViewer2", "assets/models/maskonly.glb");
create3DViewer("modelViewer3", "assets/models/regulator.glb");
