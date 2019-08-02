import { scene, camera, renderer, clock } from '../utils/3d-scene.js'
import { createFloor, createPlayerBox } from '../utils/3d-helpers.js'
import keyboard from '../classes/Keyboard.js'
const { Vector3 } = THREE

scene.add(createFloor(1000, 1000))
const cube = createPlayerBox(0, 0, 50)
scene.add(cube)

function update() {
  const delta = clock.getDelta()
  const moveDistance = 200 * delta // 200 pixels per second
  const rotateAngle = Math.PI / 2 * delta // 90 degrees per second

  // move
  if (keyboard.pressed.KeyA) cube.translateX(-moveDistance)
  if (keyboard.pressed.KeyD) cube.translateX(moveDistance)
  if (keyboard.pressed.KeyW) cube.translateZ(-moveDistance)
  if (keyboard.pressed.KeyS) cube.translateZ(moveDistance)
  // rotate
  if (keyboard.pressed.ArrowLeft) cube.rotateOnAxis(new Vector3(0, 1, 0), rotateAngle)
  if (keyboard.pressed.ArrowRight) cube.rotateOnAxis(new Vector3(0, 1, 0), -rotateAngle)
  if (keyboard.pressed.ArrowUp) cube.rotateOnAxis(new Vector3(1, 0, 0), -rotateAngle)
  if (keyboard.pressed.ArrowDown) cube.rotateOnAxis(new Vector3(1, 0, 0), rotateAngle)
  // reset
  if (keyboard.pressed.KeyZ) {
    cube.rotation.set(0, 0, 0)
    cube.position.set(0, 25, 0)
  }

  const relativeCameraOffset = new Vector3(0, 50, 200)
  const cameraOffset = relativeCameraOffset.applyMatrix4(cube.matrixWorld)
  camera.position.x = cameraOffset.x
  camera.position.y = cameraOffset.y
  camera.position.z = cameraOffset.z
  camera.lookAt(cube.position)
}

/* INIT */

void function animate() {
  requestAnimationFrame(animate)
  update()
  renderer.render(scene, camera)
}()
