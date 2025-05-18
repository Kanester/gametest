<script lang="ts">
  import { onMount } from "svelte";
  
  let canvas;
  
  onMount(() => {
    let ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    })
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