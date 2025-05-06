// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/FondoMenu.jpg");
    this.load.image("logo", "./public/assets/Ninja.png");
    this.load.image("ground", "./public/assets/platform.png");
    this.load.image("diamond", "./public/assets/diamond.png");
    this.load.image("square", "./public/assets/square.png");
    this.load.image("triangle", "./public/assets/triangle.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "sky");

    //----------Jugador----------
    this.player = this.physics.add.sprite(400, 300, "logo");

    this.player.setScale(0.1);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    //----------Plataformas----------
    this.plataformas = this.physics.add.staticGroup();

    this.plataformas.create(400, 600, "ground").setScale(2).refreshBody();

    this.physics.add.collider(this.player, this.plataformas);

    //----------JUEGO----------

    //----------Game Over----------
    this.gameOver = false;

    //---------Tiempo----------
    this.tiempo = 10;
    this.timeText = this.add.text(600, 16, `Tiempo: ${this.tiempo}`, {
        fontSize: "32px",
        fill: "#000",
    });

    this.time.addEvent({
      delay: 1000, // 1000 ms = 1 segundo
      callback: () => {
        if (this.tiempo > 0) {
          this.tiempo--;
          this.timeText.setText(`Tiempo: ${this.tiempo}`);
        } else {
          this.timeGO = true; // Marca el final del tiempo
          this.timeText.setText(`Time's Up!`);
          this.timeText.setColor("red");
          this.gameOver = true;
        }
      },
      callbackScope: this,
      loop: true,
    });

    // Partículas
    const emitter = this.add.particles(0, 0, "red", {
      speed: 5,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    emitter.startFollow(this.player, 0, 0, true);
  }

  update() {
    // update s objects
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

    } else {
        this.player.setVelocityX(0);

    } if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
}
    if (this.gameOver) {
      this.player.setVelocity(0, 0); // Detiene al jugador
      this.player.setTint(0xff0000); // Cambia el color del jugador a rojo
      this.physics.pause(); // Pausa la física del juego
      this.gameovertext = this.add.text(100, 250, "Game Over", {
        fontSize: "100px",
        fill: "red"
      });
    }
  }
}