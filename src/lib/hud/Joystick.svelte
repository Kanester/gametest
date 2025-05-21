<script lang="ts">
	import { onMount } from 'svelte';
	import { joystick } from '../utils';

	let stick: HTMLDivElement;
	let base: HTMLDivElement;

	let radius = 50;

	let dragging = false;

	function getPosition(event: TouchEvent | MouseEvent) {
		const rect = base.getBoundingClientRect();
		const clientX = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
		const clientY = event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;

		return {
			x: clientX - rect.left - radius,
			y: clientY - rect.top - radius
		};
	}

	function onMove(event: TouchEvent | MouseEvent) {
		if (!dragging) return;

		const pos = getPosition(event);

		const dx = pos.x;
		const dy = pos.y;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const angle = Math.atan2(dy, dx);

		let limitX = dx;
		let limitY = dy;

		if (dist > radius) {
			limitX = Math.cos(angle) * radius;
			limitY = Math.sin(angle) * radius;
		}

		stick.style.transform = `translate(${limitX}px, ${limitY}px)`;

		joystick.set({
			x: +(limitX / radius).toFixed(2),
			y: +(limitY / radius).toFixed(2)
		});
	}

	function onEnd() {
		dragging = false;
		stick.style.transform = 'translate(0px, 0px)';
		joystick.set({
			x: 0,
			y: 0
		});
	}

	onMount(() => {
		const up = () => onEnd();
		window.addEventListener('mouseup', up);
		window.addEventListener('touchend', up);
	});
</script>

<div
	bind:this={base}
	class="base"
	on:mousedown={() => (dragging = true)}
	on:mousemove={onMove}
	on:mouseup={onEnd}
	on:touchstart={() => (dragging = true)}
	on:touchmove={onMove}
	on:touchend={onEnd}
	role="presentation">
	<div bind:this={stick} class="stick"></div>
</div>

<style>
	.base {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.2);
		position: fixed;
		bottom: 20px;
		top: 20px;
		touch-action: none;
		z-index: 10;
	}

	.stick {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		position: absolute;
		top: 30px;
		left: 30px;
		transform: translate(0, 0);
		transform: transform 0.1s ease-out;
		z-index: 10;
	}
</style>
