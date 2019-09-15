// TODO: change roof color or texture
import * as THREE from '/node_modules/three/build/three.module.js'
import { scene, camera, renderer, clock } from '/utils/scene.js'
import { createFloor } from '/utils/floor.js'
import {randomInRange} from '/utils/helpers.js'
import {FirstPersonControls} from '/node_modules/three/examples/jsm/controls/FirstPersonControls.js'

const size = 100

camera.position.set(80, 80, 80)
const controls = new FirstPersonControls(camera)
controls.movementSpeed = 20
controls.lookSpeed = 0.05

scene.fog = new THREE.FogExp2(0xd0e0f0, 0.0025)
scene.add(createFloor(size * 2, null, 0x101018))

const texture = new THREE.Texture(generateCityTexture())
texture.needsUpdate = true

for (let i = 0; i < size; i++) scene.add(generateBuilding())

/* FUNCTIONS */

function generateCityTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 64
  const context = canvas.getContext('2d')
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  for (let y = 2; y < canvas.height; y += 2)
    for (let x = 0; x < canvas.width; x += 2) {
      const value = Math.floor(Math.random() * canvas.height)
      context.fillStyle = `rgb(${value}, ${value}, ${value})`
      context.fillRect(x, y, 2, 1)
    }
  return canvas
}

function generateBuilding() {
  const geometry = new THREE.CubeGeometry(1, 1, 1)
  geometry.faces.splice(6, 2) // remove floor for optimization
  const num = randomInRange(100, 256, true)
  const color = new THREE.Color(`rgb(${num}, ${num}, ${num})`) // random gray
  const materials = [
    new THREE.MeshLambertMaterial({ map: texture }),
    new THREE.MeshLambertMaterial({ map: texture }),
    new THREE.MeshLambertMaterial({ color }),
    new THREE.MeshLambertMaterial({ map: texture }),
    new THREE.MeshLambertMaterial({ map: texture }),
    new THREE.MeshLambertMaterial({ map: texture }),
  ]
  const mesh = new THREE.Mesh(geometry, materials)
  mesh.rotation.y = Math.random()
  mesh.scale.x = mesh.scale.z = randomInRange(10, 20)
  const scaleY = Math.random() * mesh.scale.x * 4 + 4
  mesh.scale.y = scaleY
  mesh.position.set(randomInRange(-size, size), scaleY / 2, randomInRange(-size, size))
  return mesh
}

/* LOOP */

void function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  controls.update(delta)
  renderer.render(scene, camera)
}()
