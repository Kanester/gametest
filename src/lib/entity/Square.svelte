<script lang="ts">
  export let ctx: CanvasRenderingContext2D;
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;
  
  if (ctx) {
    ctx.fillstyle = "red"; //i dunno how to use rgb for it
    ctx.fillRect(x, y, width, height);
  }
</script>