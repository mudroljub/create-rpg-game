import { scene, renderer, camera } from '../utils/three-scene.js'
import { createPlane, createSketchTrees } from '../utils/three-helpers.js'
import PlayerBox from '../classes/PlayerBox.js'

const characterSize = 50
const solids = []

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

scene.background = new THREE.Color(0xccddff)
scene.fog = new THREE.Fog(0xccddff, 500, 2000)
const ambient = new THREE.AmbientLight(0xffffff)
scene.add(ambient)

const hemisphereLight = new THREE.HemisphereLight(0xdddddd, 0x000000, 0.5)
scene.add(hemisphereLight)

const player = new PlayerBox(characterSize)
scene.add(player.mesh)

camera.position.z = -300
camera.position.y = 200
player.add(camera)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enablePan = true
controls.enableZoom = true
controls.maxDistance = 1000
controls.minDistance = 60
controls.target.copy(new THREE.Vector3(0, characterSize / 2, 0))

const plane = createPlane()
scene.add(plane)

const trees = createSketchTrees()
scene.add(trees.group)
solids.push(...trees.solids)

/* INIT */

void function animate() {
  requestAnimationFrame(animate)
  player.update(solids)
  if (camera.position.y < 10) camera.position.y = 10
  renderer.render(scene, camera)
}()

/* EVENTS */

function updateRaycast(event) {
  event.preventDefault()
  player.movements = []

  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1
  mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects([plane]) // must be array
  if (intersects.length > 0) player.movements.push(intersects[0].point)
}

document.addEventListener('mousedown', updateRaycast)