const preventShake = e => {
  if (e.code == 'Space' || e.code == 'ArrowUp' || e.code == 'ArrowDown') e.preventDefault()
}

// Singleton
class Keyboard {
  constructor() {
    this.pressed = {}
    this.addEvents()
  }

  addEvents() {
    document.addEventListener('keydown', e => {
      preventShake(e)
      this.pressed[e.code] = true
    })
    document.addEventListener('keyup', e => {
      this.pressed[e.code] = false
    })
    document.addEventListener('touchstart', e => this.chooseDirection(e.touches[0]))
    document.addEventListener('touchmove', e => this.chooseDirection(e.touches[0]))
    document.addEventListener('touchend', () => this.reset())
  }

  chooseDirection(touch) {
    if (touch.pageY < window.innerHeight / 2) this.pressed.ArrowUp = true
    if (touch.pageY >= window.innerHeight / 2) this.pressed.ArrowDown = true
    if (touch.pageX < window.innerWidth / 2) this.pressed.ArrowLeft = true
    if (touch.pageX >= window.innerWidth / 2) this.pressed.ArrowRight = true
  }

  get totalPressed() {
    return Object.values(this.pressed).filter(x => x).length
  }

  reset() {
    for (const key in this.pressed) this.pressed[key] = false
  }
}

export default new Keyboard