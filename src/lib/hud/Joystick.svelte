<script lang="ts">
  import { onMount } from "svelte";
  
  export let size: number = 100;
  export let onMove = (x: number, y: number) => {};
  export let dynamic: boolean = true;
  
  let outer: HTMLDivElement;
  let inner: HTMLDivElement;
  
  let origin = {x: 500, y: 500};
  let active = false;
  
  function handleStart(event: TouchEvent | MouseEvent) {
    active = true;
    const touch = 'touches' in event ? event.touches[0] : event;
    origin = {x: touch.clientX, y: touch.clientY}
    
    if (dynamic) {
      outer.style.left = `${origin.x - size / 2}px`;
      outer.style.top = `${origin.y - size / 2}px`
    }
  }
  
  function handleMove(event: TouchEvent | MouseEvent) {
    if (!active) return;
    const touch = 'touches' in event ? event.touches[0] : event;
    const dx = touch.clientX - origin.x;
    const dy = touch.clientY - origin.y;
    
    const radius = size / 2;
    const distance = Math.min(Math.sqrt(dx ** 2 + dy ** 2), radius);
    const angle = Math.atan2(dy, dx);
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    inner.style.transform = `translate(${x}px, ${y}px)`;
    
    onMove(x / radius, y / radius);
  }
  
  function handleEnd() {
    active = false;
    inner.style.transform = `translate(0px, 0px)`;
    onMove(0, 0);
  }
  
  onMount(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
  });
</script>

<div
  bind:this={outer}
  class="outer"
  on:touchstart|preventDefault={handleStart}
  on:mousedown|preventDefault={handleStart}
  style="width: {size}px; height: {size}px;"
>
  <div bind:this={inner} class="inner"></div>
</div>

<style>
  .outer {
    position: fixed;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    touch-action: none;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .inner {
    width: 40%;
    height: 40%;
    background: black;
    border-radius: 50%;
    transition: transform 0.05s linear;
  }
</style>