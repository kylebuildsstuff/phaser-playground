<script lang="ts">
  import Phaser from 'phaser';
  import { onMount } from 'svelte';

  class Example extends Phaser.Scene {
    constructor() {
      super();
      this.logo = null;
      this.particles = null;
    }

    preload() {
      this.load.setBaseURL('https://labs.phaser.io');
      this.load.image('sky', 'assets/skies/space3.png');
      this.load.image('logo', 'assets/sprites/phaser3-logo.png');
      this.load.image('red', 'assets/particles/red.png');
    }

    create() {
      this.createGameObjects();
      this.scale.on('resize', this.resize, this);
    }

    createGameObjects() {
      const width = this.scale.width;
      const height = this.scale.height;

      // Add sky image and scale it to fit the screen
      const sky = this.add.image(width / 2, height / 2, 'sky');
      const scaleX = width / sky.width;
      const scaleY = height / sky.height;
      const scale = Math.max(scaleX, scaleY);
      sky.setScale(scale);

      this.particles = this.add.particles(0, 0, 'red', {
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
      });

      this.logo = this.physics.add.image(width / 2, height / 4, 'logo');

      // Adjust logo velocity based on screen size
      const velocityFactor = Math.min(width, height) / 600;
      this.logo.setVelocity(100 * velocityFactor, 200 * velocityFactor);
      this.logo.setBounce(1, 1);
      this.logo.setCollideWorldBounds(true);

      this.particles.startFollow(this.logo);
    }

    resize(gameSize) {
      const width = gameSize.width;
      const height = gameSize.height;

      this.cameras.resize(width, height);

      // Adjust world bounds
      this.physics.world.setBounds(0, 0, width, height);

      // Reposition and rescale sky
      const sky = this.children.getByName('sky');
      if (sky) {
        sky.setPosition(width / 2, height / 2);
        const scaleX = width / sky.width;
        const scaleY = height / sky.height;
        const scale = Math.max(scaleX, scaleY);
        sky.setScale(scale);
      }

      // Reposition logo if it's off-screen
      if (this.logo) {
        if (this.logo.x > width) this.logo.x = width - this.logo.width / 2;
        if (this.logo.y > height) this.logo.y = height - this.logo.height / 2;
      }
    }
  }

  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'game-container',
      width: '100%',
      height: '100%'
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: Example
  };

  onMount(() => {
    const game = new Phaser.Game(config);
  });
</script>

<div id="game-container" style="width: 100%; height: 100vh;"></div>
