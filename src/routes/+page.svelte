<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "$lib/utils.ts"
  import Square from "$lib/entity/Square.svelte"
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
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
  })
</script>

<canvas bind:this={canvas}></canvas>
<Square x={30} y={20} width={10} height={10}  />

<style>
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>