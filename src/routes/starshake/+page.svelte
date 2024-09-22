<script lang="ts">
  import Phaser from 'phaser';
  import { onMount } from 'svelte';

  import Bootloader from '$lib/starshake/scenes/bootloader';
  import Game from '$lib/starshake/scenes/game';
  import Outro from '$lib/starshake/scenes/outro';
  import Splash from '$lib/starshake/scenes/splash';
  import Transition from '$lib/starshake/scenes/transition';

  const config = {
    width: 1000,
    height: 800,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    parent: 'contenedor',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene: [Bootloader, Splash, Transition, Game, Outro],
  };

  onMount(() => {
    const game = new Phaser.Game(config);
  });
</script>
