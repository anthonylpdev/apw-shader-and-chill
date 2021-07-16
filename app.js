import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'
import testTexture from './texture-02.jpg'
import guify from 'guify'

export default class Sketch {
  constructor(options) {
    this.clock = new THREE.Clock()

    this.container = options.domElement
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth
    this.camera = new THREE.PerspectiveCamera(
        30,
        this.width / this.height,
        0.01,
        1000,
    )
    this.camera.rotation.reorder('YXZ')
    this.camera.position.x = 0;
    this.camera.position.z = 40;
    // this.camera.rotation.set(Math.PI * 2, 0, 0);
    console.log(this.camera);

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor('0x555', 1)
    this.container.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)


    this.resize()
    this.addObjects()
    this.render()

    this.setUpResize()

    this.gui()

  }

  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(60, 20, 100, 100)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {value: 0.0},
        uApply: {value: 1.0},
        uResolution: {value: new THREE.Vector2()},
        uTexture: {value: new THREE.TextureLoader().load(testTexture)},
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      // blending: THREE.AdditiveBlending,
      transparent: true
      //wireframe: true
    })
    console.log(this.geometry, this.material);

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime()
    requestAnimationFrame(this.render.bind(this))

    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  applyNoise(val) {
    this.material.uniforms.uApply.value = val;
  }

  setUpResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  gui() {
    this.gui = new guify({
      title: "Some Title",
      align: 'right',
      // theme: 'light'
    });

    this.gui.Register([
      {
        type: 'range',
        label: 'Range',
        min: 0,
        max: 1,
        step: 0.01,
        onChange: this.applyNoise.bind(this)
      }
    ]);
  }


}

new Sketch({
  domElement: document.getElementById('container'),
})
