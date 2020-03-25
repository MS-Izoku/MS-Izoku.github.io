let composer, scene, camera, renderer;
const backgroundColor = "rgb(225 , 225 , 225)";

// used for initialization
const init = () => {
  // scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor);
  scene.fog = new THREE.FogExp2(scene.background, 0.05);

  camera = new THREE.PerspectiveCamera(
    75, // FoV
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, // inner camera plane
    1000 // outer camera plane
  );

  // renderer setup
  renderer = new THREE.WebGLRenderer({
    antialias: false
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(
    scene.fog.color === null
      ? scene.fog.color
      : new THREE.Color("rgb(225 , 225 , 225)")
  );

  window.addEventListener("resize", event => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix(); // needs to be run on resize
  });

  // POSTPROCESSING setup
  composer = new POSTPROCESSING.EffectComposer(renderer);
  composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
};

const generateFractal = (mesh, count, startScale, endScale) => {
  let xCalc, yClalc, zCalc; // used to calculate position and scale
  const scaler = new THREE.Vector3(
    startScale.x / endScale.x / count,
    startScale.y / endScale.y / count,
    startScale.z / endScale.z / count
  );
  for (let i = 1; i < count; i++) {
    const newMesh = mesh;
    scene.add(newMesh);
    mesh.scale.x = scaler.x * i;
    mesh.scale.y = scaler.y * i;
    mesh.scale.z = scaler.z * i;
  }
};

// generate scene geometry after startup
const generateGeometry = () => {
  generateFractal(
    new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new MeshLambertMaterial({
        color: "rgb(255 , 255 , 255)"
      })
    ),
    5,
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(2, 2, 2)
  );
};

const updateLoop = () => {
  //renderer.render(scene, camera);
  composer.render(0.1);
  requestAnimationFrame(updateLoop);
};

init();
generateGeometry();
updateLoop();
