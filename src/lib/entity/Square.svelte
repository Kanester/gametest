<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ctx, joystick } from '../utils';
	
	let c: CanvasRenderingContext2D | null = null;
	let unsubCtx: () => void;
	let unsubJoystick: () => void;

	let x = 100;
	let y = 100;
	let vx = 0;
	let vy = 0;
	
	let last = 0;
	let animationFrame: number;
	
	onMount(() => {
	  unsubCtx = ctx.subscribe((_ctx) => {
	    c = _ctx;
	  });
	  
	  unsubJoystick = joystick.subscribe((j) => {
	    vx = j.x;
	    vy = j.y;
	  });
	  
	  last = performance.now();
	  animationFrame = requestAnimationFrame(loop);
	});
	
	function update(dt: number) {
	  const speed = gameSetting.speed;
	  
	  x += vx * speed * dt;
	  y += vy * speed * dt;
	  
	  const limitX = window.innerWidth - 50;
	  const limitY = window.innerHeight - 50;
	  
	  x = Math.max(0, Math.min(x, limitX));
	  y = Math.max(0, Math.min(y, limitY));
	}
	
	function draw() {
	  if (!c) return;
	  
	  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
	  
	  c.fillStyle = "rgb(255, 212, 235)";
	  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
	  
	  c.fillStyle = "lightblue";
	  c.fillRect(x, y, 50, 50);
	}
	
	function loop(now: number) {
	  const delta = (now - last) / 1000;
	  last = now;
	  
	  update(delta);
	  draw();
	  
	  animationFrame = requestAnimationFrame(loop);
	}
	
	onDestroy(() => {
	  cancelAnimationFrame(animationFrame);
	  unsubCtx?.();
	  unsubJoystick?.();
	})
</script>
