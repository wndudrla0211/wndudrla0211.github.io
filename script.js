//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for importing the .glb file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the head move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//Instantiate a loader for the .glb file
const loader = new GLTFLoader();

//Load the file
loader.load(
  'images/models/head.glb',
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);

    // Center the model
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);

    // Scale the model to fit in the view
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    object.scale.set(scale, scale, scale);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error('An error happened:', error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = 5;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(0, 5, 5) //top-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

//Render the scene
function animate() {
  requestAnimationFrame(animate);

  //Make the head move
  if (object) {
    // Map mouseX and mouseY to rotation angles
    const rotationX = (mouseY / window.innerHeight - 0.5) * Math.PI * 0.5;
    const rotationY = (mouseX / window.innerWidth - 0.5) * Math.PI * 0.5;

    // Apply rotation with easing
    object.rotation.x += (rotationX - object.rotation.x) * 0.05;
    object.rotation.y += (rotationY - object.rotation.y) * 0.05;
  }
  renderer.render(scene, camera);
}


window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 디버깅을 위한 추가 코드
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message, e.filename, e.lineno, e.colno, e.error);
});

// 추가 디버깅 정보
console.log('Window size:', window.innerWidth, window.innerHeight);
console.log('Model container:', document.getElementById("container3D"));
console.log('THREE object:', THREE);
console.log('GLTFLoader:', GLTFLoader);
