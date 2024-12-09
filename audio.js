Howler.volume(0.5)
const audio = {
  backgroundMusic: new Howl({
    src: './public/audio/backgroundMusic.wav',
    loop: true
  }),
  bomb: new Howl({
    src: './public/audio/bomb.mp3'
  }),
  bonus: new Howl({
    src: './public/audio/bonus.mp3',
    volume: 0.8
  }),
  enemyShoot: new Howl({
    src: './public/audio/enemyShoot.wav'
  }),
  explode: new Howl({
    src: './public/audio/explode.wav'
  }),
  gameOver: new Howl({
    src: './public/audio/gameOver.mp3'
  }),
  select: new Howl({
    src: './public/audio/select.mp3'
  }),
  shoot: new Howl({
    src: './public/audio/shoot.wav'
  }),
  start: new Howl({
    src: './public/audio/start.mp3'
  })
}

export default audio
