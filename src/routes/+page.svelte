<script lang="ts">
  import { onMount } from "svelte";
  import { resize } from "$lib/utils.ts"
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  onMount(() => {
    ctx = canvas.getContext("2d");
    resize(canvas, ctx)
    
    let r = () => { resize(canvas, ctx) };
    
    window.addEventListener("resize", r);
    
    return () => {
      window.removeEventListener("resize", r);
    }
  })
</script>

<canvas bind:this={canvas} />

<style>
  canvas {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>