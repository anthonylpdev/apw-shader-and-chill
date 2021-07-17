import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'
import testTexture from './water.jpg'

export default class Sketch {
  constructor(options) {
    this.clock = new THREE.Clock()

    this.container = options.domElement
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      10,
    )
    this.camera.position.z = 0.5
    this.camera.position.y = -1

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.raycaster = new THREE.Raycaster()

    this.resize()
    this.addObjects(this)
    this.render()

    this.setUpResize()
  }

  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 128, 128)
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2() },
        uTexture: { value: new THREE.TextureLoader().load(testTexture) },
        uTextureRepeat: {
          type: 'f',
          value: new THREE.Vector2(1, 1),
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.material.uniforms.uTexture.value.wrapS =
      this.material.uniforms.uTexture.value.wrapT = THREE.RepeatWrapping

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

  setUpResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }
}

new Sketch({
  domElement: document.getElementById('container'),
})
