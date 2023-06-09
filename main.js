import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
gui.close();

// dom elments
const canvas = document.querySelector("canvas.webgl");
const exploreBtn = document.querySelector(".explore-btn");
const buyBtn = document.querySelector(".buy-btn");
const closeBtn = document.querySelector("#close-btn");
const meme = document.querySelector("#meme");
// Scene
const scene = new THREE.Scene();

/**
 * Environment
 */
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
	"./environmentMaps/px.jpg",
	"./environmentMaps/nx.jpg",
	"./environmentMaps/py.jpg",
	"./environmentMaps/ny.jpg",
	"./environmentMaps/pz.jpg",
	"./environmentMaps/nz.jpg",
]);

environmentMap.encoding = THREE.sRGBEncoding;

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
			child.material.envMapIntensity = 1.75;
		}
	});
};

/* 
Model
 */
let laptop = null;
const gltfLoader = new GLTFLoader();
gltfLoader.load("./laptop2.glb", (gltf) => {
	laptop = gltf.scene;
	laptop.position.set(0, -0.7, -1);
	laptop.rotation.set(0, -Math.PI * 0.5, 0);
	scene.add(laptop);
	updateAllMaterials();
	scrollAnimation();
});

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
	50,
	sizes.width / sizes.height,
	0.1,
	100
);
gui.add(camera.position, "x")
	.min(-50)
	.max(50)
	.step(0.0001)
	.setValue(1.825)
	.name("cameraX");
gui.add(camera.position, "y")
	.min(-50)
	.max(50)
	.step(0.0001)
	.setValue(0.61)
	.name("cameraY");
gui.add(camera.position, "z")
	.min(-50)
	.max(50)
	.step(0.0001)
	.setValue(-2.41)
	.name("cameraZ");
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enabled = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(animate);
};

animate();

const cameraPostion = camera.position;

const scrollAnimation = () => {
	const tl = gsap.timeline();
	// PREMIUM BUILD section
	tl.to(cameraPostion, {
		x: 0.18,
		y: 0.04,
		z: 1.95,
		scrollTrigger: {
			trigger: "#section-two",
			start: "top bottom",
			end: "top top",
			scrub: true,
			immediateRender: false,
		},
	})

		.to(laptop.position, {
			x: 0,
			y: -0.85,
			z: -1,
			scrollTrigger: {
				trigger: "#section-two",
				start: "top bottom",
				end: "top top",
				scrub: true,
				immediateRender: false,
			},
		})
		.fromTo(
			"#section-two",
			{ right: "-100%", opacity: 0 },
			{
				left: "0%",
				opacity: 1,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: "#section-two",
					start: "top bottom",
					end: "top top",
					scrub: true,
					immediateRender: false,
				},
			}
		)
		// Next Gen section
		.to(cameraPostion, {
			x: 0.08,
			y: 2.38,
			z: 0,
			scrollTrigger: {
				trigger: "#section-three",
				start: "top bottom",
				end: "top top",
				scrub: true,
				immediateRender: false,
			},
		})
		.fromTo(
			"#section-three",
			{ left: "-100%", opacity: 0 },
			{
				left: "0%",
				opacity: 1,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: "#section-three",
					start: "top bottom",
					end: "top top",
					scrub: true,
					immediateRender: false,
				},
			}
		)
		// BUY NOW section
		.to(cameraPostion, {
			x: 2.246,
			y: 0.5,
			z: 0,
			scrollTrigger: {
				trigger: "#section-four",
				start: "top bottom",
				end: "top top",
				scrub: true,
				immediateRender: false,
			},
		})
		.fromTo(
			"#section-four",
			{ left: "-100%", opacity: 0 },
			{
				left: "0%",
				opacity: 1,
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: "#section-four",
					start: "top bottom",
					end: "top top",
					scrub: true,
					immediateRender: false,
				},
			}
		);
};

// Explore button
exploreBtn.addEventListener("click", () => {
	canvas.style.pointerEvents = "all";
	canvas.style.zIndex = "1";
	exploreAnimation();
	controls.enabled = true;
});

const exploreAnimation = () => {
	const exploreTl = gsap.timeline();

	exploreTl
		.to(laptop.position, {
			x: 0,
			y: -0.7,
			z: -0.5,
			duration: 2.5,
		})
		.to(
			"#explore-wrapper",
			{ opacity: 0, duration: 1.5, ease: "power4.out" },
			"-=2.5"
		)
		.to(
			"#close-btn",
			{ opacity: 1, duration: 1.5, ease: "power4.out" },
			"-=2.5"
		);
};

// Close button
closeBtn.addEventListener("click", () => {
	canvas.style.pointerEvents = "none";
	canvas.style.zIndex = "0";
	closeAnimation();
	controls.enabled = false;
});

const closeAnimation = () => {
	const closeTl = gsap.timeline();

	closeTl
		.to(laptop.position, {
			x: 1,
			y: -0.7,
			z: -1,
			duration: 2.5,
		})
		.to(
			"#explore-wrapper",
			{ opacity: 1, duration: 1.5, ease: "power4.out" },
			"-=2.5"
		)
		.to(
			"#close-btn",
			{ opacity: 0, duration: 1.5, ease: "power4.out" },
			"-=2.5"
		);
};

// Buy button
const audio = new Audio("/bck.mp3");
buyBtn.addEventListener("click", () => {
	meme.style.zIndex = "1";
	buyAnimation();
	audio.play();
});

const buyAnimation = () => {
	const buyTl = gsap.timeline();

	buyTl
		.to(laptop.position, {
			x: 0,
			y: -0.7,
			z: -0.5,
			duration: 2,
		})
		.to(
			laptop.rotation,
			{
				y: Math.PI,
				duration: 5,
			},
			"-=2"
		)
		.to(
			"#explore-wrapper",
			{ opacity: 0, duration: 1.5, ease: "power4.out" },
			"-=2.5"
		)
		.to("#meme", {
			opacity: 1,
			duration: 7,
		});
};
