<script lang="ts">
  import { onMount, tick } from "svelte";
  import { resize } from "$lib/utils.ts";
  import Square from "$lib/entity/Square.svelte";
  import Joystick from "$lib/hud/Joystick.svelte";
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  let vx = 0;
  let vy = 0;
  let x = 0;
  let y = 0;
  let last = performance.now();
  
  const handleMove = (dx: number, dy: number) => {
    vx = +dx.toFixed(2);
    vy = +dy.toFixed(2);
  }
  
  const move = async (now: number) => {
    const dt = (now - last) / 1000;
    last = now;
    
    x += vx * 100 * dt;
    y += vy * 100 * dt;
    
    await tick();
    
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
  <Square ctx={ctx} x={x} y={y} width={50} height={50} />
{/if}

<style>
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>