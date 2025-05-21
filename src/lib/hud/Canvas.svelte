<script lang="ts">
  import { onMount } from "svelte"; 
  import { ctx } from "../utils";

	let canvas: HTMLCanvasElement;
	let width: number;
	let height: number;
	let dpr: number;

	function init() {
		const c = canvas.getContext('2d');

		dpr = window.devicePixelRatio || 1;
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
		c?.scale(dpr, dpr);

		if (!c) {
			console.error('2D Canvas is not supported!');
			ctx.set(null);
			return;
		}
		ctx.set(c);

		c.clearRect(0, 0, width, height);
		c.fillStyle = 'rgb(255, 212, 235)';
		c.fillRect(0, 0, width, height);
	}

	onMount(() => {
		init();

		window.addEventListener('resize', init);

		return () => {
			window.removeEventListener('resize', init);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -10;
	}
</style>
