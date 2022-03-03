import "/styles.scss";

import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";

class Renderer {
  constructor(container) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xeeeeee, 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container = container;
    this.container.appendChild(this.renderer.domElement);

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
    this.camera.position.set(0, 0, 2);
    this.scene = new THREE.Scene();

    this.urls = [];
    this.textures = this.urls.map(url => new THREE.TextureLoader().load(url));

    this.u_time = 0;
    this.paused = false;

    this.init();
  }

  init() {
    this.setupResize();
    this.tabEvents();
    this.addObjects();
    this.resize();
    this.render();
    this.mousePosition();
  }

  setupResize() {
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

    this.material.uniforms.u_resolution.value.x = this.width;
    this.material.uniforms.u_resolution.value.y = this.height;
    this.material.uniforms.u_resolution.value.z = 1;
    this.material.uniforms.u_resolution.value.w = 1;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.textures.forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    });
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        u_time: {
          type: "f",
          value: 0,
        },
        u_resolution: {
          type: "v4",
          value: new THREE.Vector4(),
        },
        u_mouse: {
          type: "v2",
          value: new THREE.Vector2(),
        },
        u_texture: {
          value: this.textures[1],
        },
      },
      vertexShader,
      fragmentShader,
    });
    this.material.needsUpdate = true;
    this.geometry = new THREE.PlaneGeometry(1, 1, 1);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  tabEvents() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.play();
      }
    });
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
  }

  mousePosition() {
    document.addEventListener("mousemove", e => {
      this.material.uniforms.u_mouse.value.x = e.clientX;
      this.material.uniforms.u_mouse.value.y = e.clientY;
    });
  }

  render() {
    if (this.paused) {
      return;
    }
    this.u_time += 0.01;
    this.material.uniforms.u_time.value = this.u_time;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

new Renderer(document.getElementById("canvas"));
