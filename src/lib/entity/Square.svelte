<script lang="ts">
	import { onMount } from 'svelte';
	import { ctx } from '../utils';

	let unsubscribe: () => void;
	
	onMount(() => {
	  unsubscribe = ctx.subscribe((c) => {
	    if (c) {
	      c.fillStyle = "blue";
	      c.fillRect(100, 100, 50, 50);
	    }
	  });
	  
	  return () => unsubscribe();
	});
</script>
