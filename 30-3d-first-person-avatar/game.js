import { PointerLockControls } from '../node_modules/three/examples/jsm/controls/PointerLockControls.js'
import {createTrees, createFloor} from '../utils/3d-helpers.js'
import {scene, renderer, camera, clock} from '../utils/3d-scene.js'
import Avatar from '../classes/Avatar.js'

new PointerLockControls(camera)

const avatar = new Avatar()
scene.add(avatar.mesh)
scene.add(createTrees())
scene.add(createFloor(500, 500, 'ground.jpg'))

camera.position.z = 400 // distance from player
avatar.mesh.add(camera)

void function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  avatar.update(delta)
  renderer.render(scene, camera)
}()

/* EVENTS */

document.body.addEventListener('click', document.body.requestPointerLock)

document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement) camera.lookAt(avatar.mesh.position)
})