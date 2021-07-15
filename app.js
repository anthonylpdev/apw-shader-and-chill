import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'
import testTexture from './img/psy2.jpg'

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
        1000,
    )
    this.camera.position.z = 20

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.resize()
    this.addObjects()
    this.render()
    this.setUpResize()
  
  }

  addObjects() {

    this.geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
    
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {value: 0.0},
        uResolution: {value: new THREE.Vector2()},
        uTexture: {value: new THREE.TextureLoader().load(testTexture)},
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime()
    // this.mesh.rotation.z += 0.01 / 2;
    // this.mesh.rotation.y += 0.02 / 2 ;
    // this.mesh.rotation.x += 0.005 / 2; 
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
