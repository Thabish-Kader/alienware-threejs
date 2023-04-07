import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const debugObj = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();

/**
 * Environment
 */
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
	"./environmentMaps/0/px.jpg",
	"./environmentMaps/0/nx.jpg",
	"./environmentMaps/0/py.jpg",
	"./environmentMaps/0/ny.jpg",
	"./environmentMaps/0/pz.jpg",
	"./environmentMaps/0/nz.jpg",
]);
// scene.background = environmentMap;

/*
 Update all materilas 
 */
const updateAllMaterials = () => {
	scene.traverse((child) => {
		if (
			child instanceof THREE.Mesh &&
			child.material instanceof THREE.MeshStandardMaterial
		) {
			child.material.envMap = environmentMap;
			child.material.envMapIntensity = debugObj.envMapIntensity;
		}
	});
};

debugObj.envMapIntensity = 2.5;
gui.add(debugObj, "envMapIntensity")
	.min(0)
	.max(10)
	.step(0.001)
	.onChange(updateAllMaterials);

/* 
Model
 */
const gltfLoader = new GLTFLoader();
gltfLoader.load("./laptop/scene.gltf", (gltf) => {
	scene.add(gltf.scene);
	updateAllMaterials();
});

/**
 * Lights
 */
// Ambient light
// const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
// scene.add(ambientLight);

// Directional light
// const directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
// directionalLight.position.set(4, 5, -2);
// gui.add(directionalLight, "intensity")
// 	.min(0)
// 	.max(5)
// 	.step(0.001)
// 	.name("directionalLightIntensity");
// gui.add(directionalLight.position, "x")
// 	.min(-5)
// 	.max(5)
// 	.step(0.001)
// 	.name("lightX");
// gui.add(directionalLight.position, "y")
// 	.min(-5)
// 	.max(5)
// 	.step(0.001)
// 	.name("lightY");
// gui.add(directionalLight.position, "z")
// 	.min(-5)
// 	.max(5)
// 	.step(0.001)
// 	.name("lightZ");
// scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
// camera.position.x = 2;
// camera.position.y = 2;
// camera.position.z = -1.6;
gui.add(camera.position, "x")
	.min(-50)
	.max(50)
	.step(0.001)
	.setValue(2)
	.name("cameraX");
gui.add(camera.position, "y")
	.min(-50)
	.max(50)
	.step(0.001)
	.setValue(2)
	.name("cameraY");
gui.add(camera.position, "z")
	.min(-50)
	.max(50)
	.step(0.001)
	.setValue(-1.6)
	.name("cameraZ");
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.useLegacyLights = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
