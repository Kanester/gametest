<script lang="ts">
	import Canvas from '$lib/hud/Canvas.svelte';
	import Joystick from "$lib/hud/Joystick.svelte";
	import { joystick } from "$lib/utils";
	import Square from "$lib/entity/Square.svelte";
	
	$: console.log($joystick);
</script>

<Canvas />
<Square />
<Joystick />