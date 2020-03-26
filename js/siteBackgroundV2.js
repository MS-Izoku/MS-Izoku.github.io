let composer, scene, camera, renderer;
let directionalLight;

const backgroundColor = "rgb(25 , 25 , 25)";

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
  generateGeometry();
  generateLighting();
};

const generateLighting = () => {
  directionalLight = new THREE.DirectionalLight("rgb(255 , 255 , 255)", 1);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);
};

const generateFractal = (
  mesh,
  count,
  startPos,
  endPos,
  startScale,
  endScale
) => {
  const getAverage = (x, y) => (x + y) / 2;

  const scaler = new THREE.Vector3(
    getAverage(startScale.x, endScale.x) / count,
    getAverage(startScale.y, endScale.y) / count,
    getAverage(startScale.z, endScale.z) / count
  );

  const transformLerp = new THREE.Vector3(
    getAverage(startPos.x, endPos.x) / count,
    getAverage(startPos.y, endPos.y) / count,
    getAverage(startPos.z, endPos.z) / count
  );
  for (let i = 0; i < count; i++) {
    let instance = new THREE.Mesh(mesh.geometry, mesh.material);

    instance.scale.set(
      scaler.x * (i + 1),
      scaler.y * (i + 1),
      scaler.z * (i + 1)
    );
    instance.position.set(
      transformLerp.x * i,
      transformLerp.y * i,
      -1 //  transformLerp.z * i - 1
    );
    console.log(instance.position);
    scene.add(instance);
  }
};

// generate scene geometry after startup
const generateGeometry = () => {
  console.log("generating geometry");
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(255 , 255 , 0)"
  });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  generateFractal(
    boxMesh,
    7,
    new THREE.Vector3(0, 5, 0),
    new THREE.Vector3(0, -5, 0),
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(1, 1, 1)
  );
};

const updateLoop = () => {
  //renderer.render(scene, camera);
  composer.render(0.1);
  requestAnimationFrame(updateLoop);
};

init();

updateLoop();
