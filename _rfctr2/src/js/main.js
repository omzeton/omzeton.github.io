import anime from "animejs";
import * as THREE from "three";
import Splitter from "./splitText";

class Controller {
    constructor() {
        this.navButtons = [...document.querySelectorAll(".splash__menu-tab")];
        this.footer = document.querySelector("footer");
        this.time = 0;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.material = null;
        this.width = null;
        this.height = null;
        this.init();
    }

    init() {
        this.onLoadAnimations();
        // this.noiseBackground();
    }

    onLoadAnimations() {
        const headerLetters = new Splitter(document.querySelector(".splash-header"));

        const splashAnimationsTimeline = anime.timeline();
        splashAnimationsTimeline.add({
            targets: ".morph__svg",
            opacity: [0, 1],
            duration: 1000,
            easing: "easeInQuad",
        });
        splashAnimationsTimeline.add(
            {
                targets: headerLetters.chars,
                translateY: [30, 0],
                opacity: [0, 1],
                rotate: [3, 0],
                delay: anime.stagger(40),
                easing: "easeInQuad",
            },
            "-=400"
        );
        splashAnimationsTimeline.add(
            {
                targets: ".splash-subtext",
                translateY: [10, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                easing: "easeInOutCirc",
                complete() {
                    document.querySelector(".splash-line").classList.add("active-line");
                },
            },
            "-=600"
        );
        splashAnimationsTimeline.add(
            {
                targets: ".splash-menu",
                opacity: [0, 1],
                duration: 1000,
            },
            "+=600"
        );
    }

    noiseBackground() {
        const sceneWrapper = document.getElementById("scene");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
        this.camera.position.set(0, 0, 2);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        sceneWrapper.appendChild(this.renderer.domElement);

        const vertexShader = document.getElementById("vertexShader").textContent;
        const fragmentShader = document.getElementById("fragmentShader").textContent;
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: {
                time: {
                    type: "f",
                    value: 0,
                },
                tDiffuse: {
                    type: "sampler2d",
                    value: 0,
                },
                resolution: {
                    type: "v4",
                    value: new THREE.Vector4(),
                },
            },
            vertexShader,
            fragmentShader,
        });
        this.material.needsUpdate = true;
        const geometry = new THREE.PlaneGeometry(1, 1, 1);
        this.plane = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.plane);

        this.camera.updateProjectionMatrix();
        this.resize();
        this.render();
        window.addEventListener("resize", this.resize.bind(this));
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * this.camera.position.z));

        if (this.width / this.height > 1) {
            this.plane.scale.x = this.camera.aspect;
        } else {
            this.plane.scale.y = 1 / this.camera.aspect;
        }

        this.material.uniforms.resolution.value.x = this.width;
        this.material.uniforms.resolution.value.y = this.height;
        this.material.uniforms.resolution.value.z = 1;
        this.material.uniforms.resolution.value.w = 1;

        this.camera.updateProjectionMatrix();
    }

    render() {
        this.time += 0.01;
        this.material.uniforms.time.value = this.time;
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

new Controller();
