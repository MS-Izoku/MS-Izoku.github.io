// const THREE = require("three")
// const POSTPROCESSING = require("postprocessing")


let composer, scene, camera, renderer;
let objLoader;
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
    antialias: true
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
  const renderPass = new POSTPROCESSING.RenderPass(scene, camera)
  composer.addPass(renderPass);
  renderPass.renderToScreen = true;


 const bloom = (() => {
   const bloomPass = new POSTPROCESSING.BloomEffect()
   bloomPass.blurEffect = new POSTPROCESSING.BlurPass({
     camera: camera
   });
   
  const effectPass = new POSTPROCESSING.EffectPass(
    camera,
    bloomPass,
  );
  effectPass.renderToScreen = true;
  composer.addPass(effectPass);
  // return effectPass;

  updateLoop();
})


  // scene generation
  generateGeometry();
  generateLighting();
};

const generateLighting = () => {
  directionalLight = new THREE.DirectionalLight("rgb(255 , 255 , 255)", 1);
  directionalLight.position.set(0, 3, 1);
  scene.add(directionalLight);
};


// generate scene geometry after startup
const generateGeometry = () => {
  console.log("generating geometry");
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshLambertMaterial({
    color: "rgb(255 , 255 , 0)"
  });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  scene.add(boxMesh);
  boxMesh.position.set(0, -2, -5);
};

const updateLoop = () => {
  //renderer.render(scene, camera);
  composer.render(0.1);
  requestAnimationFrame(updateLoop);
};

//init();
export default init;

