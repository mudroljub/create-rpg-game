import { scene, renderer, clock, camera } from '../utils/three-scene.js'
import { createTrees, createFloor } from '../utils/three-helpers.js'
import {keyboard, Avatar} from '../classes/index.js'

const avatar = new Avatar()
scene.add(avatar.mesh)
scene.add(createFloor(500, 500, 'ground.jpg'))
scene.add(createTrees())

camera.position.set(0, 200, 350)
camera.lookAt(scene.position)

const chaseCamera = camera.clone()
let currentCamera = camera
scene.add(currentCamera)

/* FUNCTIONS */

const chooseCamera = () => {
  if (keyboard.pressed.Digit1) currentCamera = camera
  if (keyboard.pressed.Digit2) currentCamera = chaseCamera
}

function updateChase() {
  const distance = new THREE.Vector3(0, 100, 200)
  const {x, y, z} = distance.applyMatrix4(avatar.mesh.matrixWorld)
  chaseCamera.position.set(x, y, z)
}

/* INIT */

void function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  avatar.update(delta)
  chooseCamera()
  if (currentCamera == chaseCamera) updateChase()
  renderer.render(scene, currentCamera)
}()