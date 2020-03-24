//#region scene setup
let composer; // set up here due t rendering issues

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2("rgb(255 , 250 , 235)", 0.001);

const camera = new THREE.PerspectiveCamera(
  75, // FoV
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // inner camera plane
  1000 // outer camera plane
);
camera.position.z = 5;
//#endregion

//#region renderer setup
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(scene.fog.color);

window.addEventListener("resize", event => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix(); // needs to be run on resize
});

//#endregion

//#region PostProcessing Setup
composer = new POSTPROCESSING.EffectComposer(renderer);
const renderPass = new POSTPROCESSING.RenderPass(scene, camera);
composer.addPass(renderPass);

let areaImage = new Image();
areaImage.src = POSTPROCESSING.SMAAEffect.areaImageDataURL;
let searchImage = new Image();
searchImage.src = POSTPROCESSING.SMAAEffect.searchImageDataURL;
let smaaEffect = new POSTPROCESSING.SMAAEffect(searchImage, areaImage, 1);
//#endregion

//#region Lighting
//#region Godrays
const godray = (position, mesh = null , options = {}) => {
  const shape = new THREE.PlaneGeometry(1950, 1050);
  const mat = new THREE.MeshBasicMaterial({ color: "rgb(255 , 255 , 255)" }); // Light Color
  mesh = mesh ? mesh : new THREE.Mesh(shape, mat);

  mesh.position.set(position.x, position.y, position.z);
  scene.add(mesh);

  let godRayEffect = new POSTPROCESSING.GodRaysEffect(camera, mesh, {
    resolutionScale: options.resolutionScale ? options.resolutionScale : 1,
    density: options.density ? options.density : 0.2,
    decay: options.decay ? options.decay : 0.95,
    weight: options.weight ? options.weight :  0.1,
    samples: options.samples ? options.samples : 100
  });
  return godRayEffect;
};

const godray1 = new POSTPROCESSING.EffectPass(
  camera,
  smaaEffect,
  godray(new THREE.Vector3(0, 250, -950))
);

 composer.addPass(godray1);
//#endregion

//#region Directional Light Setup
const directionalLight = new THREE.DirectionalLight({
  color: "rgb(255 , 255 , 255)",
  intensity: 0.25
});
scene.add(directionalLight);
scene.add(directionalLight.target);
directionalLight.target.position.set(0, 20, -35);
// //#endregion

//#region Ambient Light Setup
const ambientLight = new THREE.AmbientLight("rgba(255 , 245 , 225 )", 0.1);
scene.add(ambientLight);
//#endregion

//#region Mesh Generators
const cubeMaterial = new THREE.MeshPhongMaterial({
  color: "rgb(255 , 255 , 255)"
});

function generateCube(size, position, group = null) {
  const cubeGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);
  cube.position.set(position.x, position.y, position.z);
  if (group != null) group.add(cube);
  return cube;
}
//#endregion

function generateBackground() {
  //#region Cube-Cluster Objects
  const cluster1 = () => {
    const group = new THREE.Group();
    scene.add(group);
    const cube1 = generateCube(
      new THREE.Vector3(2, 2.25, 2),
      new THREE.Vector3(-0.25, 0, 0.5),
      group
    );
    const cube2 = generateCube(
      new THREE.Vector3(2, 2.5, 2.5),
      new THREE.Vector3(0, -0.5, 0),
      group
    );
    const cube3 = generateCube(
      new THREE.Vector3(1.75, 1, 1),
      new THREE.Vector3(0, -2, 0),
      group
    );
    const cube4 = generateCube(
      new THREE.Vector3(3, 2, 0),
      new THREE.Vector3(0.5, 0, 0.25),
      group
    );
    const cube5 = generateCube(
      new THREE.Vector3(1.5, 1.5, 1.5),
      new THREE.Vector3(0.75, -1.5, -0.5),
      group
    );
    const cube6 = generateCube(
      new THREE.Vector3(2, 3, 1),
      new THREE.Vector3(-1, -0.5, 0.5),
      group
    );
    const cube7 = generateCube(
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(-1, -1.75, 0),
      group
    );

    group.position.set(-5.5, 1.75, -1);
    return group;
  };

  const cluster2 = () => {
    const group = new THREE.Group();
    scene.add(group);
    const cube1 = generateCube(
      new THREE.Vector3(2.5, 2, 3),
      new THREE.Vector3(0.5, 0.5, 0),
      group
    );
    const cube2 = generateCube(
      new THREE.Vector3(1.5, 1.5, 1.5),
      new THREE.Vector3(0.25, -0.25, 0.5),
      group
    );
    const cube3 = generateCube(
      new THREE.Vector3(3, 2, 0),
      new THREE.Vector3(1.25, -1, 0),
      group
    );
    const cube4 = generateCube(
      new THREE.Vector3(2, 3, 2),
      new THREE.Vector3(-0.5, -0.25, 0),
      group
    );
    group.position.set(5.5, 2, -1);
    return group;
  };

  const cluster3 = () => {
    const group = new THREE.Group();
    scene.add(group);
    const cube1 = generateCube(
      new THREE.Vector3(1.5, 2.25, 1.5),
      new THREE.Vector3(0, 0, 0),
      group
    );
    const cube2 = generateCube(
      new THREE.Vector3(1, 2, 1),
      new THREE.Vector3(-0.5, -0.5, 0.5),
      group
    );
    const cube3 = generateCube(
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(0, -1.5, -0.25),
      group
    );
    const cube4 = generateCube(
      new THREE.Vector3(1.5, 2, 1),
      new THREE.Vector3(0.5, -0.5, 0),
      group
    );
    const cube5 = generateCube(
      new THREE.Vector3(1, 0.5, 0.5),
      new THREE.Vector3(0, -1, 0.5),
      group
    );
    const cube6 = generateCube(
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(0, 0, 0),
      group
    );
    group.position.set(2.5, 3, -5);
    return group;
  };
  //#endregion

  // generate floating elements
  const floaters = (function() {
    const group = new THREE.Group();
    scene.add(group);
    const cube1 = generateCube(
      new THREE.Vector3(1, 1.5, 1.25),
      new THREE.Vector3(-2, -2, -3),
      group
    );
    const cube2 = generateCube(
      new THREE.Vector3(1.5, 3, 3),
      new THREE.Vector3(-4.5, 3, -7),
      group
    );
    const cube3 = generateCube(
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(3, 5, -3),
      group
    );
  })();

  // generate base plane(bottom of screen)
  const plane = (function() {
    const planeGeometry = new THREE.PlaneGeometry(30, 4);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: "rgb(255 , 255 , 255)"
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);
    planeGeometry.lookAt(new THREE.Vector3(0, 1, 0));
    planeMesh.position.set(0, -3, 0);
    return planeMesh;
  })();

  // set these down below to adjust scale
  cluster1().scale.set(1.1, 1.5, 1);
  cluster2().scale.set(0.9, 1.5, 1);
  cluster3();
}

generateBackground();

const render = () => {
  //renderer.render(scene, camera); // w/o postprocessing
  composer.render(0.1); // w/ postprocessing
};

const update = () => {};
const realTimeLoop = () => {
  requestAnimationFrame(realTimeLoop);
  update();
  render();
};

realTimeLoop();
