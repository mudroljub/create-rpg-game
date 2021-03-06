import { scene, renderer, camera, clock, createOrbitControls} from '/utils/scene.js'
import {PlayerModel, Robotko} from '/classes/index.js'

camera.position.set(50, 10, 0)
createOrbitControls()

const player = new PlayerModel(0, 0, 0, 20, mesh => {
  mesh.rotateY(Math.PI)
  mesh.add(camera)
  scene.add(mesh)
}, Robotko)

/* LOOP */

void function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  player.update(delta)
  renderer.render(scene, camera)
}()
