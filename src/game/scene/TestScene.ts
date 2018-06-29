export default class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TestScene '})
  }

  preload() {
    this.load.image('sky', 'assets/testgame/sky.png');
    this.load.image('ground', 'assets/testgame/platform.png');
    this.load.image('star', 'assets/testgame/star.png');
    this.load.image('bomb', 'assets/testgame/bomb.png');
    this.load.spritesheet('dude',
        'assets/testgame/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  platforms: any;
  player: any;
  cursors: any;
  stars: any;
  bombs: any;
  scoreText: any;
  score: number = 0;
  create() {
    this.add.image(400, 300, 'sky');
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child: any) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  gameOver: boolean = false;
  update() {
    if (this.gameOver)
    {
        return;
    }

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }
  }

  collectStar (player:any, star:any)
  {
      star.disableBody(true, true);

      //  Add and update the score
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);

      if (this.stars.countActive(true) === 0)
      {
          //  A new batch of stars to collect
          this.stars.children.iterate(function (child: any) {

              child.enableBody(true, child.x, 0, true, true);

          });

          var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

          var bomb = this.bombs.create(x, 16, 'bomb');
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;

      }
  }

  hitBomb (player: any, bomb: any)
  {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.gameOver = true;
  }

}
