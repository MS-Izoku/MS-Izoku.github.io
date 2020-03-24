//#region DOM
const pageState = {
  activePage: "welcome"
};

const root = document.getElementById("root");
const welcomePage = document.getElementById("welcome");
const contactPage = document.getElementById("contact");
const projectsPage = document.getElementById("projects");
const resumePage = document.getElementById("resume");
const bioPage = document.getElementById("bio");

const homeTab = document.getElementById("home-tab");
const contactTab = document.getElementById("contact-tab");
const resumeTab = document.getElementById("resume-tab");
const bioTab = document.getElementById("bio-tab");
const projectsTab = document.getElementById("projects-tab");

let currentPage;

const swapPage = pageElement => {
  if(pageElement === currentPage) return;
  currentPage.style.display = "none";
  pageElement.style.display = "";

  currentPage = pageElement;
  return currentPage;
};


document.addEventListener("DOMContentLoaded", () => {
  currentPage = welcomePage;
  const startUp = (function() {
    const shutOffPages = (function(){
      bioPage.style.display = "none";
      resumePage.style.display = "none";
      projectsPage.style.display = "none";
      contactPage.style.display = "none";

    }())

    //#region button setup
    homeTab.addEventListener("click", () => {
      swapPage(welcomePage);
    });

    contactTab.addEventListener("click", () => {
      swapPage(contactPage);
    });

    resumeTab.addEventListener("click", () => {
      swapPage(resumePage);
    });

    bioTab.addEventListener("click", () => {
      swapPage(bioPage);
    });

    projectsTab.addEventListener("click" , ()=>{
      swapPage(projectsPage);
    })
    //#endregion

    
  })();
});

//#endregion

//#region THREE.js Handling
//#region scene setup
const scene = new THREE.Scene();
const fog = new THREE.Fog("rgb(255 , 255 , 255)", 10, 1000);
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
renderer.setClearColor("rgb(250 , 250 , 250)");

window.addEventListener("resize", event => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix(); // needs to be run on resize
});

const render = () => {
  renderer.render(scene, camera);
};
//#endregion

//#region Lighting
//#region Godrays
const godray = () => {
  const shape = new THREE.CircleGeometry(200, 50);
  const mat = new THREE.MeshBasicMaterial({ color: "rgb(255 , 0 , 0)" });
  const mesh = new THREE.Mesh(shape, mat);
};

//#endregion

//#region Directional Light Setup
const directionalLight = new THREE.DirectionalLight({
  color: "rgb(255 , 255 , 255)",
  intensity: 0.5
});
scene.add(directionalLight);
scene.add(directionalLight.target);
directionalLight.target.position.set(-4, -1.5, -3);
// //#endregion

// //#region Ambient Light Setup
// const ambientLight = new THREE.AmbientLight("rgba(255 , 255 , 255 )", 0.1);
// scene.add(ambientLight);
// //#endregion

//#region SkyLight Setup (HemisphereLight)
var skyLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.1);
scene.add(skyLight);
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

  const generateWalls = (function() {
    const wallGroup = new THREE.Group();
    scene.add(wallGroup);
    const boundary = () => window.innerWidth / window.innerHeight * 50;
    const depth = () => -window.innerWidth / window.innerHeight * 35;
    const height = () => window.innerWidth / window.innerHeight * 10;

    const wallGeometry = new THREE.BoxGeometry(180, 50, 30);
    const wall = () => {
      const wallMesh = new THREE.Mesh(wallGeometry, cubeMaterial);
      scene.add(wallMesh);
      wallGroup.add(wallMesh);
      return wallMesh;
    };

    const backWall = wall();
    backWall.position.set(0, 16.5, -50);
  })();

  // set these down below to adjust scale
  cluster1().scale.set(1.1, 1.5, 1);
  cluster2().scale.set(0.9, 1.5, 1);
  cluster3();
}

generateBackground();

const update = () => {};
const realTimeLoop = () => {
  requestAnimationFrame(realTimeLoop);
  update();
  render();
};

realTimeLoop();

//#endregion
