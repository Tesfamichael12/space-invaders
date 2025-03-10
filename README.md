# 🚀 Space Invaders

Welcome to the **Space Invaders** project! This is an exciting and captivating game where you control a spaceship, navigate through space, and battle against waves of invaders. Get ready for an intergalactic adventure! 🌌

# 🎮 [![Play Live](https://img.shields.io/badge/Play%20Live-Click%20Here-brightgreen)](https://space-invaders-by-tesfamichael-tafere.netlify.app/)

## 🌟 Features

- **Dynamic Spaceship Controls**: Move your spaceship in any direction to dodge enemy fire and position yourself for the perfect shot. 🎮
- **Shooting Mechanics**: Fire lasers to destroy the invaders and protect your spaceship. 💥
- **Invader Grid**: Face a challenging grid of invaders that shoot back at you. Stay sharp and keep moving! 👾
- **Score System**: Track your score as you defeat invaders and aim for the highest score possible. 🏆
- **Exciting Gameplay**: Fast-paced and thrilling action that keeps you on the edge of your seat. 🚀

## 🛠️ How It Was Made

The **Space Invaders** game was built using the HTML5 `<canvas>` element and JavaScript to create an interactive and dynamic gaming experience. Here's a detailed explanation of the key components:

### HTML5 Canvas

The game utilizes the HTML5 `<canvas>` element to render the game graphics. The canvas provides a drawable region in the browser where we can use JavaScript to draw and animate the game elements.

```html
<canvas id="gameCanvas" width="800" height="600"></canvas>
```

### JavaScript Logic

#### Initial Setup

We start by selecting the canvas element and setting up the 2D rendering context:

```javascript
const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
```

#### Game Loop

The game loop is the core of the game, responsible for updating the game state and rendering the graphics on each frame:

```javascript
function gameLoop() {
  update()
  render()
  requestAnimationFrame(gameLoop)
}
```

#### Spaceship Controls

We handle user input to control the spaceship using event listeners for keyboard events:

```javascript
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      // Move spaceship up
      break
    case 'ArrowDown':
      // Move spaceship down
      break
    case 'ArrowLeft':
      // Move spaceship left
      break
    case 'ArrowRight':
      // Move spaceship right
      break
    case ' ':
      // Shoot laser
      break
  }
})
```

#### Shooting Mechanics

We implement the shooting mechanics by creating laser objects and updating their positions:

```javascript
function shootLaser() {
  const laser = {
    x: spaceship.x,
    y: spaceship.y,
    width: 5,
    height: 20,
    speed: 5
  }
  lasers.push(laser)
}

function updateLasers() {
  lasers.forEach((laser) => {
    laser.y -= laser.speed
    // Check for collisions with invaders
  })
}
```

#### Invader Grid

We create a grid of invaders and update their positions to move across the screen:

```javascript
function createInvaders() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      invaders.push({
        x: col * invaderWidth,
        y: row * invaderHeight,
        width: invaderWidth,
        height: invaderHeight
      })
    }
  }
}

function updateInvaders() {
  invaders.forEach((invader) => {
    invader.x += invaderSpeed
    // Change direction and move down if edge is reached
  })
}
```

#### Collision Detection

We implement collision detection to check if lasers hit invaders or if invaders hit the spaceship:

```javascript
function checkCollisions() {
  lasers.forEach((laser) => {
    invaders.forEach((invader) => {
      if (
        laser.x < invader.x + invader.width &&
        laser.x + laser.width > invader.x &&
        laser.y < invader.y + invader.height &&
        laser.y + laser.height > invader.y
      ) {
        // Handle collision
      }
    })
  })
}
```

By combining these components, we create a fully functional and engaging Space Invaders game. Enjoy coding and happy gaming! 🚀👾

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tesfamichael12/space-invaders.git
   ```
2. Navigate to the project directory:
   ```bash
   cd space-invaders
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the game:
   ```bash
   npm start
   ```

## 🤝 Contributing

You are most welcomed to contribut and make this game even better! Feel free to open issues or submit pull requests.

## 📧 Contact

If you have any questions or feedback, please reach out to at [tesfamichael132@gmail.com](mailto:tesfamichael132@gmail.com).

Enjoy the game and happy shooting! 🚀👾
