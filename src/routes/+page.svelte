<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "$lib/utils.ts";
  import Square from "$lib/entity/Square.svelte";
  import Joystick from "$lib/hud/Joystick.svelte";
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  let x: number = 0;
  let y: number = 0;
  
  const handleMove = (newX: number, newY: number) => {
    x = +newX.toFixed(2);
    y = +newY.toFixed(2);
  }
  
  const res = () => {
    resize(canvas, ctx);
  }
  
  onMount(() => {
    ctx = canvas.getContext("2d");
    res();
    window.addEventListener("resize", res);
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