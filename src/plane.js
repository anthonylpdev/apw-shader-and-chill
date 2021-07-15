import * as THREE from 'three';

import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';

import testTexture from '../texture.jpg';

class Plane extends THREE.Object3D {
  init({ scene }) {
    this.geometry = new THREE.PlaneBufferGeometry(0.5, 0.5);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2() },
        uTexture: { value: new THREE.TextureLoader().load(testTexture) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh);
  }
}

export default Plane;
