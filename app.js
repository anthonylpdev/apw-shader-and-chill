import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Plane from './src/plane';

class Sketch {
  constructor(options) {
    this.clock = new THREE.Clock();

    this.container = options.domElement;
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10,
    );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.resize();
    this.addObjects();
    this.render();

    this.setUpResize();
  }

  addObjects() {
    this.plane = new Plane();
    this.plane.init(this);
  }

  render() {
    this.plane.material.uniforms.uTime.value = this.clock.getElapsedTime();

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  setUpResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }
}

new Sketch({
  domElement: document.getElementById('container'),
});
