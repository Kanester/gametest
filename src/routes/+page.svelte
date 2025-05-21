<script lang="ts">
	import Canvas from '$lib/hud/Canvas.svelte';1
	import Joystick from "$lib/hud/Joystick.svelte"
	import { joystick } from "$lib/utils"
	import Square from "$lib/entity/Square.svelte"
</script>

<Canvas />
<Square />
<Joystick />