<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "$lib/utils.ts";
  import Square from "$lib/entity/Square.svelte";
  import Joystick from "$lib/hud/Joystick.svelte";
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  let vx: number = 0;
  let vy: number = 0;
  let last = performance.now();
  
  const handleMove = (dx: number, dy: number) => {
    vx = +dx.toFixed(2);
    vy = +dy.toFixed(2);
  }
  
  const move = (now: number) => {
    const dt = (now - last) / 1000;
    last = now;
    
    x += vx * 100 * dt;
    y += vy * 100 * dt;
    
    requestAnimationFrame(move);
  }
  
  const res = () => {
    resize(canvas, ctx);
  }
  
  onMount(() => {
    ctx = canvas.getContext("2d");
    res();
    window.addEventListener("resize", res);
    
    move();
    
    return () => {
      window.removeEventListener("resize", res);
    }
  });
</script>

<canvas bind:this={canvas}></canvas>
<Joystick size={100} onMove={handleMove} dynamic={true} />

{#if ctx}
  <Square ctx={ctx} x={vx} y={vy} width={50} height={50} />
{/if}

<style>
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>