import * as THREE from '/node_modules/three/build/three.module.js'
import { scene, camera, renderer, createOrbitControls } from '/utils/scene.js'
import { createFloor } from '/utils/floor.js'
import { generateCity } from '/utils/city.js'

const size = 100

createOrbitControls()
scene.fog = new THREE.FogExp2(0xd0e0f0, 0.0025)
scene.add(createFloor(size * 2, null, 0x101018))

scene.add(generateCity(size))

/* LOOP */

void function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}()
