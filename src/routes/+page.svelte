<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "$lib/utils.ts";
  import Square from "$lib/entity/Square.svelte";
  import Joystick from "$lib/hud/Joystick.svelte";
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  const handleMove = (x: number, y: number) => {
    console.log("Joystick: ", x.toFixed(2), y.toFixed(2));
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
<Joystic size={100} onMove={handleMove} dynamic={true} />

{#if ctx}
  <Square ctx={ctx} x={30} y={20} width={10} height={10} />
{/if}

<style>
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>