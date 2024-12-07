const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = innerHeight

// Player
class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }
    this.speed = 3

    this.rotate = 0

    const image = new Image()
    image.src = './images/spaceship.png'
    image.onload = () => {
      const scale = 0.12
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  draw() {
    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);

    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )

    c.rotate(this.rotate)

    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )

    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )

    c.restore()
  }

  move() {
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}

class Projectiles {
  constructor(position, velocity) {
    this.position = position
    this.velocity = velocity

    this.radius = 3
    // this.color = "white";
    // this.width = 5;
    // this.height = 5;
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'red'
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Invader {
  constructor({ position }) {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = './images/invader.png'
    image.onload = () => {
      const scale = 1
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: position.x,
        y: position.y
      }
    }
  }

  draw() {
    if (this.image) {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }
  }

  update({ velocity }) {
    if (this.image) {
      this.draw()
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }

    this.velocity = {
      x: 3,
      y: 0
    }

    this.invaders = []

    const columns = Math.floor(Math.random() * 10 + 5)
    const rows = Math.floor(Math.random() * 5 + 2)

    this.width = columns * 30
    this.height = rows * 30

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 30,
              y: y * 30
            }
          })
        )
      }
    }
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.velocity.y = 0 // every fram reset the y velocity to 0 and then add 30 the height of one invader

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x
      this.velocity.y = 30
    }

    if (this.position.y + this.height >= canvas.height) {
      this.velocity.y = 0
    }
  }
}

const player = new Player()
const projectiles = []
const invaders = new Invader({ position: { x: 0, y: 0 } })
const grids = []
const key = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  s: {
    pressed: false
  },
  space: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  }
}

let frames = 0
let randomInterval = Math.floor(Math.random() * 500) + 500

function animation() {
  requestAnimationFrame(animation)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.move()

  grids.forEach((grid) => {
    grid.update()
    grid.invaders.forEach((invader) => {
      invader.update({ velocity: grid.velocity })
    })
  })

  projectiles.forEach((projectile, index) => {
    projectile.update()
    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > canvas.width ||
      projectile.position.y + projectile.radius < 0 ||
      projectile.position.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    }
  })

  if ((key.ArrowLeft.pressed || key.a.pressed) && player.position.x > 0) {
    player.velocity.x = -player.speed
    player.rotate = -0.15
  } else if (
    (key.ArrowRight.pressed || key.d.pressed) &&
    player.position.x + player.width < canvas.width
  ) {
    player.velocity.x = player.speed
    player.rotate = 0.15
  } else {
    player.velocity.x = 0
    player.rotate = 0
  }

  if ((key.ArrowUp.pressed || key.w.pressed) && player.position.y > 5) {
    // we can set it to 0 but the tip of the spaceship will be cut off
    player.velocity.y = -player.speed
  } else if (
    (key.ArrowDown.pressed || key.s.pressed) &&
    player.position.y + player.height < canvas.height
  ) {
    player.velocity.y = player.speed
  } else {
    player.velocity.y = 0
  }

  console.log(frames)
  if (frames % randomInterval === 0) {
    grids.push(new Grid())
    randomInterval = Math.floor(Math.random() * 500) + 500
    frames = 0
  }
  frames++
}

animation()

addEventListener('keydown', ({ key: keyPressed }) => {
  switch (keyPressed) {
    case 'a':
    case 'ArrowLeft':
      key.a.pressed = true
      key.ArrowLeft.pressed = true
      break
    case 'd':
    case 'ArrowRight':
      key.d.pressed = true
      key.ArrowRight.pressed = true
      break
    case 'w':
    case 'ArrowUp':
      key.w.pressed = true
      key.ArrowUp.pressed = true
      break
    case 's':
    case 'ArrowDown':
      key.s.pressed = true
      key.ArrowDown.pressed = true
      break

    case ' ':
      projectiles.push(
        new Projectiles(
          {
            x: player.position.x + player.width / 2,
            y: player.position.y
          },
          {
            x: 0,
            y: -5
          }
        )
      )
      break
  }
})

addEventListener('keyup', ({ key: keyPressed }) => {
  switch (keyPressed) {
    case 'a':
    case 'ArrowLeft':
      key.a.pressed = false
      key.ArrowLeft.pressed = false
      break
    case 'd':
    case 'ArrowRight':
      key.d.pressed = false
      key.ArrowRight.pressed = false
      break
    case 'w':
    case 'ArrowUp':
      key.w.pressed = false
      key.ArrowUp.pressed = false
      break
    case 's':
    case 'ArrowDown':
      key.s.pressed = false
      key.ArrowDown.pressed = false
      break
  }
})
