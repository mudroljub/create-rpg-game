import {scene, renderer, camera, createOrbitControls} from '/utils/scene.js'
import {create3DMap} from '/utils/maps.js'
import {createFloor} from '/utils/floor.js'
import matrix from '/data/small-map.js'

camera.position.z = 15
camera.position.y = 10

const controls = createOrbitControls()
scene.add(createFloor())
scene.add(create3DMap(matrix))

void function gameLoop() {
  requestAnimationFrame(gameLoop)
  controls.update()
  renderer.render(scene, camera)
}()
