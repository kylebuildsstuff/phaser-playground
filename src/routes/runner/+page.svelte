<script lang="ts">
  import Phaser from 'phaser';
  import { onMount } from 'svelte';

  import Game from '$lib/runner/scenes/game';
  import GameOver from '$lib/runner/scenes/gameover';

  const config = {
    width: 600,
    height: 300,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 350 },
        debug: true,
      },
    },
    scene: [Game, GameOver],
  };

  onMount(() => {
    const game = new Phaser.Game(config);
  });
</script>

<div id="game-container" style="width: 100%; height: 100vh;"></div>
