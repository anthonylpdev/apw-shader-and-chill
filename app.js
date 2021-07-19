import './style.scss'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'
import baseTexture from './texture-02.jpg'
import guify from 'guify'

export default class Sketch {
  constructor(options) {
    this.clock = new THREE.Clock()

    this.width = window.innerWidth / 2
    this.height = window.innerHeight
    this.camera = new THREE.PerspectiveCamera(
        30,
        this.width / this.height,
        0.01,
        80,
    )
    this.camera.rotation.reorder('YXZ')
    this.camera.position.x = 0;
    this.camera.position.z = 30;
    // this.camera.rotation.set(Math.PI * 2, 0, 0);

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: options.domElement
      // alpha: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0xFFFFFF, 1)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 2;
    this.controls.enableDamping = true;
    this.controls.enabled = true;

    this.resize()
    this.addObjects()
    this.render()

    this.setUpResize()

    window.addEventListener('mousemove', (event) => {
      const posX = event.offsetX / this.width;
      const posY = event.offsetY / this.height;
      this.material.uniforms.uPosX.value = posX;
      this.material.uniforms.uPosY.value = -posY + 1;
    })

    // this.gui()

  }

  addObjects() {

    this.loader = new THREE.TextureLoader();

    this.geometry = new THREE.PlaneBufferGeometry(this.width, this.height, 100, 100)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {value: 0.0},
        uApply: {value: 1.0},
        uResolution: {value: new THREE.Vector2()},
        uPosX: {value: 0.0},
        uPosY: {value: 0.0},
        uTexture: {value: this.loader.load(baseTexture)},
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      // blending: THREE.MultiplyBlending,
      transparent: true,
      // wireframe: true
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime()
    requestAnimationFrame(this.render.bind(this))

    this.controls.update();

    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.width = window.innerWidth / 2
    this.height = window.innerHeight

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
  domElement: document.getElementById('decoration'),
})
