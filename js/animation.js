import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', function () {
  // escena y camara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// canvas responsivo
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// modelo 3D
const loader = new GLTFLoader();
loader.load('../public/scene.gltf', gltf => {
  const modelo = gltf.scene;
  modelo.position.set(0, 0, 0);
  modelo.scale.set(1, 1, 1);
  modelo.name = 'modelo'
  scene.add(modelo);
})

// luces
const luzAmbiental = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(luzAmbiental);
const luzDireccional = new THREE.DirectionalLight(0xf39f18 , 1); 
luzDireccional.position.set(1, 1, 1);
scene.add(luzDireccional);
const luzSpot = new THREE.SpotLight(0x036F03, 2);
luzSpot.position.set(-1, 1, -1);
scene.add(luzSpot);

// controles orbitales
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  const modelo = scene.getObjectByName('modelo');
  if (modelo) {
    modelo.rotation.y -= 0.005;
  }
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();
});
