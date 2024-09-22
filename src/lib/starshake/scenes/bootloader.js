import Phaser from 'phaser';

import WendyFont from '$lib/assets/starshake/assets/fonts/wendy.png';
import WendyXml from '$lib/assets/starshake/assets/fonts/wendy.xml?url';

import ShotSound from '$lib/assets/starshake/assets/sounds/shot.mp3';
import FoeShotSound from '$lib/assets/starshake/assets/sounds/foeshot.mp3';
import ExplosionSound from '$lib/assets/starshake/assets/sounds/explosion.mp3';
import FoeExplosionSound from '$lib/assets/starshake/assets/sounds/foexplosion.mp3';
import FoeDestroySound from '$lib/assets/starshake/assets/sounds/foedestroy.mp3';
import StageClearSound from '$lib/assets/starshake/assets/sounds/stageclear1.mp3';
import BossSound from '$lib/assets/starshake/assets/sounds/boss.mp3';
import SplashSound from '$lib/assets/starshake/assets/sounds/splash.mp3';
import Music1 from '$lib/assets/starshake/assets/sounds/music1.mp3';
import Music2 from '$lib/assets/starshake/assets/sounds/music2.mp3';
import Music3 from '$lib/assets/starshake/assets/sounds/music3.mp3';

import Player1Spritesheet from '$lib/assets/starshake/assets/images/player1.png';
import Foe0Spritesheet from '$lib/assets/starshake/assets/images/foe0.png';
import Foe1Spritesheet from '$lib/assets/starshake/assets/images/foe1.png';
import Foe2Spritesheet from '$lib/assets/starshake/assets/images/foe2.png';
import GuinxuSpritesheet from '$lib/assets/starshake/assets/images/guinxu.png';
import Plenny0Spritesheet from '$lib/assets/starshake/assets/images/plenny0.png';

import BackgroundSpritesheet from '$lib/assets/starshake/assets/images/background.png';
import Stage1Spritesheet from '$lib/assets/starshake/assets/images/stage1.png';
import Stage2Spritesheet from '$lib/assets/starshake/assets/images/stage2.png';
import Stage3Spritesheet from '$lib/assets/starshake/assets/images/stage3.png';
import Stage4Spritesheet from '$lib/assets/starshake/assets/images/stage4.png';
import LogoSpritesheet from '$lib/assets/starshake/assets/images/logo.png';
import PelloLogoSpritesheet from '$lib/assets/starshake/assets/images/pello_logo.png';

export default class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: 'bootloader' });
  }

  /*
    Here we split the loading of the assets into different functions.
    */
  preload() {
    this.createBars();
    this.setLoadEvents();
    this.loadFonts();
    this.loadImages();
    this.loadAudios();
    this.loadSpritesheets();
    this.setRegistry();
  }

  /*
    These are the events we need to control the loading bar and change to splash scene when complete.
    */
  setLoadEvents() {
    this.load.on(
      'progress',
      function (value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x0088aa, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16,
        );
      },
      this,
    );

    this.load.on(
      'complete',
      () => {
        this.scene.start('splash');
      },
      this,
    );
  }

  /*
    Load the fonts we use in the game.
    */
  loadFonts() {
    this.load.bitmapFont('wendy', WendyFont, WendyXml);
  }

  /*
    Load the images we use in the game.
    */
  loadImages() {
    this.load.image('logo', LogoSpritesheet);
    this.load.image('pello_logo', PelloLogoSpritesheet);
    this.load.image('background', BackgroundSpritesheet);
    this.load.image('stage1', Stage1Spritesheet);
    this.load.image('stage2', Stage2Spritesheet);
    this.load.image('stage3', Stage3Spritesheet);
    this.load.image('stage4', Stage4Spritesheet);
  }

  /*
    Load the audio (sound effects and music) we use in the game.
    */
  loadAudios() {
    this.load.audio('shot', ShotSound);
    this.load.audio('foeshot', FoeShotSound);
    this.load.audio('foedestroy', FoeDestroySound);
    this.load.audio('foexplosion', FoeExplosionSound);
    this.load.audio('explosion', ExplosionSound);
    this.load.audio('stageclear1', StageClearSound);
    this.load.audio('stageclear2', StageClearSound);
    this.load.audio('boss', BossSound);
    this.load.audio('splash', SplashSound);
    this.load.audio('music1', Music1);
    this.load.audio('music2', Music2);
    this.load.audio('music3', Music3);
  }

  /*
    Load the sprite sheets (animated images) we use in the game.
    */
  loadSpritesheets() {
    this.load.spritesheet('player1', Player1Spritesheet, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('foe0', Foe0Spritesheet, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('foe1', Foe1Spritesheet, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet('foe2', Foe2Spritesheet, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('guinxu', GuinxuSpritesheet, {
      frameWidth: 128,
      frameHeight: 144,
    });
    this.load.spritesheet('plenny0', Plenny0Spritesheet, {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  /*
    Set the initial values of the registry. The game was designed to be played by two players, but it can be played by one.
    */
  setRegistry() {
    this.registry.set('score_player1', 0);
    this.registry.set('power_player1', 'water');
    this.registry.set('lives_player1', 0);

    this.registry.set('score_player2', 0);
    this.registry.set('power_player2', 'water');
    this.registry.set('lives_player2', 0);
  }

  /*
    Create the bars we use to show the loading progress.
    */
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0xd40000, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20,
    );
    this.progressBar = this.add.graphics();
  }
}
